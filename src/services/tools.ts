import type { Id } from '@/schemas/types';
import api from './api';

export type Tool = {
  id: Id;
  headline: string;
  description: string;
  image: string;
  attachment: string;
  created_at: string;
  updated_at: string;
};

export type ToolsResponse = {
  current_page: 1;
  data: Tool[];

  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string;
    label: string;
    page: number;
    active: boolean;
  }[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
};

export function getTools(type: 'models' | 'dashboards' | 'tools') {
  return api.get<ToolsResponse>(`/api/${type}`);
}

export function getPBTools() {
  return api.get<{ data: ToolsResponse }>('/api/tools');
}

export async function downloadTool(id: Id, type: 'models' | 'dashboards' | 'tools') {
  const res = await api.get<Blob>(`/api/${type}/${id}/download`, {
    responseType: 'blob'
  });

  if (res.status !== 200) {
    return res;
  }

  const blob = new Blob([res.data], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = 'download.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
  return res;
}
