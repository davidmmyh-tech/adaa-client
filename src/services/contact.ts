import type { ContactForm, SponsorshipForm } from '@/schemas/validation';
import api from './api';

export function contactUs(payload: ContactForm) {
  return api.post('/api/contactus', payload);
}

export function sponsorship(payload: SponsorshipForm) {
  return api.post('/api/care-requests', payload);
}

export function inquiry(payload: { message: string }) {
  return api.post('/api/inquiry', payload);
}
