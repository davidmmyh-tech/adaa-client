import type { Id } from '@/schemas/types';
import type { CertificateAnswer } from '@/services/certificates/types';
import type { ShieldAnswers } from '@/services/shield';

type CertificateHrAxisMilestone = { index: number; answers: CertificateAnswer[]; userId: Id };
type ShieldAxisMilestone = { index: number; answers: ShieldAnswers; userId: Id };

export function setToken(token: string) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function removeToken() {
  return localStorage.removeItem('token');
}

export function setSessionEmail(email: string) {
  return sessionStorage.setItem('email', email);
}

export function getSessionEmail() {
  return sessionStorage.getItem('email') || '';
}

export function removeSessionEmail() {
  return sessionStorage.removeItem('email');
}

export function setLastHrAxis(axis: number, answers: CertificateAnswer[] = [], userId: Id) {
  return localStorage.setItem('lastHrAxis', JSON.stringify({ index: axis, answers, userId }));
}

export function getLastHrAxis() {
  const data: CertificateHrAxisMilestone | null = JSON.parse(localStorage.getItem('lastHrAxis') || 'null');
  return data || { index: 0, answers: [], userId: 0 };
}

export function removeLastHrAxis() {
  return localStorage.removeItem('lastHrAxis');
}

export function setLastShieldAxis(
  axis: number,
  answers: ShieldAnswers = { axis_id: '', questions: [], attachments: [] },
  userId: Id
) {
  return localStorage.setItem('lastShieldAxis', JSON.stringify({ index: axis, answers, userId }));
}

export function getLastShieldAxis() {
  const data: ShieldAxisMilestone | null = JSON.parse(localStorage.getItem('lastShieldAxis') || 'null');
  return data || { index: 0, answers: { axis_id: 0, questions: [], attachments: [] }, userId: 0 };
}

export function removeLastShieldAxis() {
  return localStorage.removeItem('lastShieldAxis');
}
