import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Blog, Project, ApiResponse, PaginatedResponse } from "@/types";
import {
  mockBlogs,
  mockProjects,
  createPaginatedResponse,
  searchData,
} from "./mockData";

// API Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
const API_TIMEOUT = 10000; // 10 seconds

// Create axios instance with default configuration
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor for adding auth tokens, etc.
  client.interceptors.request.use(
    (config) => {
      // Add auth token if available
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      // Handle common errors
      if (error.response?.status === 401) {
        // Handle unauthorized
        localStorage.removeItem("authToken");
      }

      if (error.response?.status === 404) {
        console.error("Resource not found:", error.config?.url);
      }

      return Promise.reject(error);
    }
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
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.get<T>(url, config);
  },

  // Generic POST request
  post: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.post<T>(url, data, config);
  },

  // Generic PUT request
  put: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.put<T>(url, data, config);
  },

  // Generic DELETE request
  delete: <T>(
    url: string,
    config?: AxiosRequestConfig
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
      limit = 10
    ): Promise<PaginatedResponse<Blog>> => {
      await mockApi.delay();
      const filteredBlogs = searchData(mockBlogs, query);
      return createPaginatedResponse(
        filteredBlogs,
        page,
        limit,
        filteredBlogs.length
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
      limit = 10
    ): Promise<PaginatedResponse<Project>> => {
      await mockApi.delay();
      return createPaginatedResponse(
        mockProjects,
        page,
        limit,
        mockProjects.length
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
      limit = 10
    ): Promise<PaginatedResponse<Project>> => {
      await mockApi.delay();
      const filteredProjects = searchData(mockProjects, query);
      return createPaginatedResponse(
        filteredProjects,
        page,
        limit,
        filteredProjects.length
      );
    },

    getFeatured: async (): Promise<Project[]> => {
      await mockApi.delay();
      return mockProjects.filter((project) => project.featured).slice(0, 3);
    },

    getByTechnology: async (
      technology: string,
      page = 1,
      limit = 10
    ): Promise<PaginatedResponse<Project>> => {
      await mockApi.delay();
      const filteredProjects = mockProjects.filter((project) =>
        project.technologies?.some((tech) =>
          tech.toLowerCase().includes(technology.toLowerCase())
        )
      );
      return createPaginatedResponse(
        filteredProjects,
        page,
        limit,
        filteredProjects.length
      );
    },
  },
};

// Blog API methods
export const blogApi = {
  // Get all blogs with optional pagination
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Blog>> => {
    // Use mock API for now, can be replaced with real API calls
    return mockApi.blogs.getAll(page, limit);
  },

  // Get blog by ID
  getById: async (id: number): Promise<Blog> => {
    return mockApi.blogs.getById(id);
  },

  // Get blog by slug
  getBySlug: async (slug: string): Promise<Blog> => {
    return mockApi.blogs.getBySlug(slug);
  },

  // Search blogs
  search: async (
    query: string,
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<Blog>> => {
    return mockApi.blogs.search(query, page, limit);
  },

  // Get featured blogs
  getFeatured: async (): Promise<Blog[]> => {
    return mockApi.blogs.getFeatured();
  },
};

// Project API methods
export const projectApi = {
  // Get all projects with optional pagination
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Project>> => {
    return mockApi.projects.getAll(page, limit);
  },

  // Get project by ID
  getById: async (id: number): Promise<Project> => {
    return mockApi.projects.getById(id);
  },

  // Search projects
  search: async (
    query: string,
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<Project>> => {
    return mockApi.projects.search(query, page, limit);
  },

  // Get featured projects
  getFeatured: async (): Promise<Project[]> => {
    return mockApi.projects.getFeatured();
  },

  // Get projects by technology
  getByTechnology: async (
    technology: string,
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<Project>> => {
    return mockApi.projects.getByTechnology(technology, page, limit);
  },
};

export default apiClient;
