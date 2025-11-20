import type { Id } from 'react-toastify';
import api from './api';

type ReleasesResponse = {
  success: boolean;
  Releases: [
    {
      id: Id;
      title: string;
      description: string;
      published_date: string;
      image: string;
    }
  ];
  pagination: {
    current_page: number;
    limit: number;
    total: number;
    last_page: number;
    has_more: boolean;
  };
};

type ReleaseCategory = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

type ReleasesCategoriesResponse = {
  success: true;
  data: {
    current_page: number;
    data: ReleaseCategory[];
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
};

type ReleasesItem = {
  id: number;
  title: string;
  file_path: string;
  excel_path: string;
  powerbi_path: string;
  description: string;
  image: string;
  release_category_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

type FindReleasesResponse = {
  success: boolean;
  query: string;
  category: string;
  page: number;
  limit: number;
  items: ReleasesItem[];
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
  };
};

export function getReleases({ page, limit }: { page: number; limit: number }) {
  return api.get<ReleasesResponse>('/api/releases', {
    params: { page, limit }
  });
}

export function findReleases(params: { page: number; limit: number; q?: string; category?: string }) {
  return api.get<FindReleasesResponse>('/api/search/releases', { params });
}

export function getReleasesCategories() {
  return api.get<ReleasesCategoriesResponse>('/api/releasescategory ');
}
