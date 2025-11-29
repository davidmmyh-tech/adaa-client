import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AttachmentInput } from '@/components/ui/attachment-input';
import type { Id } from '@/schemas/types';
import type { CertificateAnswer, CertificateQuestion } from '@/services/certificates/types';
import { useCallback } from 'react';
import { uploadCertificateAttachment } from '@/services/certificates/certificates-questions';

type Props = {
  axisId: number;
  questions: CertificateQuestion[];
  answer?: CertificateAnswer;
  onAnswerChange: (questionId: Id, answer: string) => void;
  onFileChange: (questionId: Id, attachment: string) => void;
};

export default function HrAxisQuestionsForm({ questions, answer, onAnswerChange, onFileChange, axisId }: Props) {
  const uploadFn = useCallback(async (file: File) => {
    const response = await uploadCertificateAttachment(file);
    return response.data.data.attachment_url;
  }, []);

  return (
    <form className="w-full shrink-0 space-y-12">
      <ol className="list-decimal space-y-12 ps-6">
        {questions.map((question) => (
          <li key={question.id} className="flex flex-col items-start justify-between gap-8 md:flex-row">
            <div>
              <p className="font-semibold">{question.question_text}</p>
              <RadioGroup
                className="mt-4 flex flex-wrap justify-end gap-12"
                onValueChange={(value) => onAnswerChange(question.id, value)}
                value={answer?.answer}
              >
                {question.options.map((option) => (
                  <Label className="flex items-center gap-4 select-none" key={option}>
                    <span className="text-primary">{option}</span>
                    <RadioGroupItem value={option} id={option} className="h-5 w-5 shrink-0" />
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {question.attachment_required && (
              <div className="w-72 shrink-0">
                <AttachmentInput
                  id={`attachment-${question.id}-${axisId}`}
                  label="ارفق الشاهد"
                  onFileUpload={(url) => onFileChange(question.id, url)}
                  uploadFn={uploadFn}
                  value={(answer?.attachment as string | undefined) || null}
                />
              </div>
            )}
          </li>
        ))}
      </ol>
    </form>
  );
}
