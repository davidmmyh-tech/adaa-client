import type { Id } from '@/schemas/types';
import type { CertificateAnswer } from '@/services/certificates/types';
import type { ShieldAnswers } from '@/services/shield';

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

export function setCurrentHrAxisIndex(index: number, userId: Id) {
  const key = `hrAxisIndex_user_${userId}`;
  return localStorage.setItem(key, JSON.stringify(index));
}

export function getCurrentHrAxisIndex(userId: Id): number {
  const key = `hrAxisIndex_user_${userId}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : 0;
}

export function setHrAxisAnswers(axisIndex: number, answers: CertificateAnswer[], userId: Id) {
  const key = `hrAxis_${axisIndex}_user_${userId}`;
  return localStorage.setItem(key, JSON.stringify(answers));
}

export function getHrAxisAnswers(axisIndex: number, userId: Id): CertificateAnswer[] {
  const key = `hrAxis_${axisIndex}_user_${userId}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

export function removeAllHrAxisAnswers(userId: Id) {
  const keys = Object.keys(localStorage);
  const prefix = `hrAxis`;
  const suffix = `_user_${userId}`;
  keys.forEach((key) => {
    if (key.startsWith(prefix) && key.endsWith(suffix)) {
      localStorage.removeItem(key);
    }
  });
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

export function setCurrentShieldAxisIndex(index: number, userId: Id) {
  const key = `shieldAxisIndex_user_${userId}`;
  return localStorage.setItem(key, JSON.stringify(index));
}

export function getCurrentShieldAxisIndex(userId: Id): number {
  const key = `shieldAxisIndex_user_${userId}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : 0;
}

export function setShieldAxisAnswers(axisIndex: number, answers: ShieldAnswers, userId: Id) {
  const key = `shieldAxis_${axisIndex}_user_${userId}`;
  return localStorage.setItem(key, JSON.stringify(answers));
}

export function getShieldAxisAnswers(axisIndex: number, userId: Id): ShieldAnswers {
  const key = `shieldAxis_${axisIndex}_user_${userId}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : { axis_id: '', questions: [], attachments: [] };
}

export function removeAllShieldAxisAnswers(userId: Id) {
  const keys = Object.keys(localStorage);
  const prefix = `shieldAxis`;
  const suffix = `_user_${userId}`;
  keys.forEach((key) => {
    if (key.startsWith(prefix) && key.endsWith(suffix)) {
      localStorage.removeItem(key);
    }
  });
}
