import { useState, useCallback, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import type { Id } from '@/schemas/types';
import type { CertificateAnswer } from '@/services/certificates/types';
import {
  getCurrentHrAxisIndex,
  setCurrentHrAxisIndex,
  getHrAxisAnswers,
  setHrAxisAnswers,
  removeAllHrAxisAnswers,
  validateUserAndClearIfMismatch
} from '@/lib/storage';
import {
  submitHrAxis,
  submitCertificateQuestions,
  certificateQuestions
} from '@/services/certificates/certificates-questions';
import { validateCertificateAnswers } from '@/schemas/questions-validation';
import { useUserState } from '@/context/UserProvider';
import { ARABIC_NUMBER_NAMES } from '@/constants/data';

type UseHrAxisFormParams = {
  onFinalSuccess?: () => void;
};

export default function useHrAxisSubmission({ onFinalSuccess }: UseHrAxisFormParams) {
  const { setFlags, user } = useUserState();
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<CertificateAnswer[]>([]);
  const [currentAxisIndex, setCurrentAxisIndex] = useState(() => getCurrentHrAxisIndex());
  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ['certificate-hr-model-questions'],
    queryFn: () => certificateQuestions('hr')
  });
  const questions = data?.data.data || [];

  const axes =
    data?.data.data.map((axis, i) => ({
      name: axis.name,
      title: ARABIC_NUMBER_NAMES[i]
    })) || [];

  // Validate user and clear data if mismatch
  useEffect(() => {
    if (user?.id) {
      validateUserAndClearIfMismatch(user.id);
    }
  }, [user?.id]);

  // Load answers when axis changes
  useEffect(() => {
    const savedAnswers = getHrAxisAnswers(currentAxisIndex);
    setAnswers(savedAnswers);
  }, [currentAxisIndex]);

  const handleError = useCallback((err: unknown) => {
    if (isAxiosError(err)) {
      if (err.response?.status === 400) setError('يرجى التأكد من جميع المرفقات المطلوبة.');
      else if (err.response?.status === 422) setError('يرجى التأكد من الإجابة على جميع الأسئلة قبل المتابعة.');
      else if (err.response?.status === 409) setError('تم تعبئة النموزج من قبل');
      else setError('حدث خطأ أثناء إرسال الإجابات. يرجى المحاولة مرة أخرى.');
    } else setError('حدث خطأ أثناء إرسال الإجابات. يرجى المحاولة مرة أخرى.');
  }, []);

  const navigateToAxis = useCallback((targetIndex: number) => {
    setCurrentAxisIndex(targetIndex);
    setCurrentHrAxisIndex(targetIndex);
    setError(null);
    window.scrollTo({ top: 250, behavior: 'smooth' });
  }, []);

  const { mutate: submit, isPending: isSubmitting } = useMutation({
    mutationFn: () => submitCertificateQuestions('hr', answers),
    onSuccess: () => {
      onFinalSuccess?.();
      removeAllHrAxisAnswers();
      setFlags((prev) => ({ ...prev, completed_hr_certificate: true }));
    },
    onError: () => setError('حدث خطأ أثناء إرسال الإجابات. يرجى المحاولة مرة لاحقًا.')
  });

  const { mutate: proceed, isPending: isProceeding } = useMutation({
    mutationFn: () => submitHrAxis(answers),
    onSuccess: () => {
      setHrAxisAnswers(currentAxisIndex, answers);
      if (currentAxisIndex < axes.length - 1) navigateToAxis(currentAxisIndex + 1);
      else submit();
    },
    onError: handleError
  });

  const updateAnswer = useCallback(
    (questionId: Id, updates: Partial<CertificateAnswer>) => {
      setError(null);
      setAnswers((prevAnswers) => {
        const existingIndex = prevAnswers.findIndex((q) => q.question_id === questionId);
        let updatedAnswers: CertificateAnswer[];

        if (existingIndex !== -1) {
          updatedAnswers = [...prevAnswers];
          updatedAnswers[existingIndex] = { ...updatedAnswers[existingIndex], ...updates };
        } else {
          updatedAnswers = [...prevAnswers, { question_id: questionId, answer: '', attachment: null, ...updates }];
        }

        setHrAxisAnswers(currentAxisIndex, updatedAnswers);
        return updatedAnswers;
      });
    },
    [currentAxisIndex]
  );

  const handleAnswerChange = useCallback(
    (questionId: Id, answer: string) => updateAnswer(questionId, { answer }),
    [updateAnswer]
  );

  const handleFileChange = useCallback(
    (questionId: Id, attachment: string) => updateAnswer(questionId, { attachment }),
    [updateAnswer]
  );

  const handlePrevious = useCallback(() => {
    setHrAxisAnswers(currentAxisIndex, answers);
    navigateToAxis(currentAxisIndex - 1);
  }, [currentAxisIndex, answers, navigateToAxis]);

  const handleSubmit = useCallback(() => {
    if (!data?.data.data[currentAxisIndex]) return;
    const { isValid } = validateCertificateAnswers(data.data.data[currentAxisIndex].questions, answers);
    if (!isValid) return setError('يرجى التأكد من تعبئة جميع البيانات المطلوبة');
    setError(null);
    proceed();
  }, [data, currentAxisIndex, answers, proceed, setError]);

  return {
    currentAxisIndex,
    answers,
    error,
    isProceeding,
    isSubmitting,
    handleAnswerChange,
    handleFileChange,
    handlePrevious,
    handleSubmit,
    axes,
    questions,
    isFetching,
    isError,
    refetch
  };
}
