import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  Blog,
  Post,
  Project,
  PaginatedResponse,
  ApiResponse,
  PostContentCategory,
  PostStatus,
} from "@/types";
import {
  mockBlogs,
  mockProjects,
  createPaginatedResponse,
  searchData,
} from "./mockData";

// API Configuration for .NET Backend
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "10000");
const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY || "authToken";

// API Endpoints
const POST_ENDPOINT = `${API_BASE_URL}/posts`;
const POST_CATEGORY_ENDPOINT = `${POST_ENDPOINT}/category`;
const POST_CONTENT_CATEGORY_ENDPOINT = `${POST_ENDPOINT}/content-category`;
const BLOG_ENDPOINT = POST_ENDPOINT; // Backward compatibility
const PROJECT_ENDPOINT = `${API_BASE_URL}/projects`;
const AUTH_ENDPOINT = `${API_BASE_URL}/auth`;

// Create axios instance with default configuration for .NET Backend
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // .NET specific headers
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  // Request interceptor for adding auth tokens, etc.
  client.interceptors.request.use(
    (config) => {
      // Add auth token if available (only in browser)
      if (typeof window !== "undefined") {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      // Add .NET specific headers
      config.headers["X-Requested-With"] = "XMLHttpRequest";

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      // Handle .NET backend specific errors
      if (error.response?.status === 401) {
        // Handle unauthorized - clear token
        if (typeof window !== "undefined") {
          localStorage.removeItem(TOKEN_KEY);
          // Optionally redirect to login
          window.location.href = "/login";
        }
      }

      if (error.response?.status === 403) {
        // Handle forbidden
        console.error("Access forbidden:", error.config?.url);
      }

      if (error.response?.status === 404) {
        console.error("Resource not found:", error.config?.url);
      }

      if (error.response?.status === 500) {
        console.error("Server error:", error.response?.data);
      }

      // Handle .NET validation errors (400)
      if (error.response?.status === 400) {
        console.error("Validation error:", error.response?.data);
      }

      return Promise.reject(error);
    },
  );

  return client;
};

// API client instance
const apiClient = createApiClient();

// Generic API methods
export const api = {
  // Generic GET request
  get: <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return apiClient.get<T>(url, config);
  },

  // Generic POST request
  post: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return apiClient.post<T>(url, data, config);
  },

  // Generic PUT request
  put: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return apiClient.put<T>(url, data, config);
  },

  // Generic DELETE request
  delete: <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return apiClient.delete<T>(url, config);
  },
};

// Mock API methods (for development/testing)
const mockApi = {
  // Simulate network delay
  delay: (ms: number = 500) =>
    new Promise((resolve) => setTimeout(resolve, ms)),

  // Blog API methods
  blogs: {
    getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Blog>> => {
      await mockApi.delay();
      return createPaginatedResponse(mockBlogs, page, limit, mockBlogs.length);
    },

    getById: async (id: number): Promise<Blog> => {
      await mockApi.delay();
      const blog = mockBlogs.find((b) => b.id === id);
      if (!blog) {
        throw new Error("Blog not found");
      }
      return blog;
    },

    getBySlug: async (slug: string): Promise<Blog> => {
      await mockApi.delay();
      const blog = mockBlogs.find((b) => b.slug === slug);
      if (!blog) {
        throw new Error("Blog not found");
      }
      return blog;
    },

    search: async (
      query: string,
      page = 1,
      limit = 10,
    ): Promise<PaginatedResponse<Blog>> => {
      await mockApi.delay();
      const filteredBlogs = searchData(mockBlogs, query);
      return createPaginatedResponse(
        filteredBlogs,
        page,
        limit,
        filteredBlogs.length,
      );
    },

    getFeatured: async (): Promise<Blog[]> => {
      await mockApi.delay();
      return mockBlogs.filter((blog) => blog.likes > 150).slice(0, 3);
    },
  },

  // Project API methods
  projects: {
    getAll: async (
      page = 1,
      limit = 10,
    ): Promise<PaginatedResponse<Project>> => {
      await mockApi.delay();
      return createPaginatedResponse(
        mockProjects,
        page,
        limit,
        mockProjects.length,
      );
    },

    getById: async (id: number): Promise<Project> => {
      await mockApi.delay();
      const project = mockProjects.find((p) => p.id === id);
      if (!project) {
        throw new Error("Project not found");
      }
      return project;
    },

    search: async (
      query: string,
      page = 1,
      limit = 10,
    ): Promise<PaginatedResponse<Project>> => {
      await mockApi.delay();
      const filteredProjects = searchData(mockProjects, query);
      return createPaginatedResponse(
        filteredProjects,
        page,
        limit,
        filteredProjects.length,
      );
    },

    getFeatured: async (): Promise<Project[]> => {
      await mockApi.delay();
      return mockProjects.filter((project) => project.featured).slice(0, 3);
    },

    getByTechnology: async (
      technology: string,
      page = 1,
      limit = 10,
    ): Promise<PaginatedResponse<Project>> => {
      await mockApi.delay();
      const filteredProjects = mockProjects.filter((project) =>
        project.technologies?.some((tech) =>
          tech.toLowerCase().includes(technology.toLowerCase()),
        ),
      );
      return createPaginatedResponse(
        filteredProjects,
        page,
        limit,
        filteredProjects.length,
      );
    },
  },
};

