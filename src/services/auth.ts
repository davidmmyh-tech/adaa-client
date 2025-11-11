import type { LoginForm, RegisterForm, RegisterOrganizationForm } from '@/schemas/validation';
import api from './api';
import type { Id, Organization, User } from '@/schemas/types';

type CurrentUserResponse = {
  success: boolean;
  token: '4|jvcddteJ2KQL7Bo3XVd01srlcJVFpIy8pSl2dzWvf3680509';
  user: {
    id: Id;
    name: string;
    email: string;
    phone: string;
    user_priviliages: string;
    organization: Organization | null;
  };
};

type RegisterResponse = {
  success: boolean;
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    email_verified_at: string | null;
  };
};

type RegisterOrganizationResponse = {
  success: boolean;
  message: string;
  organization: Organization;
};

type LoginResponse = {
  success: boolean;
  token: string;
  user: User;
};

type ForgetPasswordResponse = {
  success: boolean;
};

type ResetPasswordResponse = {
  success: boolean;
  message: string;
};

export type ResetPasswordPayload = {
  password: string;
  password_confirmation: string;
  token: string;
};

export function currentUser() {
  return api.get<CurrentUserResponse>('/api/me');
}

export function register(payload: RegisterForm) {
  return api.post<RegisterResponse>('/api/register', {
    ...payload,
    name: payload.first_name + ' ' + payload.last_name
  });
}

export function registerOrganization(payload: RegisterOrganizationForm) {
  return api.post<RegisterOrganizationResponse>('/api/organizations', {
    ...payload,
    sector: 'مؤسسة',
    established_at: '1-5-2023',
    address: 'n/a'
  });
}

export function loginUser(payload: LoginForm) {
  return api.post<LoginResponse>('/api/login', payload);
}

export function logoutUser() {
  return api.post('/api/logout');
}

export function forgetPassword(email: string) {
  return api.post<ForgetPasswordResponse>('/api/password/forgot', { email });
}

export function resetPassword(payload: { password: string; password_confirmation: string; token: string }) {
  return api.post<ResetPasswordResponse>('/api/password/reset', payload);
}

export function resendEmailVerification(payload: { email: string }) {
  return api.post<ResetPasswordResponse>('/api/email/resend', payload);
}
