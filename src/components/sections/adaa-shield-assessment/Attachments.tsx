import { isAxiosError, type AxiosError } from 'axios';
import type { Id } from 'react-toastify';
import { uploadShieldAttachment } from '@/services/shield';
import { AttachmentInput } from '@/components/ui/attachment-input';

type Props = {
  onFileUploaded: (url: string, index: number) => void;
  onUploadError?: (error: AxiosError) => void;
  axisId: Id;
  values: string[];
};

export default function AttachmentsSection({ onFileUploaded, onUploadError, axisId, values }: Props) {
  const handleUpload = async (file: File): Promise<string> => {
    try {
      const response = await uploadShieldAttachment(file);
      return response.data.files[0].file_url;
    } catch (error) {
      if (isAxiosError(error) && onUploadError) {
        onUploadError(error);
      }
      throw error;
    }
  };

  return (
    <>
      <p className="font-semibold">المرفقات</p>
      <div className="grid grid-cols-3">
        <div className="basis-1/3 px-2">
          <AttachmentInput
            id={`attachment-0-${axisId}`}
            label="المرفق الأول"
            value={values[0]}
            onFileUpload={(url) => onFileUploaded(url, 0)}
            uploadFn={handleUpload}
          />
        </div>
        <div className="basis-1/3 px-2">
          <AttachmentInput
            id={`attachment-1-${axisId}`}
            label="المرفق الثاني"
            value={values[1]}
            onFileUpload={(url) => onFileUploaded(url, 1)}
            uploadFn={handleUpload}
          />
        </div>
        <div className="basis-1/3 px-2">
          <AttachmentInput
            id={`attachment-2-${axisId}`}
            label="المرفق الثالث"
            value={values[2]}
            onFileUpload={(url) => onFileUploaded(url, 2)}
            uploadFn={handleUpload}
          />
        </div>
      </div>
    </>
  );
}
