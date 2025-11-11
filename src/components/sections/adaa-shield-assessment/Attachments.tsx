import ErrorMessage from '@/components/ui/extend/error-message';
import { FileInput } from '@/components/ui/file-input';
import { UploadIcon } from '@/components/ui/icons';
import { uploadShieldAttachment } from '@/services/shield';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError, type AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';

type Props = {
  onFileUploaded: (url: string, index: number) => void;
  onUploadError?: (error: AxiosError) => void;
};

export default function AttachmentsSection({ onFileUploaded, onUploadError }: Props) {
  return (
    <>
      <p className="font-semibold">المرفقات</p>
      <div className="grid grid-cols-3">
        <div className="basis-1/3 px-2">
          <AttachmentUploadInput
            index={0}
            onFileUpload={(url) => onFileUploaded(url, 0)}
            onError={onUploadError}
            label="المرفق الأول"
          />
        </div>
        <div className="basis-1/3 px-2">
          <AttachmentUploadInput
            index={1}
            onFileUpload={(url) => onFileUploaded(url, 1)}
            onError={onUploadError}
            label="المرفق الثاني"
          />
        </div>
        <div className="basis-1/3 px-2">
          <AttachmentUploadInput
            index={2}
            onError={onUploadError}
            onFileUpload={(url) => onFileUploaded(url, 2)}
            label="المرفق الثالث"
          />
        </div>
      </div>
    </>
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
    mutationFn: (data: { file: File; index: number }) => uploadShieldAttachment(data.file),
    onSuccess: (data, variables) => {
      onFileUpload(data.data.files[0].file_url);
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
