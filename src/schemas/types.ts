export type Organization = {
  id: Id;
  name: string;
  website: string;
  is_registered: boolean;
  is_approval_pending: boolean;
  is_approved: boolean;
  has_shield_completed: boolean;
  has_operational_certificate: boolean;
  has_strategic_certificate: boolean;
  has_human_resources_certificate: boolean;
  is_adaa_plus: boolean;
};

export type User = {
  id: Id;
  first_name: string;
  last_name: string;
  organization: null | Organization;
};

export type Id = string | number;

export type Pagination = {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
};
