# .NET Backend Integration Setup Guide

This guide explains how to configure your Next.js portfolio application to work with a .NET backend API.

## 📁 Environment Files Setup

### 1. `.env.local` (Development)

```bash
# .NET Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_API_TIMEOUT=10000

# Environment
NODE_ENV=development

# .NET Backend Authentication
NEXT_PUBLIC_AUTH_ENDPOINT=http://localhost:5000/api/auth
NEXT_PUBLIC_TOKEN_KEY=authToken

# .NET Backend CORS
NEXT_PUBLIC_CORS_ORIGIN=http://localhost:3000

# Optional: Specific endpoints
NEXT_PUBLIC_BLOG_ENDPOINT=http://localhost:5000/api/blogs
NEXT_PUBLIC_PROJECT_ENDPOINT=http://localhost:5000/api/projects
```

### 2. `.env.production` (Production)

```bash
# .NET Backend API Configuration
NEXT_PUBLIC_API_URL=https://your-dotnet-api.com/api
NEXT_PUBLIC_API_TIMEOUT=10000

# Environment
NODE_ENV=production

# .NET Backend Authentication
NEXT_PUBLIC_AUTH_ENDPOINT=https://your-dotnet-api.com/api/auth
NEXT_PUBLIC_TOKEN_KEY=authToken

# .NET Backend CORS
NEXT_PUBLIC_CORS_ORIGIN=https://your-domain.com

# Optional: Specific endpoints
NEXT_PUBLIC_BLOG_ENDPOINT=https://your-dotnet-api.com/api/blogs
NEXT_PUBLIC_PROJECT_ENDPOINT=https://your-dotnet-api.com/api/projects
```

## 🔧 .NET Backend Configuration

### CORS Setup in .NET

```csharp
// Program.cs or Startup.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJS", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Development
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

app.UseCors("AllowNextJS");
```

### JWT Authentication Setup

```csharp
// Program.cs
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });
```

## 📡 API Endpoints Structure

### Expected .NET API Endpoints

#### Blogs

- `GET /api/blogs` - Get all blogs with pagination
- `GET /api/blogs/{id}` - Get blog by ID
- `GET /api/blogs/{slug}` - Get blog by slug
- `GET /api/blogs/search?q={query}&page={page}&pageSize={limit}` - Search blogs
- `GET /api/blogs/featured` - Get featured blogs
- `POST /api/blogs` - Create new blog (authenticated)
- `PUT /api/blogs/{id}` - Update blog (authenticated)
- `DELETE /api/blogs/{id}` - Delete blog (authenticated)

#### Projects

- `GET /api/projects` - Get all projects with pagination
- `GET /api/projects/{id}` - Get project by ID
- `GET /api/projects/search?q={query}&page={page}&pageSize={limit}` - Search projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/technology/{technology}?page={page}&pageSize={limit}` - Get by technology
- `POST /api/projects` - Create new project (authenticated)
- `PUT /api/projects/{id}` - Update project (authenticated)
- `DELETE /api/projects/{id}` - Delete project (authenticated)

#### Authentication

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

## 🔄 Migration from Mock to .NET API

### Step 1: Update API Client

The API client is now consolidated in `src/lib/apiClient.ts` with all .NET backend functionality:

```typescript
// Import from the consolidated API client
import { blogApi, projectApi, authApi, apiUtils } from "@/lib/apiClient";
```

### Step 2: Update Query Hooks

```typescript
// src/lib/queries.ts
import { blogApi, projectApi } from "./apiClient";

export const useBlogs = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["blogs", page, limit],
    queryFn: () => blogApi.getAll(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

### Step 3: Handle Authentication

```typescript
import { authApi, apiUtils } from "@/lib/apiClient";

// Login function
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await authApi.login(email, password);
    apiUtils.setAuthToken(response.token);
    // Redirect or update UI
  } catch (error) {
    const validationErrors = apiUtils.handleValidationError(error);
    // Handle errors
  }
};
```

## 🛠️ Development Workflow

### 1. Start .NET Backend

```bash
# In your .NET project directory
dotnet run
# Backend will run on http://localhost:5000
```

### 2. Start Next.js Frontend

```bash
# In your Next.js project directory
npm run dev
# Frontend will run on http://localhost:3000
```

### 3. Test API Connection

```typescript
// Test API connection
import { blogApi } from "@/lib/apiClient";

const testConnection = async () => {
  try {
    const blogs = await blogApi.getAll(1, 5);
    console.log("API connection successful:", blogs);
  } catch (error) {
    console.error("API connection failed:", error);
  }
};
```

## 🔒 Security Considerations

### 1. Environment Variables

- Never commit `.env.local` to git
- Use different values for development and production
- Use strong JWT secrets in production

### 2. CORS Configuration

- Configure CORS properly in .NET backend
- Only allow necessary origins
- Handle preflight requests

### 3. Authentication

- Use HTTPS in production
- Implement proper token refresh
- Handle token expiration gracefully

## 🚀 Deployment

### 1. Frontend Deployment (Vercel/Netlify)

Set environment variables in your hosting platform:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_AUTH_ENDPOINT`
- `NEXT_PUBLIC_TOKEN_KEY`

### 2. Backend Deployment (Azure/AWS)

Configure your .NET backend with:

- Database connection strings
- JWT secrets
- CORS origins
- SSL certificates

## 📝 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CORS configuration in .NET backend
   - Verify origins match your frontend URL

2. **Authentication Issues**
   - Check JWT configuration
   - Verify token storage and retrieval
   - Check token expiration

3. **API Connection Issues**
   - Verify API URL in environment variables
   - Check .NET backend is running
   - Check network connectivity

4. **Environment Variables Not Loading**
   - Restart development server after adding .env files
   - Check variable naming (NEXT_PUBLIC_ prefix for client-side)
   - Verify file location (project root)

## 📚 Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [.NET CORS Configuration](https://docs.microsoft.com/en-us/aspnet/core/security/cors)
- [JWT Authentication in .NET](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/jwt-authn)
- [Axios Interceptors](https://axios-http.com/docs/interceptors)
