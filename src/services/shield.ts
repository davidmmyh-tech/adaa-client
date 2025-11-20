import type { Id } from '@/schemas/types';
import api from './api';

export type ShieldQuestion = {
  id: Id;
  question: string;
  has_attachment: false;
  current_answer: null;
  attachment: null;
};

export type ShieldQuestionsResponse = {
  axes: {
    id: Id;
    title: string;
    description: string;
    questions: ShieldQuestion[];
  }[];
};

export type QuestionAnswer = {
  question_id: Id;
  answer: boolean;
};

export type AxisAnswers = {
  axis_id: Id;
  questions: QuestionAnswer[];
  attachments: string[];
};

export type UploadResponse = {
  success: boolean;
  files: {
    file_url: string;
    file_path: string;
  }[];
};

export type ShieldSubmitResponse = {
  success: boolean;
  message: string;
  total_score: number;
  rank: string | null;
};

export type AnalyticsResponse = {
  success: boolean;
  total_organizations_awarded: number;
  highest_rate: number;
  average_rate: number;
  organizations_completed_ratio: number;
};

export type ShieldOrganization = {
  organization_name: string;
  organization_website: string;
  grade: 'good' | 'very_good' | 'excellent' | 'acceptable';
  region: string;
  year: number;
  rate: number; //percentage from 0 to 100
};

export type SieldOrganizationsResponse = {
  success: boolean;
  data: ShieldOrganization[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    per_page: number;
  };
};

export async function getShieldQuestions() {
  return api.get<ShieldQuestionsResponse>('/api/shield/questions');
}

export async function submitShieldQuestions(payload: AxisAnswers) {
  return api.post<ShieldSubmitResponse>('/api/shield/submit', { submissions: [{ ...payload }] });
}

export async function uploadShieldAttachment(file: File) {
  const formData = new FormData();
  formData.append('files[]', file);

  return api.post<UploadResponse>('/api/shield/attachment/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export async function getShieldAnalytics() {
  return api.get<AnalyticsResponse>('/api/shield/analytics');
}

export async function getShieldOrganizations(params: {
  query?: string;
  grade?: string;
  region?: string;
  year?: string | number;
  page?: string | number;
  limit?: string | number;
}) {
  return api.get<SieldOrganizationsResponse>('/api/shield/organizations', {
    params
  });
}
