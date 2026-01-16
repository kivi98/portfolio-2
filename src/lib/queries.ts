import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogApi, postApi, projectApi } from "./apiClient";
import { Blog, Post } from "@/types";
import { PostStatus } from "@/types";

// Query keys for consistent caching
export const queryKeys = {
  posts: {
    all: ["posts"] as const,
    lists: () => [...queryKeys.posts.all, "list"] as const,
    list: (filters: {
      page?: number;
      limit?: number;
      search?: string;
      contentCategoryId?: number;
      status?: PostStatus;
    }) => [...queryKeys.posts.lists(), filters] as const,
    details: () => [...queryKeys.posts.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.posts.details(), id] as const,
    bySlug: (slug: string) =>
      [...queryKeys.posts.details(), "slug", slug] as const,
    featured: (contentCategoryId?: number) =>
      [...queryKeys.posts.all, "featured", contentCategoryId] as const,
  },
  blogs: {
    all: ["blogs"] as const,
    lists: () => [...queryKeys.blogs.all, "list"] as const,
    list: (filters: { page?: number; limit?: number; search?: string }) =>
      [...queryKeys.blogs.lists(), filters] as const,
    details: () => [...queryKeys.blogs.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.blogs.details(), id] as const,
    bySlug: (slug: string) =>
      [...queryKeys.blogs.details(), "slug", slug] as const,
    featured: () => [...queryKeys.blogs.all, "featured"] as const,
  },
  projects: {
    all: ["projects"] as const,
    lists: () => [...queryKeys.projects.all, "list"] as const,
    list: (filters: {
      page?: number;
      limit?: number;
      search?: string;
      technology?: string;
    }) => [...queryKeys.projects.lists(), filters] as const,
    details: () => [...queryKeys.projects.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.projects.details(), id] as const,
    bySlug: (slug: string) =>
      [...queryKeys.projects.details(), "slug", slug] as const,
    featured: () => [...queryKeys.projects.all, "featured"] as const,
  },
};

// Post hooks (new, generic for all content types)
export const usePosts = (
  page = 1,
  limit = 10,
  contentCategoryId?: number,
  status?: PostStatus,
) => {
  return useQuery({
    queryKey: queryKeys.posts.list({ page, limit, contentCategoryId, status }),
    queryFn: () => postApi.getAll(page, limit, contentCategoryId, status),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const usePostsByContentCategory = (
  categoryName: string,
  page = 1,
  limit = 10,
  status?: PostStatus,
) => {
  return useQuery({
    queryKey: queryKeys.posts.list({
      page,
      limit,
      search: categoryName,
      status,
    }),
    queryFn: () =>
      postApi.getByContentCategory(categoryName, page, limit, status),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const usePost = (id: number) => {
  return useQuery({
    queryKey: queryKeys.posts.detail(id),
    queryFn: () => postApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const usePostBySlug = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.posts.bySlug(slug),
    queryFn: () => postApi.getBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useSearchPosts = (
  query: string,
  page = 1,
  limit = 10,
  contentCategoryId?: number,
) => {
  return useQuery({
    queryKey: queryKeys.posts.list({
      page,
      limit,
      search: query,
      contentCategoryId,
    }),
    queryFn: () => postApi.search(query, page, limit, contentCategoryId),
    enabled: !!query.trim(),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

// Blog hooks (backward compatibility - these filter posts by Blog content category)
export const useBlogs = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: queryKeys.blogs.list({ page, limit }),
    queryFn: () => blogApi.getAll(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

export const useBlog = (id: number) => {
  return useQuery({
    queryKey: queryKeys.blogs.detail(id),
    queryFn: () => blogApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useBlogBySlug = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.blogs.bySlug(slug),
    queryFn: () => blogApi.getBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useSearchBlogs = (query: string, page = 1, limit = 10) => {
  return useQuery({
    queryKey: queryKeys.blogs.list({ page, limit, search: query }),
    queryFn: () => blogApi.search(query, page, limit),
    enabled: !!query.trim(),
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFeaturedBlogs = () => {
  return useQuery({
    queryKey: queryKeys.blogs.featured(),
    queryFn: () => blogApi.getFeatured(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Project hooks
export const useProjects = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: queryKeys.projects.list({ page, limit }),
    queryFn: () => projectApi.getAll(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProject = (id: number) => {
  return useQuery({
    queryKey: queryKeys.projects.detail(id),
    queryFn: () => projectApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useProjectBySlug = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.projects.bySlug(slug),
    queryFn: () => projectApi.getBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useSearchProjects = (query: string, page = 1, limit = 10) => {
  return useQuery({
    queryKey: queryKeys.projects.list({ page, limit, search: query }),
    queryFn: () => projectApi.search(query, page, limit),
    enabled: !!query.trim(),
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProjectsByTechnology = (
  technology: string,
  page = 1,
  limit = 10,
) => {
  return useQuery({
    queryKey: queryKeys.projects.list({ page, limit, technology }),
    queryFn: () => projectApi.getByTechnology(technology, page, limit),
    enabled: !!technology,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: queryKeys.projects.featured(),
    queryFn: () => projectApi.getFeatured(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Mutation hooks for future use (create, update, delete)
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blog: Omit<Blog, "id">) => {
      // This would be implemented when you have POST endpoints
      return Promise.resolve(blog as Blog);
    },
    onSuccess: () => {
      // Invalidate and refetch blogs
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs.lists() });
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blog: Blog) => {
      // This would be implemented when you have PUT endpoints
      return Promise.resolve(blog);
    },
    onSuccess: (updatedBlog) => {
      // Update the cache with the new data
      queryClient.setQueryData(
        queryKeys.blogs.detail(updatedBlog.id),
        updatedBlog,
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs.lists() });
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      // This would be implemented when you have DELETE endpoints
      return Promise.resolve(id);
    },
    onSuccess: (id) => {
      // Remove from cache and invalidate lists
      queryClient.removeQueries({ queryKey: queryKeys.blogs.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs.lists() });
    },
  });
};
