import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Blog, Project, PaginatedResponse, ApiResponse } from "@/types";
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
const BLOG_ENDPOINT = `${API_BASE_URL}/blogs`;
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
      // Add auth token if available
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
        localStorage.removeItem(TOKEN_KEY);
        // Optionally redirect to login
        if (typeof window !== "undefined") {
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

// Blog API methods - .NET Backend
export const blogApi = {
  // Get all blogs with optional pagination
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Blog>> => {
    const response = await apiClient.get<PaginatedResponse<Blog>>(
      `${BLOG_ENDPOINT}?limit=${limit}&page=${page}`,
    );
    return response.data;
  },

  // Get blog by ID
  getById: async (id: number): Promise<ApiResponse<Blog>> => {
    const response = await apiClient.get<ApiResponse<Blog>>(
      `${BLOG_ENDPOINT}/${id}`,
    );
    return response.data;
  },

  // Get blog by slug
  getBySlug: async (slug: string): Promise<ApiResponse<Blog>> => {
    const response = await apiClient.get<ApiResponse<Blog>>(
      `${BLOG_ENDPOINT}/${slug}`,
    );
    return response.data;
  },

  // Search blogs
  search: async (
    query: string,
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<Blog>> => {
    const response = await apiClient.get<PaginatedResponse<Blog>>(
      `${BLOG_ENDPOINT}/search?q=${encodeURIComponent(query)}&page=${page}&pageSize=${limit}`,
    );
    return response.data;
  },

  // Get featured blogs
  getFeatured: async (): Promise<Blog[]> => {
    const response = await apiClient.get<Blog[]>(`${BLOG_ENDPOINT}/featured`);
    return response.data;
  },

  // Create new blog (if authenticated)
  create: async (blog: Omit<Blog, "id">): Promise<Blog> => {
    const response = await apiClient.post<Blog>(BLOG_ENDPOINT, blog);
    return response.data;
  },

  // Update blog (if authenticated)
  update: async (id: number, blog: Partial<Blog>): Promise<Blog> => {
    const response = await apiClient.put<Blog>(`${BLOG_ENDPOINT}/${id}`, blog);
    return response.data;
  },

  // Delete blog (if authenticated)
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`${BLOG_ENDPOINT}/${id}`);
  },
};

// Project API methods - .NET Backend
export const projectApi = {
  // Get all projects with optional pagination
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Project>> => {
    const response = await apiClient.get<PaginatedResponse<Project>>(
      `${PROJECT_ENDPOINT}?page=${page}&pageSize=${limit}`,
    );
    return response.data;
  },

  // Get project by ID
  getById: async (id: number): Promise<Project> => {
    const response = await apiClient.get<Project>(`${PROJECT_ENDPOINT}/${id}`);
    return response.data;
  },

  // Search projects
  search: async (
    query: string,
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<Project>> => {
    const response = await apiClient.get<PaginatedResponse<Project>>(
      `${PROJECT_ENDPOINT}/search?q=${encodeURIComponent(query)}&page=${page}&pageSize=${limit}`,
    );
    return response.data;
  },

  // Get featured projects
  getFeatured: async (): Promise<Project[]> => {
    const response = await apiClient.get<Project[]>(
      `${PROJECT_ENDPOINT}/featured`,
    );
    return response.data;
  },

  // Get projects by technology
  getByTechnology: async (
    technology: string,
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<Project>> => {
    const response = await apiClient.get<PaginatedResponse<Project>>(
      `${PROJECT_ENDPOINT}/technology/${encodeURIComponent(technology)}?page=${page}&pageSize=${limit}`,
    );
    return response.data;
  },

  // Create new project (if authenticated)
  create: async (project: Omit<Project, "id">): Promise<Project> => {
    const response = await apiClient.post<Project>(PROJECT_ENDPOINT, project);
    return response.data;
  },

  // Update project (if authenticated)
  update: async (id: number, project: Partial<Project>): Promise<Project> => {
    const response = await apiClient.put<Project>(
      `${PROJECT_ENDPOINT}/${id}`,
      project,
    );
    return response.data;
  },

  // Delete project (if authenticated)
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`${PROJECT_ENDPOINT}/${id}`);
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
