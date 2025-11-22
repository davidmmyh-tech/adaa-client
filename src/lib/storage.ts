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

export function setLastHrAxis(axis: number) {
  return localStorage.setItem('lastHrAxis', axis.toString());
}

export function getLastHrAxis() {
  const value = localStorage.getItem('lastHrAxis');
  return value !== null ? Number(value) : -1;
}

export function removeLastHrAxis() {
  return localStorage.removeItem('lastHrAxis');
}
