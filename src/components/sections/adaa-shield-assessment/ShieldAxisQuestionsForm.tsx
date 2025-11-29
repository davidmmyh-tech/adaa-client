import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AttachmentsSection from './Attachments';
import type { ShieldQuestion } from '@/services/shield';
import type { Id } from '@/schemas/types';

type Props = {
  id: Id;
  description: string;
  questions: ShieldQuestion[];
  answers: { questions: { question_id: Id; answer: boolean }[]; attachments: any[] };
  handleAnswerChange: (questionId: Id, value: string) => void;
  handleFileChange: (url: string, index: number) => void;
};

export default function ShieldAxisQuestionsForm({
  id,
  description,
  questions,
  answers,
  handleAnswerChange,
  handleFileChange
}: Props) {
  return (
    <form key={id} className="w-full shrink-0 space-y-12">
      <p className="text-lg font-semibold">{description}</p>
      <ol className="list-decimal space-y-12 ps-6">
        {questions.map((q) => {
          const qAnswer = answers.questions.find((target) => target.question_id === q.id)?.answer;

          return (
            <li key={q.id}>
              <p className="font-semibold">{q.question}</p>
              <RadioGroup
                className="mt-4 flex justify-end gap-24"
                onValueChange={(value) => handleAnswerChange(q.id, value)}
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

      <AttachmentsSection onFileUploaded={handleFileChange} axisId={id} values={answers?.attachments || []} />
    </form>
  );
}
