import QuestionsLoading from '@/components/ui/loading/QuestionsLoading';
import DataWrapper from '@/layouts/DataWrapper';
import ErrorMessage from '@/components/ui/extend/error-message';
import SubmitButton from '@/components/ui/submit-button';
import Logo from '@/components/ui/extend/Logo';
import { Button } from '@/components/ui/button';
import HrAxisProgress from './HrAxisProgress';
import HrAxisQuestionsForm from './HrAxisQuestionsForm';
import useHrAxisSubmission from './useHrAxisSubmission';

type Props = { onSuccess?: () => void; isLast?: boolean };

export default function HrModel({ onSuccess, isLast }: Props) {
  const {
    currentAxisIndex,
    answers,
    error,
    isProceeding,
    isSubmitting,
    isFetching,
    isError,
    refetch,
    questions,
    axes,
    handleSubmit,
    handleAnswerChange,
    handleFileChange,
    handlePrevious
  } = useHrAxisSubmission({ onFinalSuccess: onSuccess });

  return (
    <div className="space-y-8">
      <HrAxisProgress currentAxisIndex={currentAxisIndex} axes={axes} />

      <DataWrapper isError={isError} retry={refetch} isLoading={isFetching} LoadingFallback={QuestionsLoading}>
        <div className="relative w-full overflow-hidden">
          {(isSubmitting || isProceeding) && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70">
              <Logo isLoading className="h-32 w-32" />
            </div>
          )}

          <div className="relative flex transition-all duration-500" style={{ right: `-${currentAxisIndex * 100}%` }}>
            {questions.map((axis) => (
              <HrAxisQuestionsForm
                key={axis.id}
                axisId={axis.id}
                questions={axis.questions}
                answer={answers.find((ans) => ans.question_id === axis.id)}
                onAnswerChange={handleAnswerChange}
                onFileChange={handleFileChange}
              />
            ))}
          </div>
        </div>
      </DataWrapper>

      <ErrorMessage error={error} />

      <div className="flex justify-center gap-2 py-3">
        <SubmitButton
          variant="secondary"
          className="w-32"
          isLoading={isProceeding || isSubmitting}
          onClick={handleSubmit}
        >
          {currentAxisIndex < axes.length - 1 || !isLast ? 'التالي' : 'إنهاء'}
        </SubmitButton>

        {currentAxisIndex > 0 && (
          <Button variant="secondary" disabled={isProceeding || isSubmitting} onClick={handlePrevious}>
            السابق
          </Button>
        )}
      </div>
    </div>
  );
}
