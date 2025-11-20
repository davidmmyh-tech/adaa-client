import type { Id } from 'react-toastify';
import api from './api';

type BlogsResponse = {
  success: boolean;
  blogs: [
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

type BlogDetailsResponse = {
  success: boolean;
  blog: {
    id: string;
    title: string;
    description: string;
    content: string;
    author: string;
    published_date: string;
    image: string;
  };
};

type BlogCategory = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

type BlogsCategoriesResponse = {
  success: true;
  data: {
    current_page: number;
    data: BlogCategory[];
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
};

type FindBlogsResponse = {
  success: boolean;
  query: string;
  category: string;
  page: number;
  limit: number;
  items: {
    id: number;
    blogs_category_id: number;
    title: string;
    description: string;
    content: string;
    author: string;
    image: string;
    published_at: string;
    created_at: string;
    updated_at: string;
  }[];
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
  };
};

export function getBlogs({ page, limit }: { page: number; limit: number }) {
  return api.get<BlogsResponse>('/api/blogs', {
    params: { page, limit }
  });
}

export function findBlogs(params: { page: number; limit: number; q?: string; category?: string }) {
  return api.get<FindBlogsResponse>('/api/search', { params });
}

export function getBlogDetails(id: Id) {
  return api.get<BlogDetailsResponse>('/api/blogs/' + id);
}

export function getBlogsCategories() {
  return api.get<BlogsCategoriesResponse>('/api/blogscategories');
}
