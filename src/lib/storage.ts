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

// User verification for form data
export function setCurrentUserId(userId: Id) {
  localStorage.setItem('currentFormUserId', JSON.stringify(userId));
}

export function getCurrentUserId(): Id | null {
  const data = localStorage.getItem('currentFormUserId');
  return data ? JSON.parse(data) : null;
}

export function validateUserAndClearIfMismatch(userId: Id) {
  const storedUserId = getCurrentUserId();

  if (storedUserId !== null && storedUserId !== userId) {
    // Different user logged in, clear all form data
    removeAllHrAxisAnswers();
    removeAllShieldAxisAnswers();
    localStorage.removeItem('hrAxisIndex');
    localStorage.removeItem('shieldAxisIndex');
  }

  // Set current user
  setCurrentUserId(userId);
}

export function setCurrentHrAxisIndex(index: number) {
  const key = 'hrAxisIndex';
  return localStorage.setItem(key, JSON.stringify(index));
}

export function getCurrentHrAxisIndex(): number {
  const key = 'hrAxisIndex';
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : 0;
}

export function setHrAxisAnswers(axisIndex: number, answers: CertificateAnswer[]) {
  const key = `hrAxis_${axisIndex}`;
  return localStorage.setItem(key, JSON.stringify(answers));
}

export function getHrAxisAnswers(axisIndex: number): CertificateAnswer[] {
  const key = `hrAxis_${axisIndex}`;
  const data = localStorage.getItem(key);
  if (!data) return [];

  const answers: CertificateAnswer[] = JSON.parse(data);
  // Filter out empty answers (no answer text or empty attachment)
  const validAnswers = answers.filter((answer) => answer.answer?.trim());

  // Update storage with cleaned data
  if (validAnswers.length !== answers.length) {
    if (validAnswers.length > 0) {
      localStorage.setItem(key, JSON.stringify(validAnswers));
    } else {
      localStorage.removeItem(key);
    }
  }

  return validAnswers;
}

export function removeAllHrAxisAnswers() {
  const keys = Object.keys(localStorage);
  const prefix = 'hrAxis';
  keys.forEach((key) => {
    if (key.startsWith(prefix)) {
      localStorage.removeItem(key);
    }
  });
}

export function setLastShieldAxis(
  axis: number,
  answers: ShieldAnswers = { axis_id: 0, questions: [], attachments: [] },
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

export function setCurrentShieldAxisIndex(index: number) {
  const key = 'shieldAxisIndex';
  return localStorage.setItem(key, JSON.stringify(index));
}

export function getCurrentShieldAxisIndex(): number {
  const key = 'shieldAxisIndex';
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : 0;
}

export function setShieldAxisAnswers(axisIndex: number, answers: ShieldAnswers) {
  const key = `shieldAxis_${axisIndex}`;
  return localStorage.setItem(key, JSON.stringify(answers));
}

export function getShieldAxisAnswers(axisIndex: number): ShieldAnswers {
  const key = `shieldAxis_${axisIndex}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : { axis_id: 0, questions: [], attachments: [] };
}

export function removeAllShieldAxisAnswers() {
  const keys = Object.keys(localStorage);
  const prefix = 'shieldAxis';
  keys.forEach((key) => {
    if (key.startsWith(prefix)) {
      localStorage.removeItem(key);
    }
  });
}
