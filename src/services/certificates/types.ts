import type { CertificateClass, Id, CertificateTrack, CERTIFICATE_TRACKStatus } from '@/schemas/types';

export type CertificateQuestion = {
  id: number;
  certificate_axis_id: number;
  certificate_axis_name: string;
  question_text: string;
  options: string[];
  points_mapping: Record<string, number>;
  attachment_required: boolean;
  path: CertificateTrack;
  weight: string;
  created_at: string;
  updated_at: string;
};

export type UploadCertificateResponse = {
  success: boolean;
  message: string;
  data: {
    attachment_path: string;
    attachment_url: string;
  };
};

export type CertificateQuestionsResponse = {
  success: boolean;
  data: {
    id: number;
    name: string;
    description: string;
    path: CertificateTrack;
    weight: string;
    created_at: string;
    updated_at: string;
    questions: CertificateQuestion[];
  }[];
};

export type CertificateAnswer = {
  question_id: Id;
  answer: string;
  attachment: File | string | null;
};

export type ChertificatesAnalyticsResponse = {
  success: true;
  data: {
    total_organizations: number;
    by_rank: {
      diamond: number;
      gold: number;
      silver: number;
      bronze: number;
    };
  };
};

export type CertificatesOrganization = {
  organization_id: number;
  organization_name: string;
  path: CertificateTrack;
  path_label: string;
  score: string;
  rank: CertificateClass;
  percentage: number;
  answered_questions: number;
  total_questions: number;
  is_complete: boolean;
  is_approved: boolean;
  website: string | null | undefined;
};

export type CertificateOrganizationsResponse = {
  success: true;
  data: {
    total_entries: number;
    total_organizations: number;
    data: CertificatesOrganization[];
  };
};

export type CERTIFICATE_TRACKSummary = {
  name_ar: string;
  name_en: string;
  status: CERTIFICATE_TRACKStatus;
  progress: {
    answered: number;
    total: number;
    percentage: number;
  };
  score: number;
  completed: boolean;
  submitted: number;
};

export type UserSummaryResponse = {
  success: true;
  data: {
    paths: Record<CertificateTrack, CERTIFICATE_TRACKSummary>;
  };
};

export type Schedule = {
  id: Id;
  submission_start_date: string;
  submission_end_date: string;
  submission_note: string;
  submission_end_date_only: string;
  submission_end_note: string;
  evaluation_start_date: string;
  evaluation_end_date: string;
  evaluation_note: string;
  announcement_date: string;
  announcement_note: string;
  awarding_start_date: string;
  awarding_end_date: string;
  awarding_note: string;
  created_at: string;
  updated_at: string;
};

export type CertificateScheduleResponse = {
  success: boolean;
  data: Schedule[];
};
