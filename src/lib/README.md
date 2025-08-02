# API Implementation Guide

This document outlines the API implementation for the portfolio application using **TanStack Query** and **Axios**.

## Architecture Overview

### Technology Stack

- **TanStack Query (React Query)**: For server state management, caching, and synchronization
- **Axios**: For HTTP requests with interceptors and error handling
- **TypeScript**: For type safety and better developer experience

### Why TanStack Query over RTK Query?

1. **Lighter Bundle Size**: TanStack Query is more lightweight
2. **Framework Agnostic**: Works with any backend (REST, GraphQL, etc.)
3. **Better Next.js Integration**: Excellent with App Router
4. **Simpler Setup**: Less boilerplate compared to RTK Query
5. **Built-in Caching**: Automatic caching, background refetching, and optimistic updates

## File Structure

```
src/lib/
├── apiClient.ts      # Axios client and API methods
├── queries.ts        # TanStack Query hooks
├── mockData.ts       # Mock data for development
└── README.md         # This documentation
```

## API Client (`apiClient.ts`)

### Features

- **Axios Instance**: Configured with base URL, timeout, and headers
- **Request Interceptors**: Automatic auth token injection
- **Response Interceptors**: Error handling and token cleanup
- **Mock API**: For development and testing
- **Type Safety**: Full TypeScript support

### Usage

```typescript
import { blogApi, projectApi } from "@/lib/apiClient";

// Get all blogs with pagination
const blogs = await blogApi.getAll(1, 10);

// Search blogs
const searchResults = await blogApi.search("nextjs", 1, 10);

// Get featured projects
const featuredProjects = await projectApi.getFeatured();
```

## Query Hooks (`queries.ts`)

### Available Hooks

#### Blog Hooks

- `useBlogs(page, limit)` - Get paginated blogs
- `useBlog(id)` - Get single blog by ID
- `useBlogBySlug(slug)` - Get blog by slug
- `useSearchBlogs(query, page, limit)` - Search blogs
- `useFeaturedBlogs()` - Get featured blogs

#### Project Hooks

- `useProjects(page, limit)` - Get paginated projects
- `useProject(id)` - Get single project by ID
- `useSearchProjects(query, page, limit)` - Search projects
- `useProjectsByTechnology(technology, page, limit)` - Filter by technology
- `useFeaturedProjects()` - Get featured projects

### Usage in Components

```typescript
import { useBlogs, useSearchBlogs } from '@/lib/queries';

const BlogPage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Use search query if searching, otherwise use regular query
  const searchQuery = useSearchBlogs(search, page, 6);
  const blogsQuery = useBlogs(page, 6);
  const query = search.trim() ? searchQuery : blogsQuery;

  const { data, isLoading, isError, error } = query;

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage error={error} />;

  return <BlogList blogs={data?.data || []} />;
};
```

## Caching Strategy

### Query Keys

Organized query keys for consistent caching:

```typescript
export const queryKeys = {
  blogs: {
    all: ["blogs"],
    lists: () => [...queryKeys.blogs.all, "list"],
    list: (filters) => [...queryKeys.blogs.lists(), filters],
    details: () => [...queryKeys.blogs.all, "detail"],
    detail: (id) => [...queryKeys.blogs.details(), id],
    featured: () => [...queryKeys.blogs.all, "featured"],
  },
  // ... similar for projects
};
```

### Cache Configuration

- **Stale Time**: 5-15 minutes (depending on data type)
- **Garbage Collection**: 10-30 minutes
- **Retry Logic**: 3 attempts for 5xx errors, no retry for 4xx errors

## Error Handling

### Global Error Handling

- **401 Unauthorized**: Automatic token cleanup
- **404 Not Found**: Logged for debugging
- **Network Errors**: Retry with exponential backoff

### Component-Level Error Handling

```typescript
const { data, isLoading, isError, error } = useBlogs();

if (isError) {
  return (
    <Alert severity="error">
      Failed to load blogs: {error?.message || 'Unknown error'}
    </Alert>
  );
}
```

## Mock Data (`mockData.ts`)

### Features

- **Realistic Data**: 6 blogs and 6 projects with varied content
- **Search Functionality**: Full-text search across titles and content
- **Pagination Support**: Helper functions for paginated responses
- **Type Safety**: Fully typed mock data

### Usage

```typescript
import {
  mockBlogs,
  mockProjects,
  createPaginatedResponse,
} from "@/lib/mockData";

// Create paginated response
const paginatedBlogs = createPaginatedResponse(
  mockBlogs,
  1,
  10,
  mockBlogs.length
);
```

## Migration to Real Backend

### Step 1: Update API Base URL

```typescript
// In apiClient.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://your-api.com/api";
```

### Step 2: Replace Mock API Calls

```typescript
// Replace mockApi calls with real API calls
export const blogApi = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get<PaginatedResponse<Blog>>(
      `/blogs?page=${page}&limit=${limit}`
    );
    return response.data;
  },
  // ... other methods
};
```

### Step 3: Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=https://your-api.com/api
```

## Best Practices

### 1. Query Organization

- Use consistent query keys
- Group related queries together
- Implement proper error boundaries

### 2. Performance Optimization

- Use `staleTime` to reduce unnecessary refetches
- Implement proper `gcTime` for memory management
- Use `enabled` option for conditional queries

### 3. User Experience

- Show loading states
- Handle errors gracefully
- Implement optimistic updates for mutations

### 4. Type Safety

- Define comprehensive interfaces
- Use generic types for reusable components
- Validate API responses

## Development Tools

### React Query Devtools

Enabled in development mode for debugging:

- Query cache inspection
- Network request monitoring
- Cache invalidation testing

### Environment Configuration

```typescript
// In layout.tsx
<ReactQueryDevtools initialIsOpen={false} />
```

## Future Enhancements

### 1. Real-time Updates

```typescript
// WebSocket integration
const useRealtimeBlogs = () => {
  return useQuery({
    queryKey: queryKeys.blogs.all,
    queryFn: blogApi.getAll,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};
```

### 2. Optimistic Updates

```typescript
const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogApi.create,
    onMutate: async (newBlog) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.blogs.lists() });

      // Snapshot previous value
      const previousBlogs = queryClient.getQueryData(queryKeys.blogs.lists());

      // Optimistically update
      queryClient.setQueryData(queryKeys.blogs.lists(), (old) => ({
        ...old,
        data: [...old.data, newBlog],
      }));

      return { previousBlogs };
    },
    onError: (err, newBlog, context) => {
      // Rollback on error
      queryClient.setQueryData(queryKeys.blogs.lists(), context.previousBlogs);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs.lists() });
    },
  });
};
```

### 3. Infinite Queries

```typescript
const useInfiniteBlogs = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.blogs.lists(),
    queryFn: ({ pageParam = 1 }) => blogApi.getAll(pageParam, 10),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.page < lastPage.pagination.totalPages
        ? lastPage.pagination.page + 1
        : undefined,
  });
};
```

This implementation provides a robust, scalable, and maintainable solution for API management in your Next.js portfolio application.
