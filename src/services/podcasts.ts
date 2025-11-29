import type { Id, Pagination } from '@/schemas/types';
import api from './api';

export interface Podcast {
  id: Id;
  title: string;
  description: string;
  short_description: string;
  audio_url: string;
  video_url: string;
  duration: string;
  image: string;
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

export type NewsItem = {
  id: Id;
  title: string;
  content: string;
  publish_date: string;
  image: string;
  created_at: string;
  updated_at: string;
};

type NewsResponse = {
  success: boolean;
  message: string;
  data: NewsItem[];
  pagination: Pagination;
};

export function getPodcasts({ page = 1, limit = 10, query = '' }: { page?: number; limit?: number; query?: string }) {
  return api.get<PodcastsResponse>('/api/podcasts', { params: { page, limit, query } });
}

export function getPodcastDetails(id: Id) {
  return api.get<PodcastDetailsResponse>(`/api/podcasts/${id}`);
}

export function getNews({ page = 1, limit = 5 }: { page?: number; limit?: number }) {
  return api.get<NewsResponse>('/api/news', { params: { page, limit } });
}
