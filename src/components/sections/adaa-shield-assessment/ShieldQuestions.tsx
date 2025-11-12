import AttachmentsSection from '@/components/sections/adaa-shield-assessment/Attachments';
import ErrorMessage from '@/components/ui/extend/error-message';
import Logo from '@/components/ui/extend/Logo';
import { Label } from '@/components/ui/label';
import QuestionsLoading from '@/components/ui/loading/QuestionsLoading';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import SubmitButton from '@/components/ui/submit-button';
import { type AxisAnswers, type ShieldQuestionsResponse } from '@/services/shield';
import { useState } from 'react';
import type { Id } from 'react-toastify';
import AxisProgress from './AxisProgress';
import useGetShieldQuestions from '@/hooks/queries/useGetShieldQuestionsQuery';
import useSubmitAnswers from '@/hooks/mutations/useSubmitAnswersMutation';
import DataWrapper from '@/layouts/DataWrapper';

type Props = {
  onSuccess?: () => void;
};

const axiesNumNames = ['المحور الأول', 'المحور الثاني', 'المحور الثالث', 'المحور الرابع'];

export default function ShieldQuestionsSection({ onSuccess }: Props) {
  const [axisIndex, setAxisIndex] = useState(0);
  const [answers, setAnswers] = useState<AxisAnswers>();
  const [error, setError] = useState<string | null>(null);

  const setupAnswers = (qs: ShieldQuestionsResponse, index: number) => {
    setAnswers({
      axis_id: qs.axes[index].id,
      questions: [],
      attachments: []
    });
  };

  //Get Questions request ---------
  const {
    data: questions,
    isFetching,
    isError,
    refetch,
    isFetchedAfterMount
  } = useGetShieldQuestions({ onSuccess: (data) => setupAnswers(data, 0) });
  if (questions && !answers) setupAnswers(questions, 0);

  //Submit Answers request ---------
  const { mutate, isPending } = useSubmitAnswers({
    axisIndex,
    onSuccess: () => {
      if (questions && questions.axes.length < axisIndex + 1) {
        setAxisIndex((prev) => prev + 1);
        setupAnswers(questions, axisIndex + 1);
      }
      if (axisIndex === axiesQuestions.length - 1) onSuccess?.();
    },
    onError: (err) => {
      if (err.response?.status === 422) setError('يرجى التأكد من الإجابة على جميع الأسئلة قبل المتابعة.');
    }
  });

  const axiesQuestions = questions?.axes || [];
  const axies =
    questions?.axes.map((axis, i) => ({
      name: axiesNumNames[i],
      title: axis.title
    })) || [];

  //change answer for question
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
      return newAnswers;
    });
  };

  const handleFileChange = (url: string, index: number) => {
    setAnswers((prevAnswers) => {
      if (!prevAnswers) return prevAnswers;
      const updatedAttachments = [...prevAnswers.attachments];
      updatedAttachments[index] = url;
      return {
        ...prevAnswers,
        attachments: updatedAttachments
      };
    });
  };

  const nextAxis = () => {
    if (answers) mutate(answers);
  };

  const handleSubmit = () => {
    if (answers) mutate(answers);
  };

  return (
    <div className="container">
      {!isFetchedAfterMount ? (
        <QuestionsLoading />
      ) : (
        <DataWrapper isError={isError || isFetching} retry={refetch} isRefetching={isFetching}>
          <div className="space-y-8">
            <AxisProgress axies={axies} currentIndex={axisIndex} />

            <div className="relative w-full overflow-hidden">
              {isPending && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70">
                  <Logo isLoading className="h-32 w-32" />
                </div>
              )}

              <div className="relative flex transition-all duration-500" style={{ right: `-${axisIndex * 100}%` }}>
                {axiesQuestions.map((axisItem) => (
                  <form key={axisItem.id} className="w-full shrink-0 space-y-12">
                    <p className="text-lg font-semibold">{axisItem.description}</p>
                    <ol className="list-decimal space-y-12 ps-6">
                      {axisItem.questions.map((q) => (
                        <li key={q.id}>
                          <p className="font-semibold">هل لدى المنظمة خطة استراتيجية واضحة وطويلة المدى؟</p>
                          <RadioGroup
                            className="mt-4 flex justify-end gap-24"
                            onValueChange={(value) => handleAnswerChange(q.id, value === 'yes')}
                          >
                            <div className="flex items-center gap-4">
                              <Label htmlFor={'no' + q.id} className="text-primary">
                                لا
                              </Label>
                              <RadioGroupItem value="no" id={'no' + q.id} className="h-5 w-5" />
                            </div>
                            <div className="flex items-center gap-4">
                              <Label htmlFor={'yes' + q.id} className="text-primary">
                                نعم
                              </Label>
                              <RadioGroupItem value="yes" id={'yes' + q.id} className="h-5 w-5" />
                            </div>
                          </RadioGroup>
                        </li>
                      ))}
                    </ol>
                    <AttachmentsSection onFileUploaded={handleFileChange} />
                  </form>
                ))}
              </div>
            </div>

            <ErrorMessage error={error} />

            <div className="mx-auto w-fit py-4 font-semibold">
              {axisIndex === axiesQuestions.length - 1 ? (
                <SubmitButton variant="secondary" className="w-32" onClick={handleSubmit}>
                  أتمام
                </SubmitButton>
              ) : (
                <SubmitButton variant="secondary" className="w-32" onClick={nextAxis}>
                  التالي
                </SubmitButton>
              )}
            </div>
          </div>
        </DataWrapper>
      )}
    </div>
  );
}
