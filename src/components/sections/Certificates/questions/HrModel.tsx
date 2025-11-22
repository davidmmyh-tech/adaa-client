import QuestionsLoading from '@/components/ui/loading/QuestionsLoading';
import DataWrapper from '@/layouts/DataWrapper';
import type { Id } from '@/schemas/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import ErrorMessage from '@/components/ui/extend/error-message';
import SubmitButton from '@/components/ui/submit-button';
import Logo from '@/components/ui/extend/Logo';
import { isAxiosError } from 'axios';
import { useUserState } from '@/context/UserProvider';
import type { CertificateAnswer } from '@/services/certificates/types';
import { AttachmentInput } from '@/components/ui/attachment-input';
import {
  certificateQuestions,
  submitCertificateQuestions,
  submitHrAxis,
  uploadCertificateAttachment
} from '@/services/certificates/certificates-questions';
import { validateCertificateAnswers } from '@/schemas/questions-validation';
import { getLastHrAxis, removeLastHrAxis, setLastHrAxis } from '@/lib/storage';
import { ARABIC_NUMBER_NAMES } from '@/constants/data';

type Props = { isLast: boolean; onSuccess?: () => void };

export default function HrModel({ onSuccess, isLast }: Props) {
  const [answers, setAnswers] = useState<CertificateAnswer[]>(() => getLastHrAxis()?.answers);
  const [error, setError] = useState<string | null>(null);
  const [currentAxisIndex, setCurrentAxisIndex] = useState(() => getLastHrAxis()?.index);
  const { setFlags } = useUserState();

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ['certificate-hr-model-questions'],
    queryFn: () => certificateQuestions('hr')
  });

  const { mutate: proceed, isPending: isProceeding } = useMutation({
    mutationFn: () => submitHrAxis(answers),
    onSuccess: () => {
      setLastHrAxis(currentAxisIndex + 1);
      setAnswers([]);
      if (currentAxisIndex < axies.length - 1) setCurrentAxisIndex(currentAxisIndex + 1);
      else {
        onSuccess?.();
        mutate();
      }
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        if (err.response?.status === 400) setError('يرجى التأكد من جميع المرفقات المطلوبة.');
        if (err.response?.status === 422) setError('يرجى التأكد من الإجابة على جميع الأسئلة قبل المتابعة.');
        if (err.response?.status === 409) setError('تم تعبئة النموزج من قبل');
      } else setError('حدث خطأ أثناء إرسال الإجابات. يرجى المحاولة مرة أخرى.');
    }
  });

  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: () => submitCertificateQuestions('hr', answers),
    onSuccess: () => {
      onSuccess?.();
      removeLastHrAxis();
      setFlags((prev) => ({ ...prev, completed_hr_certificate: true }));
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        if (err.response?.status === 400) setError('يرجى التأكد من جميع المرفقات المطلوبة.');
        if (err.response?.status === 422) setError('يرجى التأكد من الإجابة على جميع الأسئلة قبل المتابعة.');
        if (err.response?.status === 409) setError('تم تعبئة النموزج من قبل');
      } else setError('حدث خطأ أثناء إرسال الإجابات. يرجى المحاولة مرة أخرى.');
    }
  });

  //extracting axies list
  const axies =
    data?.data.data.map((axis, i) => ({
      name: axis.name,
      title: ARABIC_NUMBER_NAMES[i]
    })) || [];

  const qs = data?.data.data[currentAxisIndex].questions || [];

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

      setLastHrAxis(currentAxisIndex, updatedAnswer);
      return updatedAnswer;
    });
  };

  const handleFileChange = (questionId: Id, attachment: string) => {
    setAnswers((prevAnswers) => {
      if (!prevAnswers) return prevAnswers;
      const updatedAnswer = [...prevAnswers];
      const questionIndex = updatedAnswer.findIndex((q) => q.question_id === questionId);
      if (questionIndex !== -1) {
        updatedAnswer[questionIndex].attachment = attachment;
      } else {
        updatedAnswer.push({ question_id: questionId, answer: '', attachment });
      }

      setLastHrAxis(currentAxisIndex, updatedAnswer);
      return updatedAnswer;
    });
  };

  const handleSubmit = () => {
    setError(null);
    const { isValid } = validateCertificateAnswers(data!.data.data[currentAxisIndex].questions, answers);
    if (!isValid) return setError('يرجى التأكد من تعبئة جميع البيانات المطلوبة');
    proceed();
  };

  async function handleUpload(file: File) {
    const response = await uploadCertificateAttachment(file);
    return response.data.data.attachment_url;
  }

  return (
    <div className="space-y-8">
      <div className="no-scrollbar max-w-full overflow-auto">
        <div className="w-fit min-w-full space-y-4">
          <div className="text-muted flex w-fit min-w-full justify-between text-center text-sm font-semibold">
            {axies.map((axisItem, i) => (
              <div
                key={axisItem.name}
                className={`w-48 space-y-2 transition-colors duration-500 ${i === currentAxisIndex ? 'text-secondary' : ''}`}
              >
                <p>{axisItem.name}</p>
                <p>{axisItem.title}</p>
              </div>
            ))}
          </div>

          <div className="bg-muted relative mb-1 h-1 w-full">
            <div
              className="bg-secondary absolute -top-0.5 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentAxisIndex + 1) * 100) / axies.length}%` }}
            ></div>
          </div>
        </div>
      </div>

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
                {qs.map((q, index) => (
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
                      <div className="w-62">
                        <AttachmentInput
                          id={`attachment-${index}`}
                          label="ارفق الشاهد"
                          onFileUpload={(url) => handleFileChange(q.id, url)}
                          uploadFn={handleUpload}
                        />
                      </div>
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
        {currentAxisIndex < axies.length ? (
          <SubmitButton
            variant="secondary"
            className="mx-auto w-32"
            isLoading={isProceeding || isSubmitting}
            onClick={handleSubmit}
          >
            التالي
          </SubmitButton>
        ) : (
          <SubmitButton
            variant="secondary"
            className="mx-auto w-32"
            isLoading={isProceeding || isSubmitting}
            onClick={handleSubmit}
          >
            {isLast ? 'إنهاء' : 'التالي'}
          </SubmitButton>
        )}
      </div>
    </div>
  );
}
