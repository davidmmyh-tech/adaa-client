import AttachmentsSection from '@/components/sections/adaa-shield-assessment/Attachments';
import ErrorMessage from '@/components/ui/extend/error-message';
import Logo from '@/components/ui/extend/Logo';
import { Label } from '@/components/ui/label';
import QuestionsLoading from '@/components/ui/loading/QuestionsLoading';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import SubmitButton from '@/components/ui/submit-button';
import { type ShieldAnswers } from '@/services/shield';
import { useState, useCallback, useEffect } from 'react';
import type { Id } from 'react-toastify';
import AxisProgress from './AxisProgress';
import useGetShieldQuestions from '@/hooks/queries/useGetShieldQuestionsQuery';
import useSubmitAnswers from '@/hooks/mutations/useSubmitAnswersMutation';
import DataWrapper from '@/layouts/DataWrapper';
import { validateShieldAnswers } from '@/schemas/questions-validation';
import {
  getCurrentShieldAxisIndex,
  setCurrentShieldAxisIndex,
  getShieldAxisAnswers,
  setShieldAxisAnswers,
  removeAllShieldAxisAnswers
} from '@/lib/storage';
import { ARABIC_NUMBER_NAMES } from '@/constants/data';
import { useUserState } from '@/context/UserProvider';

type Props = {
  onSuccess?: () => void;
};