// Post API methods - .NET Backend (replaces blogApi)
export const postApi = {
  // Get all posts with optional pagination and filtering
  getAll: async (
    page = 1,
    limit = 10,
    contentCategoryId?: number,
    status?: PostStatus,
  ): Promise<PaginatedResponse<Post>> => {
    let url = `${POST_ENDPOINT}?limit=${limit}&page=${page}`;
    if (contentCategoryId !== undefined) {
      url += `&contentCategoryId=${contentCategoryId}`;
    }
    if (status !== undefined) {
      url += `&status=${status}`;
    }

    // Backend returns Result<IEnumerable<PostDto>> structure
    const response = await apiClient.get<ApiResponse<Post[]>>(url);

    // Transform to PaginatedResponse format
    const posts = response.data.data || [];
    return {
      data: posts,
      pagination: {
        page,
        limit,
        total: posts.length, // Backend doesn't return total, use array length
        totalPages: Math.ceil(posts.length / limit) || 1,
      },
    };
  },

  // Get posts by content category (Blog, Project, Article, etc.)
  getByContentCategory: async (
    categoryName: string,
    page = 1,
    limit = 10,
    status?: PostStatus,
  ): Promise<PaginatedResponse<Post>> => {
    try {
      // Try to get the content category ID by name
      const categoryResponse = await apiClient.get<
        ApiResponse<PostContentCategory>
      >(`${POST_CONTENT_CATEGORY_ENDPOINT}/${categoryName}`);
      const categoryId = categoryResponse.data.data.id;
      return postApi.getAll(page, limit, categoryId, status);
    } catch (error) {
      // If content category endpoint doesn't exist or fails, just filter by status
      console.warn(
        `Could not fetch content category '${categoryName}', fetching all posts with status filter`,
      );
      return postApi.getAll(page, limit, undefined, status);
    }
  },

  // Get post by ID
  getById: async (id: number): Promise<ApiResponse<Post>> => {
    const response = await apiClient.get<ApiResponse<Post>>(
      `${POST_ENDPOINT}/${id}`,
    );
    return response.data;
  },

  // Get post by slug
  getBySlug: async (slug: string): Promise<ApiResponse<Post>> => {
    const response = await apiClient.get<ApiResponse<Post>>(
      `${POST_ENDPOINT}/${slug}`,
    );
    return response.data;
  },

  // Search posts
  search: async (
    query: string,
    page = 1,
    limit = 10,
    contentCategoryId?: number,
  ): Promise<PaginatedResponse<Post>> => {
    let url = `${POST_ENDPOINT}/search?q=${encodeURIComponent(query)}&page=${page}&pageSize=${limit}`;
    if (contentCategoryId !== undefined) {
      url += `&contentCategoryId=${contentCategoryId}`;
    }

    // Backend returns Result<IEnumerable<PostDto>> structure
    const response = await apiClient.get<ApiResponse<Post[]>>(url);
    const posts = response.data.data || [];

    return {
      data: posts,
      pagination: {
        page,
        limit,
        total: posts.length,
        totalPages: Math.ceil(posts.length / limit) || 1,
      },
    };
  },

  // Get featured posts
  getFeatured: async (contentCategoryId?: number): Promise<Post[]> => {
    let url = `${POST_ENDPOINT}/featured`;
    if (contentCategoryId !== undefined) {
      url += `?contentCategoryId=${contentCategoryId}`;
    }
    const response = await apiClient.get<Post[]>(url);
    return response.data;
  },

  // Create new post (if authenticated)
  create: async (post: Omit<Post, "id">): Promise<Post> => {
    const response = await apiClient.post<Post>(POST_ENDPOINT, post);
    return response.data;
  },

  // Update post (if authenticated)
  update: async (id: number, post: Partial<Post>): Promise<Post> => {
    const response = await apiClient.put<Post>(`${POST_ENDPOINT}/${id}`, post);
    return response.data;
  },

  // Delete post (if authenticated)
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`${POST_ENDPOINT}/${id}`);
  },

  // Add like to post
  addLike: async (guId: number, likes: number = 1): Promise<void> => {
    // Backend expects { guId: number, likes: number }
    // Note: Backend calls it 'GuId' but it's a long (id), not a Guid.
    await apiClient.patch(`${POST_ENDPOINT}/like`, { guId, likes });
  },
};

