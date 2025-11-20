import QuestionsLoading from '@/components/ui/loading/QuestionsLoading';
import DataWrapper from '@/layouts/DataWrapper';
import type { Id } from '@/schemas/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FileInput } from '@/components/ui/file-input';
import { UploadIcon } from '@/components/ui/icons';
import ErrorMessage from '@/components/ui/extend/error-message';
import SubmitButton from '@/components/ui/submit-button';
import Logo from '@/components/ui/extend/Logo';
import { AxiosError, isAxiosError } from 'axios';
import { useUserState } from '@/context/UserProvider';
import { Loader2 } from 'lucide-react';
import type { CertificateAnswer } from '@/services/certificates/types';
import {
  certificateQuestions,
  submitCertificateQuestions,
  submitHrAxis,
  uploadCertificateAttachment
} from '@/services/certificates/certificates-questions';
import { validateCertificateAnswers } from '@/schemas/questions-validation';

type Props = { isLast: boolean; onSuccess?: () => void };
const axiesNumNames = [
  'المحور الأول',
  'المحور الثاني',
  'المحور الثالث',
  'المحور الرابع',
  'المحور الخامس',
  'المحور السادس',
  'المحور السابع',
  'المحور الثامن',
  'المحور التاسع'
];

export default function HrModel({ onSuccess, isLast }: Props) {
  const [answers, setAnswers] = useState<CertificateAnswer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentAxisIndex, setCurrentAxisIndex] = useState(0);
  const { setFlags } = useUserState();

  const { data, isPending } = useQuery({
    queryKey: ['certificate-hr-model-questions'],
    queryFn: () => certificateQuestions('hr')
  });

  const { mutate: proceed, isPending: isProceeding } = useMutation({
    mutationFn: () => submitHrAxis(answers),
    onSuccess: () => {
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

  //extracting axies from questions
  const axies =
    data?.data.data.map((axis, i) => ({
      name: axis.name,
      title: axiesNumNames[i]
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

      return updatedAnswer;
    });
  };

  const handleSubmit = () => {
    setError(null);
    const { isValid } = validateCertificateAnswers(data!.data.data[currentAxisIndex].questions, answers);
    if (!isValid) {
      setError('يرجى التأكد من تعبئة جميع البيانات المطلوبة');
      return;
    }
    proceed();
  };

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
                          <AttachmentUploadInput
                            index={index}
                            onFileUpload={(url) => handleFileChange(q.id, url)}
                            label="ارفق الشاهد"
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
      )}
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

type AttachmentUploadInputProps = {
  index: number;
  onFileUpload: (url: string) => void;
  onError?: (error: AxiosError) => void;
  label: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onError'>;

function AttachmentUploadInput({ index, onFileUpload, label, onError, ...props }: AttachmentUploadInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { isPending, mutate } = useMutation({
    mutationKey: ['shield-attachment-upload', index],
    mutationFn: (data: { file: File; index: number }) => uploadCertificateAttachment(data.file),
    onSuccess: (data, variables) => {
      onFileUpload(data.data.data.attachment_url);
      setUploadedFileName(variables.file.name);
    },
    onError: (err) => {
      if (fileInputRef.current) fileInputRef.current.value = '';
      setUploadedFileName(null);
      if (isAxiosError(err)) onError?.(err);
      setError('فشل رفع الملف. يرجى المحاولة مرة أخرى.');
    }
  });

  const handleFileChange = (file: File | null) => {
    setError(null);
    if (file) mutate({ file, index });
  };

  return (
    <div className="w-full space-y-2">
      <p className="font-semibold">{label}</p>
      <FileInput
        ref={fileInputRef}
        id={`attachment-${index}`}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onFileChange={handleFileChange}
        disabled={isPending}
        {...props}
      >
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            {isPending ? <Loader2 className="spinner" width={28} height={28} /> : <UploadIcon className="h-7 w-7" />}
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <p className="truncate font-semibold text-ellipsis">
              {isPending ? 'جاري الرفع...' : uploadedFileName || 'ارفع الملف'}
            </p>
            <p className="text-muted text-xs">PDF / Excel (حد أقصى 10 MB)</p>
          </div>
        </div>
      </FileInput>
      <ErrorMessage error={error} />
    </div>
  );
}
