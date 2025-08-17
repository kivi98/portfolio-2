export enum BlogStatus {
    PUBLISHED = 1,
    DRAFT = 2,
  }
  
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
    Other = 99,
  }
  