// Post Content Category API methods
export const postContentCategoryApi = {
  // Get all content categories
  getAll: async (): Promise<PostContentCategory[]> => {
    const response = await apiClient.get<ApiResponse<PostContentCategory[]>>(
      POST_CONTENT_CATEGORY_ENDPOINT,
    );
    return response.data.data;
  },

  // Get content category by name
  getByName: async (name: string): Promise<PostContentCategory> => {
    const response = await apiClient.get<ApiResponse<PostContentCategory>>(
      `${POST_CONTENT_CATEGORY_ENDPOINT}/${name}`,
    );
    return response.data.data;
  },
};

// Backward compatibility - blogApi is now an alias for postApi with Blog content category filtering
export const blogApi = {
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Blog>> => {
    // For now, just get published posts without content category filter
    // Once PostContentCategory is properly seeded in DB, we can add contentCategoryId filter
    return postApi.getAll(
      page,
      limit,
      undefined,
      PostStatus.Published,
    ) as Promise<PaginatedResponse<Blog>>;
  },

  getById: async (id: number): Promise<ApiResponse<Blog>> => {
    return postApi.getById(id) as Promise<ApiResponse<Blog>>;
  },

  getBySlug: async (slug: string): Promise<ApiResponse<Blog>> => {
    return postApi.getBySlug(slug) as Promise<ApiResponse<Blog>>;
  },

  search: async (
    query: string,
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<Blog>> => {
    return postApi.search(query, page, limit) as Promise<
      PaginatedResponse<Blog>
    >;
  },

  getFeatured: async (): Promise<Blog[]> => {
    return postApi.getFeatured() as Promise<Blog[]>;
  },

  create: async (blog: Omit<Blog, "id">): Promise<Blog> => {
    return postApi.create(blog as Omit<Post, "id">) as Promise<Blog>;
  },

  update: async (id: number, blog: Partial<Blog>): Promise<Blog> => {
    return postApi.update(id, blog as Partial<Post>) as Promise<Blog>;
  },

  delete: async (id: number): Promise<void> => {
    return postApi.delete(id);
  },
};

// Project API methods - Uses Post API with Project content category
export const projectApi = {
  // Get all projects with optional pagination
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Project>> => {
    // Get published posts without content category filter for now
    // Once PostContentCategory is properly seeded, filter by Project category
    return postApi.getAll(page, limit, undefined, PostStatus.Published) as any;
  },

  // Get project by ID
  getById: async (id: number): Promise<Project> => {
    const response = await postApi.getById(id);
    return response.data as any;
  },

  // Get project by slug
  getBySlug: async (slug: string): Promise<ApiResponse<Project>> => {
    return postApi.getBySlug(slug) as Promise<ApiResponse<Project>>;
  },

  // Search projects
  search: async (
    query: string,
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<Project>> => {
    return postApi.search(query, page, limit) as any;
  },

  // Get featured projects
  getFeatured: async (): Promise<Project[]> => {
    return postApi.getFeatured() as any;
  },

  // Get projects by technology (will search tags/categories)
  getByTechnology: async (
    technology: string,
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<Project>> => {
    // Use search to find projects with specific technology
    return postApi.search(technology, page, limit) as any;
  },

  // Create new project (if authenticated)
  create: async (project: Omit<Project, "id">): Promise<Project> => {
    return postApi.create(project as any) as any;
  },

  // Update project (if authenticated)
  update: async (id: number, project: Partial<Project>): Promise<Project> => {
    return postApi.update(id, project as any) as any;
  },

  // Delete project (if authenticated)
  delete: async (id: number): Promise<void> => {
    return postApi.delete(id);
  },
};

// Authentication API methods - .NET Backend
export const authApi = {
  // Login
  login: async (email: string, password: string) => {
    const response = await apiClient.post(`${AUTH_ENDPOINT}/login`, {
      email,
      password,
    });
    return response.data;
  },

  // Register
  register: async (userData: {
    email: string;
    password: string;
    name: string;
  }) => {
    const response = await apiClient.post(
      `${AUTH_ENDPOINT}/register`,
      userData,
    );
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken: string) => {
    const response = await apiClient.post(`${AUTH_ENDPOINT}/refresh`, {
      refreshToken,
    });
    return response.data;
  },

  // Logout
  logout: async () => {
    await apiClient.post(`${AUTH_ENDPOINT}/logout`);
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await apiClient.get(`${AUTH_ENDPOINT}/me`);
    return response.data;
  },
};

// Utility functions for .NET Backend
export const apiUtils = {
  // Handle .NET validation errors
  handleValidationError: (error: any) => {
    if (error.response?.status === 400) {
      const validationErrors = error.response.data?.errors;
      if (validationErrors) {
        return Object.keys(validationErrors).map((key) => ({
          field: key,
          message: validationErrors[key][0],
        }));
      }
    }
    return [];
  },

  // Format .NET API response
  formatResponse: (response: any) => {
    // Handle .NET API response structure
    if (response.data && typeof response.data === "object") {
      return response.data;
    }
    return response;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token;
  },

  // Get auth token
  getAuthToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  // Set auth token
  setAuthToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
  },

  // Clear auth token
  clearAuthToken: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
  },
};

export default apiClient;
