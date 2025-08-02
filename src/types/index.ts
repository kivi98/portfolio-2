export type ImageItem = {
  id: number;
  src: string;
  alt: string;
};

export interface Blog {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  image: string;
  tags: string[];
  likes: number;
  slug?: string;
  excerpt?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  contributors: string[];
  likes: number;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
