import ErrorMessage from '@/components/ui/extend/error-message';
import Logo from '@/components/ui/extend/Logo';
import QuestionsLoading from '@/components/ui/loading/QuestionsLoading';
import SubmitButton from '@/components/ui/submit-button';
import AxisProgress from './AxisProgress';
import DataWrapper from '@/layouts/DataWrapper';
import useShieldSubmission from './useShieldSubmission';
import ShieldAxisQuestionsForm from './ShieldAxisQuestionsForm';

type Props = {
  onSuccess?: () => void;
};

export default function ShieldSubmissionForm({ onSuccess }: Props) {
  const {
    currentAxisIndex,
    answers,
    error,
    isSubmitting,
    isFetching,
    isError,
    refetch,
    questions,
    axes,
    handleAnswerChange,
    handleFileChange,
    handleSubmit,
    handlePrevious
  } = useShieldSubmission({ onFinalSuccess: onSuccess });

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
              {questions.map((axisItem) => (
                <ShieldAxisQuestionsForm
                  key={axisItem.id}
                  id={axisItem.id}
                  description={axisItem.description}
                  questions={axisItem.questions}
                  answers={answers}
                  handleAnswerChange={handleAnswerChange}
                  handleFileChange={handleFileChange}
                />
              ))}
            </div>
          </div>

          <ErrorMessage error={error} />

          <div className="flex justify-center gap-2 py-4 font-semibold">
            <SubmitButton variant="secondary" className="w-32" onClick={handleSubmit} isLoading={isSubmitting}>
              {currentAxisIndex === questions.length - 1 ? 'أتمام' : 'التالي'}
            </SubmitButton>

            {currentAxisIndex > 0 && (
              <SubmitButton variant="secondary" disabled={isSubmitting} onClick={handlePrevious}>
                السابق
              </SubmitButton>
            )}
          </div>
        </div>
      </DataWrapper>
    </div>
  );
}
