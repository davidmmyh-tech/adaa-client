import type { Id } from '@/schemas/types';
import api from './api';

export interface Podcast {
  id: Id;
  title: string;
  description: string;
  audio_url: string;
  duration: string;
  cover_image: string;
  published_at: string;
}

type PaginationMeta = {
  current_page: number;
  total: number;
  last_page: number;
};

export interface PodcastsResponse {
  success: boolean;
  podcasts: Podcast[];
  meta: PaginationMeta;
}

type PodcastDetailsResponse = {
  success: boolean;
  podcast: Podcast;
};

export function getPodcasts({ page = 1, limit = 10, query = '' }: { page?: number; limit?: number; query?: string }) {
  return api.get<PodcastsResponse>('/api/podcasts', { params: { page, limit, query } });
}

export function getPodcastDetails(id: Id) {
  return api.get<PodcastDetailsResponse>(`/api/podcasts/${id}`);
}
