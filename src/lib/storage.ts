import type { CertificateAnswer } from '@/services/certificates/types';
import type { ShieldAnswers } from '@/services/shield';

type CertificateHrAxisMilestone = { index: number; answers: CertificateAnswer[] };
type ShieldAxisMilestone = { index: number; answers: ShieldAnswers };

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

export function setLastHrAxis(axis: number, answers: CertificateAnswer[] = []) {
  return localStorage.setItem('lastHrAxis', JSON.stringify({ index: axis, answers }));
}

export function getLastHrAxis() {
  const data: CertificateHrAxisMilestone | null = JSON.parse(localStorage.getItem('lastHrAxis') || 'null');
  return data || { index: 0, answers: [] };
}

export function removeLastHrAxis() {
  return localStorage.removeItem('lastHrAxis');
}

export function setLastShieldAxis(
  axis: number,
  answers: ShieldAnswers = { axis_id: '', questions: [], attachments: [] }
) {
  return localStorage.setItem('lastShieldAxis', JSON.stringify({ index: axis, answers }));
}

export function getLastShieldAxis() {
  const data: ShieldAxisMilestone | null = JSON.parse(localStorage.getItem('lastShieldAxis') || 'null');
  return data || { index: 0, answers: { axis_id: 0, questions: [], attachments: [] } };
}

export function removeLastShieldAxis() {
  return localStorage.removeItem('lastShieldAxis');
}
