export type Organization = {
  id: Id;
  name: string;
  website: string;
  is_registered: boolean;
  is_approval_pending: boolean;
  is_approved: boolean;
};

export type User = {
  id: Id;
  first_name: string;
  last_name: string;
  organization: null | Organization;
};

export type Id = string | number;
