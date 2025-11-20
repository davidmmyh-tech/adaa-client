export type Id = string | number;
export type CertificateClass = 'diamond' | 'gold' | 'silver' | 'bronze';
export type CertificateTrack = 'strategic' | 'operational' | 'hr';
export type CertificateTrackStatus = 'لم يبدأ بعد' | 'مكتمل' | 'قيد التقييم';

export type Pagination = {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
};

export type User = {
  id: Id;
  name: string;
  email: string;
  phone: string;
  email_verified_at: string;
  user_priviliages: string;
  created_at: string;
};

export type Organization = {
  id: Id;
  name: string;
  sector: string;
  email: string;
  phone: string;
  status: 'approved' | 'pending';
  shield_percentage: number;
  shield_rank: number;
  certificate_final_score: number;
  certificate_final_rank: number;
  established_at: string;
  created_at: string;
};

export type Flags = {
  email_verified: boolean;
  has_organization: boolean;
  organization_status: 'approved' | 'pending' | null;
  subscription_status: 'approved' | 'pending' | null;
  can_access_features: boolean;
  has_active_subscription: boolean;
  completed_shield: boolean;
  completed_strategic_certificate: boolean;
  completed_hr_certificate: boolean;
  completed_operational_certificate: boolean;
};
