import AttachmentsSection from '@/components/sections/adaa-shield-assessment/Attachments';
import ErrorMessage from '@/components/ui/extend/error-message';
import Logo from '@/components/ui/extend/Logo';
import { Label } from '@/components/ui/label';
import QuestionsLoading from '@/components/ui/loading/QuestionsLoading';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import SubmitButton from '@/components/ui/submit-button';
import { type ShieldAnswers } from '@/services/shield';
import { useState } from 'react';
import type { Id } from 'react-toastify';
import AxisProgress from './AxisProgress';
import useGetShieldQuestions from '@/hooks/queries/useGetShieldQuestionsQuery';
import useSubmitAnswers from '@/hooks/mutations/useSubmitAnswersMutation';
import DataWrapper from '@/layouts/DataWrapper';
import { validateShieldAnswers } from '@/schemas/questions-validation';
import { getLastShieldAxis, removeLastShieldAxis, setLastShieldAxis } from '@/lib/storage';
import { ARABIC_NUMBER_NAMES } from '@/constants/data';

type Props = {
  onSuccess?: () => void;
};

export default function ShieldQuestionsSection({ onSuccess }: Props) {
  const [currentAxisIndex, setCurrentAxisIndex] = useState(getLastShieldAxis().index);
  const [answers, setAnswers] = useState<ShieldAnswers>(getLastShieldAxis().answers);
  const [error, setError] = useState<string | null>(null);

  const setupAnswers = (axisId: Id) => {
    setAnswers({
      axis_id: axisId,
      questions: [],
      attachments: []
    });
  };

  //Get Questions request ---------
  const {
    data: questions,
    isFetching,
    isError,
    refetch
  } = useGetShieldQuestions({ onSuccess: (data) => setupAnswers(data.axes[0].id) });
  if (questions && !answers.axis_id) setupAnswers(questions.axes[0].id);

  //Submit Answers request ---------
  const { mutate, isPending: isSubmitting } = useSubmitAnswers({
    axisIndex: currentAxisIndex,
    onSuccess: () => {
      window.scrollTo({ top: 120, behavior: 'smooth' });

      if (questions && questions.axes.length > currentAxisIndex + 1) {
        setCurrentAxisIndex((prev) => prev + 1);
        setupAnswers(questions.axes[currentAxisIndex + 1].id);
        setLastShieldAxis(currentAxisIndex + 1, {
          axis_id: questions.axes[currentAxisIndex + 1].id,
          questions: [],
          attachments: []
        });
        return;
      }

      if (currentAxisIndex === axiesQuestions.length - 1) {
        removeLastShieldAxis();
        onSuccess?.();
      }
    },
    onError: (err) => {
      if (err.response?.status === 422) setError('يرجى التأكد من الإجابة على جميع الأسئلة قبل المتابعة.');
    }
  });

  const axiesQuestions = questions?.axes || [];
  const axies =
    questions?.axes.map((axis, i) => ({
      name: ARABIC_NUMBER_NAMES[i],
      title: axis.title
    })) || [];

  //change answer for question ---------
  const handleAnswerChange = (questionId: Id, answer: boolean) => {
    setError(null);
    setAnswers((prevAnswers) => {
      if (!prevAnswers) return prevAnswers;
      const updatedAxisAnswer = [...prevAnswers.questions];
      const questionIndex = updatedAxisAnswer.findIndex((q) => q.question_id === questionId);
      if (questionIndex !== -1) {
        updatedAxisAnswer[questionIndex].answer = answer;
      } else {
        updatedAxisAnswer.push({ question_id: questionId, answer });
      }

      const newAnswers = { ...prevAnswers };
      newAnswers.questions = updatedAxisAnswer;
      setLastShieldAxis(currentAxisIndex, newAnswers);
      return newAnswers;
    });
  };

  const handleFileChange = (url: string, index: number) => {
    setAnswers((prevAnswers) => {
      if (!prevAnswers) return prevAnswers;
      const updatedAttachments = [...prevAnswers.attachments];
      updatedAttachments[index] = url;

      const newAnswers = { ...prevAnswers, attachments: [...updatedAttachments] };
      setLastShieldAxis(currentAxisIndex, newAnswers);
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    if (!answers || !questions) return;
    const currentAxisQuestions = questions.axes[currentAxisIndex].questions;
    const validation = validateShieldAnswers(currentAxisQuestions, answers);

    if (!validation.isValid) {
      setError('تأكد من الإجابة على جميع الأسئلة و ارفاق جميع المرفقات قبل التأكيد.');
    } else mutate(answers);
  };

  return (
    <div className="container">
      <DataWrapper isError={isError} retry={refetch} isLoading={isFetching} LoadingFallback={QuestionsLoading}>
        <div className="space-y-8">
          <AxisProgress axies={axies} currentIndex={currentAxisIndex} />

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

          <div className="mx-auto w-fit py-4 font-semibold">
            {currentAxisIndex === axiesQuestions.length - 1 ? (
              <SubmitButton variant="secondary" className="w-32" onClick={handleSubmit} isLoading={isSubmitting}>
                أتمام
              </SubmitButton>
            ) : (
              <SubmitButton variant="secondary" className="w-32" onClick={handleSubmit} isLoading={isSubmitting}>
                التالي
              </SubmitButton>
            )}
          </div>
        </div>
      </DataWrapper>
    </div>
  );
}