export default function ShieldQuestionsSection({ onSuccess }: Props) {
  const { user } = useUserState();
  const [error, setError] = useState<string | null>(null);
  const [currentAxisIndex, setCurrentAxisIndex] = useState(() => getCurrentShieldAxisIndex(user?.id || 0));
  const [answers, setAnswers] = useState<ShieldAnswers>({ axis_id: '', questions: [], attachments: [] });

  const setupAnswers = useCallback((axisId: Id) => {
    const freshAnswers = { axis_id: axisId, questions: [], attachments: [] };
    setAnswers(freshAnswers);
    return freshAnswers;
  }, []);

  //Get Questions request ---------
  const {
    data: questions,
    isFetching,
    isError,
    refetch
  } = useGetShieldQuestions({ onSuccess: (data) => setupAnswers(data.axes[0].id) });
  if (questions && !answers.axis_id) setupAnswers(questions.axes[0].id);

  // Load answers when axis changes
  useEffect(() => {
    if (questions?.axes[currentAxisIndex]) {
      const savedAxisAnswers = getShieldAxisAnswers(currentAxisIndex, user?.id || 0);
      if (savedAxisAnswers.axis_id) {
        setAnswers(savedAxisAnswers);
      } else {
        setupAnswers(questions.axes[currentAxisIndex].id);
      }
    }
  }, [currentAxisIndex, user?.id, questions, setupAnswers]);

  const navigateToAxis = useCallback(
    (targetIndex: number) => {
      setCurrentAxisIndex(targetIndex);
      setCurrentShieldAxisIndex(targetIndex, user?.id || 0);
      setError(null);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    },
    [user?.id]
  );

  //Submit Answers request ---------
  const { mutate, isPending: isSubmitting } = useSubmitAnswers({
    axisIndex: currentAxisIndex,
    onSuccess: () => {
      setShieldAxisAnswers(currentAxisIndex, answers, user?.id || 0);
      if (questions && questions.axes.length > currentAxisIndex + 1) return navigateToAxis(currentAxisIndex + 1);
      if (currentAxisIndex === axiesQuestions.length - 1) {
        removeAllShieldAxisAnswers(user?.id || 0);
        onSuccess?.();
      }
    },
    onError: (err) => {
      if (err.response?.status === 422) return setError('يرجى التأكد من الإجابة على جميع الأسئلة قبل المتابعة.');
      setError('حدث خطأ أثناء إرسال الإجابات. يرجى المحاولة مرة أخرى.');
    }
  });

  const axiesQuestions = questions?.axes || [];
  const axes =
    questions?.axes.map((axis, i) => ({
      name: ARABIC_NUMBER_NAMES[i],
      title: axis.title
    })) || [];

  //change answer for question ---------
  const handleAnswerChange = useCallback(
    (questionId: Id, answer: boolean) => {
      setAnswers((prevAnswers) => {
        const updatedQuestions = [...prevAnswers.questions];
        const questionIndex = updatedQuestions.findIndex((q) => q.question_id === questionId);

        if (questionIndex !== -1) {
          updatedQuestions[questionIndex].answer = answer;
        } else {
          updatedQuestions.push({ question_id: questionId, answer });
        }

        const newAnswers = { ...prevAnswers, questions: updatedQuestions };
        setShieldAxisAnswers(currentAxisIndex, newAnswers, user?.id || 0);
        setError(null);
        return newAnswers;
      });
    },
    [currentAxisIndex, user?.id]
  );

  const handleFileChange = useCallback(
    (url: string, index: number) => {
      setAnswers((prevAnswers) => {
        const updatedAttachments = [...prevAnswers.attachments];
        updatedAttachments[index] = url;

        const newAnswers = { ...prevAnswers, attachments: updatedAttachments };
        setShieldAxisAnswers(currentAxisIndex, newAnswers, user?.id || 0);
        return newAnswers;
      });
    },
    [currentAxisIndex, user?.id]
  );

  const handleSubmit = useCallback(() => {
    if (!answers || !questions) return;
    const currentAxisQuestions = questions.axes[currentAxisIndex].questions;
    const validation = validateShieldAnswers(currentAxisQuestions, answers);

    if (!validation.isValid) {
      setError('تأكد من الإجابة على جميع الأسئلة و ارفاق جميع المرفقات قبل التأكيد.');
    } else mutate(answers);
  }, [answers, questions, currentAxisIndex, mutate]);

  const handlePreviousClick = useCallback(() => {
    setShieldAxisAnswers(currentAxisIndex, answers, user?.id || 0);
    navigateToAxis(currentAxisIndex - 1);
  }, [currentAxisIndex, answers, user?.id, navigateToAxis]);

  return (
    <div className="container">
      <DataWrapper isError={isError} retry={refetch} isLoading={isFetching} LoadingFallback={QuestionsLoading}>
        <div className="space-y-8">
          <AxisProgress axes={axes} currentIndex={currentAxisIndex} />

          <div className="relative w-full overflow-hidden">
            {isSubmitting && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70">
                <Logo isLoading className="h-32 w-32" />
              </div>
            )}

            <div className="relative flex transition-all duration-500" style={{ right: `-${currentAxisIndex * 100}%` }}>
              {axiesQuestions.map((axisItem) => (
                <form key={axisItem.id} className="w-full shrink-0 space-y-12">
                  <p className="text-lg font-semibold">{axisItem.description}</p>
                  <ol className="list-decimal space-y-12 ps-6">
                    {axisItem.questions.map((q) => {
                      const qAnswer = answers.questions.find((target) => target.question_id === q.id)?.answer;

                      return (
                        <li key={q.id}>
                          <p className="font-semibold">{q.question}</p>
                          <RadioGroup
                            className="mt-4 flex justify-end gap-24"
                            onValueChange={(value) => handleAnswerChange(q.id, value === 'yes')}
                            value={qAnswer === undefined ? undefined : qAnswer ? 'yes' : 'no'}
                          >
                            <Label htmlFor={'no' + q.id} className="flex items-center gap-4">
                              <div className="text-primary">لا</div>
                              <RadioGroupItem value="no" id={'no' + q.id} className="h-5 w-5" />
                            </Label>
                            <Label htmlFor={'yes' + q.id} className="flex items-center gap-4">
                              <div className="text-primary">نعم</div>
                              <RadioGroupItem value="yes" id={'yes' + q.id} className="h-5 w-5" />
                            </Label>
                          </RadioGroup>
                        </li>
                      );
                    })}
                  </ol>
                  <AttachmentsSection
                    onFileUploaded={handleFileChange}
                    axisId={axisItem.id}
                    values={answers?.attachments || []}
                  />
                </form>
              ))}
            </div>
          </div>

          <ErrorMessage error={error} />

          <div className="flex justify-center gap-2 py-4 font-semibold">
            <SubmitButton variant="secondary" className="w-32" onClick={handleSubmit} isLoading={isSubmitting}>
              {currentAxisIndex === axiesQuestions.length - 1 ? 'أتمام' : 'التالي'}
            </SubmitButton>

            {currentAxisIndex > 0 && (
              <SubmitButton variant="secondary" disabled={isSubmitting} onClick={handlePreviousClick}>
                السابق
              </SubmitButton>
            )}
          </div>
        </div>
      </DataWrapper>
    </div>
  );
}
