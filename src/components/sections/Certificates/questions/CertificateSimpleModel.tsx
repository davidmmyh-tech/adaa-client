import QuestionsLoading from '@/components/ui/loading/QuestionsLoading';
import DataWrapper from '@/layouts/DataWrapper';
import type { Id } from '@/schemas/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FileInput } from '@/components/ui/file-input';
import { UploadIcon } from '@/components/ui/icons';
import ErrorMessage from '@/components/ui/extend/error-message';
import SubmitButton from '@/components/ui/submit-button';
import Logo from '@/components/ui/extend/Logo';
import { isAxiosError } from 'axios';
import { useUserState } from '@/context/UserProvider';
import type { CertificateAnswer } from '@/services/certificates/types';
import { certificateQuestions, submitCertificateQuestions } from '@/services/certificates/certificates-questions';
import type { CertificateTrack } from '@/schemas/types';

type Props = {
  track: CertificateTrack;
  onSuccess?: () => void;
  isLast?: boolean;
};

const FLAG_MAP: Record<CertificateTrack, keyof ReturnType<typeof useUserState>['flags']> = {
  strategic: 'completed_strategic_certificate',
  operational: 'completed_operational_certificate',
  hr: 'completed_hr_certificate'
};

export default function CertificateSimpleModel({ track, onSuccess, isLast }: Props) {
  const [answers, setAnswers] = useState<CertificateAnswer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setFlags } = useUserState();

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ['certificate-questions', track],
    queryFn: () => certificateQuestions(track)
  });

  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: () => submitCertificateQuestions(track, answers),
    onSuccess: () => {
      onSuccess?.();
      const flagKey = FLAG_MAP[track];
      setFlags((prev) => ({ ...prev, [flagKey]: true }));
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        if (err.response?.status === 400) return setError('يرجى التأكد من جميع المرفقات المطلوبة.');
        if (err.response?.status === 422) return setError('يرجى التأكد من الإجابة على جميع الأسئلة قبل المتابعة.');
        if (err.response?.status === 409) return setError('تم إرسال هذا النموذج مسبقًا.');
      }
      setError('حدث خطأ أثناء إرسال الإجابات. يرجى المحاولة مرة أخرى.');
    }
  });

  const qs = data?.data.data[0].questions || [];

  const handleAnswerChange = (questionId: Id, answer: string) => {
    setError(null);
    setAnswers((prevAnswers) => {
      if (!prevAnswers) return prevAnswers;
      const updatedAnswer = [...prevAnswers];
      const questionIndex = updatedAnswer.findIndex((q) => q.question_id === questionId);
      if (questionIndex !== -1) {
        updatedAnswer[questionIndex].answer = answer;
      } else {
        updatedAnswer.push({ question_id: questionId, answer, attachment: null });
      }

      return updatedAnswer;
    });
  };

  const handleFileChange = (questionId: Id, attachment: File | null) => {
    setAnswers((prevAnswers) => {
      if (!prevAnswers) return prevAnswers;
      const updatedAnswer = [...prevAnswers];
      const questionIndex = updatedAnswer.findIndex((q) => q.question_id === questionId);
      if (questionIndex !== -1) {
        updatedAnswer[questionIndex].attachment = attachment;
      } else {
        updatedAnswer.push({ question_id: questionId, answer: '', attachment });
      }

      return updatedAnswer;
    });
  };

  return (
    <>
      <DataWrapper isError={isError} retry={refetch} isLoading={isFetching} LoadingFallback={QuestionsLoading}>
        <div className="space-y-8">
          <div className="relative w-full overflow-hidden">
            {isSubmitting && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70">
                <Logo isLoading className="h-32 w-32" />
              </div>
            )}

            <form className="w-full shrink-0 space-y-12">
              <ol className="list-decimal space-y-12 ps-6">
                {qs.map((q) => (
                  <li key={q.id} className="flex flex-col items-start justify-between gap-8 md:flex-row">
                    <div>
                      <p className="font-semibold">{q.question_text}</p>
                      <RadioGroup
                        className="mt-4 flex flex-wrap justify-end gap-12"
                        onValueChange={(value) => handleAnswerChange(q.id, value)}
                      >
                        {q.options.map((option) => (
                          <Label className="flex items-center gap-4 select-none" key={option}>
                            <span className="text-primary">{option}</span>
                            <RadioGroupItem value={option} id={option} className="h-5 w-5 shrink-0" />
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>

                    {q.attachment_required && (
                      <FileInput
                        id={`attachment-${q.id}`}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onFileChange={(file) => handleFileChange(q.id, file)}
                        disabled={isSubmitting}
                      >
                        <div className="flex w-52 items-center gap-4">
                          <div className="shrink-0">
                            <UploadIcon className="h-7 w-7" />
                          </div>
                          <div className="min-w-0 flex-1 space-y-2">
                            <p className="truncate font-semibold text-ellipsis">
                              {(answers.find((a) => a.question_id === q.id)?.attachment as File)?.name || 'ارفع الملف'}
                            </p>
                            <p className="text-muted text-xs">PDF / Excel (حد أقصى 10 MB)</p>
                          </div>
                        </div>
                      </FileInput>
                    )}
                  </li>
                ))}
              </ol>
            </form>
          </div>

          <ErrorMessage error={error} />
        </div>
      </DataWrapper>

      <div className="flex justify-center">
        <SubmitButton variant="secondary" className="mx-auto w-32" isLoading={isSubmitting} onClick={() => mutate()}>
          {isLast ? 'إنهاء' : 'التالي'}
        </SubmitButton>
      </div>
    </>
  );
}
