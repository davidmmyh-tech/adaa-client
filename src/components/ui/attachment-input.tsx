import { useRef, useState } from 'react';
import { File, Loader2, X } from 'lucide-react';
import { FileInput } from './file-input';
import { UploadIcon } from './icons';
import { Button } from './button';
import ErrorMessage from './extend/error-message';
import { cn } from '@/lib/utils';

type AttachmentInputProps = {
  id: string;
  label?: string;
  value?: string;
  onFileUpload: (url: string) => void;
  onError?: (error: Error) => void;
  uploadFn: (file: File) => Promise<string>;
  disabled?: boolean;
  accept?: string;
  className?: string;
};

function getFileNameFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const fileName = pathname.split('/').pop() || 'file';
    return decodeURIComponent(fileName);
  } catch {
    return 'ملف محفوظ';
  }
}

export function AttachmentInput({
  id,
  label,
  value,
  onFileUpload,
  onError,
  uploadFn,
  disabled = false,
  accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png',
  className = ''
}: AttachmentInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [existingFileUrl, setExistingFileUrl] = useState<string | null>(typeof value === 'string' ? value : null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    setError(null);
    setIsPending(true);

    try {
      const fileUrl = await uploadFn(file);
      onFileUpload(fileUrl);
      setUploadedFileName(file.name);
      setExistingFileUrl(fileUrl);
    } catch (err) {
      if (fileInputRef.current) fileInputRef.current.value = '';
      setUploadedFileName(null);
      onError?.(err as Error);
      setError('فشل رفع الملف. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsPending(false);
    }
  };

  const handleRemoveFile = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    setUploadedFileName(null);
    setExistingFileUrl(null);
    onFileUpload('');
    setError(null);
  };

  const hasFile = existingFileUrl || uploadedFileName;
  const displayName = uploadedFileName || (existingFileUrl ? getFileNameFromUrl(existingFileUrl) : null);

  return (
    <div className="w-full space-y-2">
      {label && <p className="font-semibold">{label}</p>}
      {hasFile ? (
        <div
          className={cn('border-primary flex items-center justify-between rounded-md border bg-white p-4', className)}
        >
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <File className="strock-primary h-6 w-6 shrink-0" />
            <div className="space-y-2">
              <p className="truncate font-semibold text-ellipsis">{displayName}</p>
              <p className="text-muted text-xs">PDF / Excel (حد أقصى 10 MB)</p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemoveFile}
            disabled={isPending || disabled}
            className="hover:bg-destructive/10 hover:text-destructive shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <FileInput
          ref={fileInputRef}
          id={id}
          accept={accept}
          onFileChange={handleFileChange}
          disabled={isPending || disabled}
          className={cn('bg-white', className)}
        >
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              {isPending ? <Loader2 className="spinner" width={28} height={28} /> : <UploadIcon className="h-7 w-7" />}
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <p className="truncate font-semibold text-ellipsis">{isPending ? 'جاري الرفع...' : 'ارفع الملف'}</p>
              <p className="text-muted text-xs">PDF / Excel (حد أقصى 10 MB)</p>
            </div>
          </div>
        </FileInput>
      )}
      <ErrorMessage error={error} />
    </div>
  );
}
