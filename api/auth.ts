//NOTE: on register Success i will redirect to organization form to complete registration
//NOTE: user can't use the app without being a verified organization (will have to wait for admin approval)

//TODO: api/current-user
// verify the current user token sent through Authorization header Bearer {token}
// and return the user data
type CurrentUserResponse = {
  success: boolean;
  message: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;

    organization: null | {
      id: string;
      name: string;
      website: string;
      is_registered: boolean;
      is_approval_pending: boolean;
      is_approved: boolean;
    };
  };
};

//TODO: api/register
// This endpoint handles user registration
// will have a follow up form for organization data

/* Request Body */
type RegisterBody = {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  postal_code: string;
  user_organization_role: string;
};

/* Response Data */
type RegisterResponse = {
  success: boolean;
  message: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;

    organization: null | {
      id: string;
      name: string;
      website: string;
      is_registered: boolean;
      is_approval_pending: boolean;
      is_approved: boolean;
    };
  };
};

//TODO: api/register/organization
type RegisterOrganizationBody = {
  name: string;
  executive_name: string;
  email: string;
  phone: string;
  address: string;
  license_number: string;
  website: string;
};

type RegisterOrganizationResponse = {
  success: boolean;
  message: string;
  organization: {
    id: string;
    name: string;
    website: string;
    is_registered: boolean;
    is_approval_pending: boolean;
    is_approved: boolean;
  };
};

//TODO: api/login
type LoginBody = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  token: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;

    organization: {
      id: string;
      name: string;
      is_registered: boolean;
      is_approval_pending: boolean;
      is_approved: boolean;
    };
  };
};

//TODO: api/forget-password
type ForgetPasswordBody = {
  email: string;
};

type ForgetPasswordResponse = {
  success: boolean;
};

//TODO: api/reset-password  Authorization: Bearer {token}
// the token is from forget-password response and must be around 10 minutes valid MAXIMUM
type ResetPasswordBody = {
  new_password: string;
  confirm_password: string;
};

type ResetPasswordResponse = {
  success: boolean;
  message: string;
};
