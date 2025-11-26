import QuestionsLoading from '@/components/ui/loading/QuestionsLoading';
import DataWrapper from '@/layouts/DataWrapper';
import type { Id } from '@/schemas/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState, useCallback, useEffect } from 'react';
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
import {
  getCurrentHrAxisIndex,
  setCurrentHrAxisIndex,
  getHrAxisAnswers,
  setHrAxisAnswers,
  removeAllHrAxisAnswers
} from '@/lib/storage';
import { ARABIC_NUMBER_NAMES } from '@/constants/data';
import { Button } from '@/components/ui/button';
import HrAxisProgress from './HrAxisProgress';

type Props = { onSuccess?: () => void; isLast?: boolean };

export default function HrModel({ onSuccess, isLast }: Props) {
  const { setFlags, user } = useUserState();
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<CertificateAnswer[]>([]);
  const [currentAxisIndex, setCurrentAxisIndex] = useState(() => getCurrentHrAxisIndex(user?.id || 0));

  useEffect(() => {
    const savedAnswers = getHrAxisAnswers(currentAxisIndex, user?.id || 0);
    setAnswers(savedAnswers);
  }, [currentAxisIndex, user?.id]);

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ['certificate-hr-model-questions'],
    queryFn: () => certificateQuestions('hr')
  });

  const handleError = useCallback((err: unknown) => {
    if (isAxiosError(err)) {
      if (err.response?.status === 400) setError('يرجى التأكد من جميع المرفقات المطلوبة.');
      else if (err.response?.status === 422) setError('يرجى التأكد من الإجابة على جميع الأسئلة قبل المتابعة.');
      else if (err.response?.status === 409) setError('تم تعبئة النموزج من قبل');
      else setError('حدث خطأ أثناء إرسال الإجابات. يرجى المحاولة مرة أخرى.');
    } else setError('حدث خطأ أثناء إرسال الإجابات. يرجى المحاولة مرة أخرى.');
  }, []);

  const navigateToAxis = useCallback(
    (targetIndex: number) => {
      setCurrentAxisIndex(targetIndex);
      setCurrentHrAxisIndex(targetIndex, user?.id || 0);
      setError(null);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    },
    [user?.id]
  );

  const { mutate: proceed, isPending: isProceeding } = useMutation({
    mutationFn: () => submitHrAxis(answers),
    onSuccess: () => {
      setHrAxisAnswers(currentAxisIndex, answers, user?.id || 0);
      if (currentAxisIndex < axies.length - 1) navigateToAxis(currentAxisIndex + 1);
      else submit();
    },
    onError: handleError
  });

  const { mutate: submit, isPending: isSubmitting } = useMutation({
    mutationFn: () => submitCertificateQuestions('hr', answers),
    onSuccess: () => {
      onSuccess?.();
      removeAllHrAxisAnswers(user?.id || 0);
      setFlags((prev) => ({ ...prev, completed_hr_certificate: true }));
    },
    onError: handleError
  });

  const axies =
    data?.data.data.map((axis, i) => ({
      name: axis.name,
      title: ARABIC_NUMBER_NAMES[i]
    })) || [];

  const questions = data?.data.data || [];

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

        setHrAxisAnswers(currentAxisIndex, updatedAnswers, user?.id || 0);
        return updatedAnswers;
      });
    },
    [currentAxisIndex, user?.id]
  );

  const handleAnswerChange = useCallback(
    (questionId: Id, answer: string) => updateAnswer(questionId, { answer }),
    [updateAnswer]
  );

  const handleFileChange = useCallback(
    (questionId: Id, attachment: string) => updateAnswer(questionId, { attachment }),
    [updateAnswer]
  );

  const handleSubmit = useCallback(() => {
    if (!data?.data.data[currentAxisIndex]) return;

    const { isValid } = validateCertificateAnswers(data.data.data[currentAxisIndex].questions, answers);
    if (!isValid) {
      setError('يرجى التأكد من تعبئة جميع البيانات المطلوبة');
      return;
    }

    setError(null);
    proceed();
  }, [data, currentAxisIndex, answers, proceed]);

  const handleUpload = useCallback(async (file: File) => {
    const response = await uploadCertificateAttachment(file);
    return response.data.data.attachment_url;
  }, []);

  const handlePreviousClick = useCallback(() => {
    setHrAxisAnswers(currentAxisIndex, answers, user?.id || 0);
    navigateToAxis(currentAxisIndex - 1);
  }, [currentAxisIndex, answers, user?.id, navigateToAxis]);

  return (
    <div className="space-y-8">
      <HrAxisProgress currentAxisIndex={currentAxisIndex} axies={axies} />

      <DataWrapper isError={isError} retry={refetch} isLoading={isFetching} LoadingFallback={QuestionsLoading}>
        <div className="relative w-full overflow-hidden">
          {(isSubmitting || isProceeding) && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70">
              <Logo isLoading className="h-32 w-32" />
            </div>
          )}

          <div className="relative flex transition-all duration-500" style={{ right: `-${currentAxisIndex * 100}%` }}>
            {questions.map((axis, axisIndex) => (
              <form key={axisIndex} className="w-full shrink-0 space-y-12">
                <ol className="list-decimal space-y-12 ps-6">
                  {axis.questions.map((q, index) => (
                    <li key={q.id} className="flex flex-col items-start justify-between gap-8 md:flex-row">
                      <div>
                        <p className="font-semibold">{q.question_text}</p>
                        <RadioGroup
                          className="mt-4 flex flex-wrap justify-end gap-12"
                          onValueChange={(value) => handleAnswerChange(q.id, value)}
                          value={answers.find((target) => target.question_id === q.id)?.answer}
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
                            value={
                              (answers.find((ans) => ans.question_id === q.id)?.attachment as string | undefined) ||
                              null
                            }
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </form>
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
          {currentAxisIndex < axies.length - 1 || !isLast ? 'التالي' : 'إنهاء'}
        </SubmitButton>

        {currentAxisIndex > 0 && (
          <Button variant="secondary" disabled={isProceeding || isSubmitting} onClick={handlePreviousClick}>
            السابق
          </Button>
        )}
      </div>
    </div>
  );
}
