import type { CertificateTrack } from '@/schemas/types';
import api from '../api';
import type { CertificateAnswer, CertificateQuestionsResponse, UploadCertificateResponse } from './types';

export function uploadCertificateAttachment(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return api.post<UploadCertificateResponse>(`/api/certificates/hr/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export function certificateQuestions(track: CertificateTrack) {
  return api.get<CertificateQuestionsResponse>(`/api/certificates/${track}/questions`);
}

export async function submitCertificateQuestions(track: CertificateTrack, payload: CertificateAnswer[]) {
  const formData = new FormData();

  payload.forEach((answer, index) => {
    formData.append(`answers[${index}][question_id]`, answer.question_id.toString());
    formData.append(`answers[${index}][selected_option]`, answer.answer);
    if (answer.attachment) formData.append(`answers[${index}][attachment]`, answer.attachment);
  });

  await api.post(`/api/certificates/${track}/save`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return api.post(`/api/certificates/${track}/submit`);
}

export function submitHrAxis(payload: CertificateAnswer[]) {
  return api.post(`/api/certificates/hr/save`, {
    answers: payload.map((d) => {
      const { answer, attachment, ...rest } = d;
      return { ...rest, selected_option: answer, attachment_url: attachment };
    })
  });
}
