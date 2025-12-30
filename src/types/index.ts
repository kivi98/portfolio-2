import { BlogStatus } from "@/enum";

export type ImageItem = {
  id: number;
  src: string;
  alt: string;
};

export interface ApplicationUser {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Media {
  id: number;
  type?: "image" | "video";
  fileName: string;
  altText: string;
  caption: string;
  contentType: string;
  fileSize: number;
  path: string; // Main file URL
  thumbnailPath?: string; // Thumbnail URL for images
  url: string; // Legacy support - will map to path
  uploadedAt: string;
  uploadedBy: string;
  status: string;
  category?: number;
  docketId: number;
  entityId?: number; // Blog ID for blog uploads
  userId?: string; // User ID who uploaded
  subFolder?: string; // Custom subfolder within category
}

export interface Document {
  id: number;
  fileName: string;
  altText?: string;
  caption?: string;
  contentType: string;
  fileSize: number;
  path: string;
  thumbnailPath: string;
  docketId: number;
  uploadedAt: string;
  uploadedBy: string;
  status: string;
  category: number;
}

export interface Docket {
  id: number;
  name: string;
  documents: Document[];
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  coverImage: string;
  description: string;
  blogOwner: ApplicationUser;
  blogOwnerId: number;
  imageUrl?: string;
  status: BlogStatus;
  slug: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  media?: Media[];
  likes: number;
  docketId: number;
  docket?: Docket;
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
  date?: string;
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

export interface ErrorDetails {
  title: string;
  code: number;
  description: string;
  target: string;
}

export interface ApiResponse<T> {
  data: T;
  isSuccess: boolean;
  error: ErrorDetails | null;
}
