// Re-export PostStatus from types for backward compatibility
export { PostStatus } from "@/types";

// Legacy alias
export const BlogStatus = {
  PUBLISHED: 2,
  DRAFT: 1,
} as const;

export enum DocumentCategory {
  // Blog-related categories
  BlogCover = 1,
  BlogContent = 2,
  BlogVideo = 3,
  BlogBanner = 4,

  // User-related categories
  UserProfile = 10,
  UserDocument = 11,
  UserPrivate = 12,

  // System categories
  SystemTemplate = 20,
  SystemDefault = 21,

  // Legacy/General
  Product = 30,

  // Miscellaneous
  Temporary = 99,
  Other = 100,
}

export enum ContentCategory {
  Blog = 1,
  Project = 2,
  Article = 3,
}
