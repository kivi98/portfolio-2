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
  entityId?: number; // Post ID for post uploads
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

// Post-related enums
export enum PostStatus {
  Draft = 1,
  Published = 2,
  Archived = 3,
}

export interface PostContentCategory {
  id: number;
  name: string;
}

export interface PostCategory {
  id: number;
  name: string;
  code: string;
}

export interface PostTag {
  id: number;
  name: string;
}

export interface PostComment {
  id: number;
  content: string;
  authorId: number;
  author: ApplicationUser;
  createdAt: string;
}

// Main Post interface that replaces Blog
export interface Post {
  id: number;
  title: string;
  content: string;
  coverImage?: string;
  description?: string;
  slug: string;
  ownerId?: number;
  owner?: ApplicationUser;
  postCategoryId?: number;
  postCategory?: PostCategory;
  contentCategory?: PostContentCategory;
  status?: PostStatus;
  tags?: (PostTag | string)[]; // Accept both PostTag objects and strings for flexibility
  contributors?: ApplicationUser[];
  media?: Media[];
  comments?: PostComment[];
  likes: number;
  docketId?: number;
  docket?: Docket;
  createdAt?: string;
  updatedAt?: string;
  excerpt?: string;
  // Legacy properties for backward compatibility
  author?: string;
  date?: string;
  image?: string;
  blogOwner?: ApplicationUser;
  blogOwnerId?: number;
}

// Backward compatibility alias - Blog is now a Post
export type Blog = Post;

export interface Project {
  id: number;
  title: string;
  description?: string;
  image?: string;
  link?: string;
  contributors?: string[];
  likes?: number;
  date?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  // Post-compatible properties
  coverImage?: string;
  content?: string;
  owner?: ApplicationUser;
  tags?: (PostTag | string)[];
  createdAt?: string;
  slug?: string;
  status?: PostStatus;
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
