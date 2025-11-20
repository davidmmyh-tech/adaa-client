import type { SubscribeForm } from '@/schemas/validation';
import api from './api';

export type SubscriptionPayload = {
  email: string;
  phone: string;
  plan: 'monthly' | 'yearly';
  attachment: File;
};

export type SubscriptionResponse = {
  success: boolean;
  message: string;
  data?: {
    subscription_id: string;
    status: string;
  };
};

export async function submitSubscription(payload: SubscribeForm) {
  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('email', payload.email);
  formData.append('phone', payload.phone);
  formData.append('plan_id', payload.plan_id);
  formData.append('receipt_image', payload.attachment);

  return api.post<SubscriptionResponse>('/api/subscription-requests', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
