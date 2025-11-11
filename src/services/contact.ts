import api from './api';

export function inquiry(content: string) {
  return api.post<{ message: string; success: boolean }>('/api/inquiry', { content });
}
