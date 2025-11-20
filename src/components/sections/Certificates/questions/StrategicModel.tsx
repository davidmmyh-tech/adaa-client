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

type Props = { isLast: boolean; onSuccess?: () => void };

export default function StrategicModel({ onSuccess, isLast }: Props) {
  const [answers, setAnswers] = useState<CertificateAnswer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setFlags } = useUserState();

  const { data, isPending } = useQuery({
    queryKey: ['certificate-strategic-model-questions'],
    queryFn: () => certificateQuestions('strategic')
  });

  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: () => submitCertificateQuestions('strategic', answers),
    onSuccess: () => {
      onSuccess?.();
      setFlags((prev) => ({ ...prev, completed_strategic_certificate: true }));
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        if (err.response?.status === 400) setError('يرجى التأكد من جميع المرفقات المطلوبة.');
        if (err.response?.status === 422) setError('يرجى التأكد من الإجابة على جميع الأسئلة قبل المتابعة.');
        if (err.response?.status === 409) setError('تم إرسال هذا النموذج مسبقًا.');
      } else setError('حدث خطأ أثناء إرسال الإجابات. يرجى المحاولة مرة أخرى.');
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
      {isPending ? (
        <QuestionsLoading />
      ) : (
        <DataWrapper isError={false} retry={() => {}} isRefetching={false}>
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
                          disabled={isPending}
                        >
                          <div className="flex w-52 items-center gap-4">
                            <div className="shrink-0">
                              <UploadIcon className="h-7 w-7" />
                            </div>

                            <div className="min-w-0 flex-1 space-y-2">
                              <p className="truncate font-semibold text-ellipsis">
                                {isPending
                                  ? 'جاري الرفع...'
                                  : (answers.find((a) => a.question_id === q.id)?.attachment as File)?.name ||
                                    'ارفع الملف'}
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
      )}
      <div className="flex justify-center">
        <SubmitButton variant="secondary" className="mx-auto w-32" isLoading={isSubmitting} onClick={() => mutate()}>
          {isLast ? 'إنهاء' : 'التالي'}
        </SubmitButton>
      </div>
    </>
  );
}
