import { useState, useCallback, useEffect } from 'react';
import { isAxiosError } from 'axios';
import type { ShieldAnswers } from '@/services/shield';
import {
  getCurrentShieldAxisIndex,
  setCurrentShieldAxisIndex,
  getShieldAxisAnswers,
  setShieldAxisAnswers,
  removeAllShieldAxisAnswers,
  validateUserAndClearIfMismatch
} from '@/lib/storage';
import { validateShieldAnswers } from '@/schemas/questions-validation';
import useGetShieldQuestions from '@/hooks/queries/useGetShieldQuestionsQuery';
import { ARABIC_NUMBER_NAMES } from '@/constants/data';
import { useUserState } from '@/context/UserProvider';
import useSubmitShieldAnswers from '@/hooks/mutations/useSubmitShieldAnswersMutation';
import type { Id } from '@/schemas/types';

type UseShieldAxisFormParams = {
  onFinalSuccess?: () => void;
};

export default function useShieldSubmission({ onFinalSuccess }: UseShieldAxisFormParams) {
  const { user } = useUserState();
  const [error, setError] = useState<string | null>(null);
  const [currentAxisIndex, setCurrentAxisIndex] = useState(() => getCurrentShieldAxisIndex());
  const [answers, setAnswers] = useState<ShieldAnswers>({ axis_id: 0, questions: [], attachments: [] });

  const setupAnswers = useCallback((axisId: Id) => {
    const freshAnswers = { axis_id: axisId, questions: [], attachments: [] };
    setAnswers(freshAnswers);
    return freshAnswers;
  }, []);

  const {
    data: questions,
    isFetching,
    isError,
    refetch
  } = useGetShieldQuestions({ onSuccess: (data) => setupAnswers(data.axes[0].id) });
  if (questions && !answers.axis_id) setupAnswers(questions.axes[0].id);

  const axiesQuestions = questions?.axes || [];
  const axes =
    questions?.axes.map((axis, i) => ({
      name: ARABIC_NUMBER_NAMES[i],
      title: axis.title
    })) || [];

  // Validate user and clear data if mismatch
  useEffect(() => {
    if (user?.id) validateUserAndClearIfMismatch(user.id);
  }, [user?.id]);

  // Load answers when axis changes
  useEffect(() => {
    if (questions?.axes[currentAxisIndex]) {
      const savedAxisAnswers = getShieldAxisAnswers(currentAxisIndex);
      if (savedAxisAnswers.axis_id) setAnswers(savedAxisAnswers);
      else setupAnswers(questions.axes[currentAxisIndex].id);
    }
  }, [currentAxisIndex, questions, setupAnswers]);

  const handleError = useCallback((err: unknown) => {
    if (isAxiosError(err)) {
      if (err.response?.status === 422) return setError('يرجى التأكد من الإجابة على جميع الأسئلة قبل المتابعة.');
      if (err.response?.status === 400) return setError('يرجى التأكد من الإجابة على جميع الأسئلة قبل المتابعة.');
    }
    setError('حدث خطأ أثناء إرسال الإجابات. يرجى المحاولة مرة أخرى.');
  }, []);

  const navigateToAxis = useCallback((targetIndex: number) => {
    setCurrentAxisIndex(targetIndex);
    setCurrentShieldAxisIndex(targetIndex);
    setError(null);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }, []);

  const { mutate, isPending: isSubmitting } = useSubmitShieldAnswers({
    axisIndex: currentAxisIndex,
    onSuccess: () => {
      setShieldAxisAnswers(currentAxisIndex, answers);
      if (questions && questions.axes.length > currentAxisIndex + 1) navigateToAxis(currentAxisIndex + 1);
      else if (currentAxisIndex === axiesQuestions.length - 1) {
        removeAllShieldAxisAnswers();
        onFinalSuccess?.();
      }
    },
    onError: handleError
  });

  const handleAnswerChange = useCallback(
    (questionId: Id, answer: string) => {
      const booleanAnswer = answer === 'نعم';
      setAnswers((prevAnswers) => {
        const updatedQuestions = [...prevAnswers.questions];
        const questionIndex = updatedQuestions.findIndex((q) => q.question_id === questionId);

        if (questionIndex !== -1) {
          updatedQuestions[questionIndex].answer = booleanAnswer;
        } else {
          updatedQuestions.push({ question_id: questionId, answer: booleanAnswer });
        }

        const newAnswers = { ...prevAnswers, questions: updatedQuestions };
        setShieldAxisAnswers(currentAxisIndex, newAnswers);
        setError(null);
        return newAnswers;
      });
    },
    [currentAxisIndex]
  );

  const handleFileChange = useCallback(
    (url: string, index: number) => {
      setAnswers((prevAnswers) => {
        const updatedAttachments = [...prevAnswers.attachments];
        updatedAttachments[index] = url;

        const newAnswers = { ...prevAnswers, attachments: updatedAttachments };
        setShieldAxisAnswers(currentAxisIndex, newAnswers);
        return newAnswers;
      });
    },
    [currentAxisIndex]
  );

  const handleSubmit = useCallback(() => {
    if (!answers || !questions) return;
    const currentAxisQuestions = questions.axes[currentAxisIndex].questions;
    const validation = validateShieldAnswers(currentAxisQuestions, answers);
    if (!validation.isValid) setError('تأكد من الإجابة على جميع الأسئلة و ارفاق جميع المرفقات قبل التأكيد.');
    else mutate(answers);
  }, [answers, questions, currentAxisIndex, mutate]);

  const handlePrevious = useCallback(() => {
    setShieldAxisAnswers(currentAxisIndex, answers);
    navigateToAxis(currentAxisIndex - 1);
  }, [currentAxisIndex, answers, navigateToAxis]);

  return {
    currentAxisIndex,
    answers,
    error,
    isSubmitting,
    isFetching,
    isError,
    refetch,
    questions: axiesQuestions,
    axes,
    handleAnswerChange,
    handleFileChange,
    handleSubmit,
    handlePrevious
  };
}
