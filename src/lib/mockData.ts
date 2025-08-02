import { Blog, Project, PaginatedResponse } from "@/types";

export const mockBlogs: Blog[] = [
  {
    id: 1,
    title: "Getting Started with Next.js 15",
    author: "Kivi Amarakoon",
    date: "2024-01-15",
    content: `# Getting Started with Next.js 15

Next.js 15 brings exciting new features including the new App Router, improved performance, and better developer experience. In this comprehensive guide, we'll explore the key changes and how to migrate your existing applications.

## What's New in Next.js 15?

### 1. Enhanced App Router
The App Router has been significantly improved with better performance and developer experience:

\`\`\`typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
\`\`\`

### 2. Improved Performance
- **Faster Build Times**: Up to 40% faster builds
- **Better Caching**: Enhanced static generation
- **Optimized Bundles**: Smaller client-side bundles

### 3. Developer Experience
- **Better Error Messages**: More descriptive error handling
- **Enhanced Debugging**: Improved development tools
- **TypeScript Support**: Better type inference

## Migration Guide

### Step 1: Update Dependencies
\`\`\`bash
npm install next@15 react@19 react-dom@19
\`\`\`

### Step 2: Update Configuration
\`\`\`typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
}

export default nextConfig
\`\`\`

## Key Features

| Feature | Description | Status |
|---------|-------------|--------|
| App Router | File-based routing | ✅ Stable |
| Server Components | React Server Components | ✅ Stable |
| Streaming | Progressive rendering | ✅ Stable |
| Turbopack | Fast bundler | 🔄 Beta |

## Best Practices

1. **Use Server Components by Default**
   - Only use client components when necessary
   - Leverage server-side rendering for better performance

2. **Optimize Images**
   - Use the Next.js Image component
   - Implement proper sizing and formats

3. **Implement Caching**
   - Use React Cache for data fetching
   - Leverage Next.js built-in caching

## Conclusion

Next.js 15 represents a significant step forward in the React framework ecosystem. With improved performance, better developer experience, and enhanced features, it's the perfect time to upgrade your applications.

For more information, check out the [official Next.js documentation](https://nextjs.org/docs).`,
    image: "https://picsum.photos/400/250?1",
    tags: ["nextjs", "react", "web-development"],
    likes: 156,
    slug: "getting-started-with-nextjs-15",
    excerpt:
      "A comprehensive guide to Next.js 15 features and migration strategies.",
  },
  {
    id: 2,
    title: "Building Scalable APIs with Node.js",
    author: "Kivi Amarakoon",
    date: "2024-01-10",
    content: `# Building Scalable APIs with Node.js

Learn how to build robust and scalable APIs using Node.js, Express, and modern JavaScript practices. We'll cover authentication, validation, error handling, and deployment strategies.

## Project Structure

\`\`\`
src/
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   └── postController.js
├── middleware/
│   ├── auth.js
│   ├── validation.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   └── Post.js
├── routes/
│   ├── auth.js
│   ├── users.js
│   └── posts.js
└── app.js
\`\`\`

## Setting Up Express

\`\`\`javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Authentication with JWT

\`\`\`javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
\`\`\`

## Validation Middleware

\`\`\`javascript
const { body, validationResult } = require('express-validator');

const validateUser = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().isLength({ min: 2 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
\`\`\`

## Error Handling

\`\`\`javascript
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid ID format'
    });
  }
  
  res.status(500).json({
    message: 'Internal Server Error'
  });
};
\`\`\`

## Deployment Best Practices

### 1. Environment Variables
\`\`\`bash
# .env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=your-secret-key
\`\`\`

### 2. PM2 Configuration
\`\`\`javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'api-server',
    script: './src/app.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
\`\`\`

### 3. Docker Setup
\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

## Performance Optimization

- **Caching**: Use Redis for session storage
- **Compression**: Enable gzip compression
- **Database**: Use connection pooling
- **Monitoring**: Implement health checks

## Security Considerations

1. **Input Validation**: Always validate user input
2. **Rate Limiting**: Prevent abuse
3. **CORS**: Configure properly for production
4. **HTTPS**: Use SSL/TLS in production
5. **Secrets**: Never commit sensitive data

## Conclusion

Building scalable APIs requires careful attention to architecture, security, and performance. By following these best practices, you can create robust and maintainable APIs that scale with your application's needs.`,
    image: "https://picsum.photos/400/250?2",
    tags: ["nodejs", "api", "backend"],
    likes: 203,
    slug: "building-scalable-apis-with-nodejs",
    excerpt:
      "Complete guide to building production-ready APIs with Node.js and Express.",
  },
  {
    id: 3,
    title: "Mastering TypeScript for React Development",
    author: "Kivi Amarakoon",
    date: "2024-01-05",
    content:
      "TypeScript has become essential for modern React development. This guide covers advanced TypeScript patterns, type safety, and best practices for building maintainable React applications.",
    image: "https://picsum.photos/400/250?3",
    tags: ["typescript", "react", "frontend"],
    likes: 189,
    slug: "mastering-typescript-for-react",
    excerpt:
      "Advanced TypeScript patterns and best practices for React developers.",
  },
  {
    id: 4,
    title: "Cloud-Native Development with Docker",
    author: "Kivi Amarakoon",
    date: "2023-12-28",
    content:
      "Docker has revolutionized how we deploy and manage applications. Learn containerization best practices, multi-stage builds, and orchestration strategies for modern applications.",
    image: "https://picsum.photos/400/250?4",
    tags: ["docker", "devops", "cloud"],
    likes: 142,
    slug: "cloud-native-development-with-docker",
    excerpt:
      "Containerization strategies and Docker best practices for modern applications.",
  },
  {
    id: 5,
    title: "State Management with TanStack Query",
    author: "Kivi Amarakoon",
    date: "2023-12-20",
    content:
      "TanStack Query (formerly React Query) provides powerful tools for managing server state in React applications. Learn caching strategies, optimistic updates, and real-time synchronization.",
    image: "https://picsum.photos/400/250?5",
    tags: ["react", "tanstack-query", "state-management"],
    likes: 178,
    slug: "state-management-with-tanstack-query",
    excerpt:
      "Comprehensive guide to server state management with TanStack Query.",
  },
  {
    id: 6,
    title: "Building Microservices with Spring Boot",
    author: "Kivi Amarakoon",
    date: "2023-12-15",
    content:
      "Spring Boot makes it easy to create stand-alone, production-grade applications. Learn how to build microservices, implement security, and deploy to cloud platforms.",
    image: "https://picsum.photos/400/250?6",
    tags: ["spring-boot", "java", "microservices"],
    likes: 165,
    slug: "building-microservices-with-spring-boot",
    excerpt:
      "Complete microservices architecture with Spring Boot and cloud deployment.",
  },
];

export const mockProjects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform built with Next.js, TypeScript, and Stripe integration. Features include user authentication, product management, shopping cart, and payment processing.",
    image: "https://picsum.photos/400/250?7",
    link: "https://github.com/example/ecommerce-platform",
    contributors: ["Kivi Amarakoon", "John Doe"],
    likes: 234,
    technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    githubUrl: "https://github.com/example/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.com",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built with React and Firebase.",
    image: "https://picsum.photos/400/250?8",
    link: "https://github.com/example/task-manager",
    contributors: ["Kivi Amarakoon"],
    likes: 189,
    technologies: ["React", "Firebase", "Material-UI", "TypeScript"],
    githubUrl: "https://github.com/example/task-manager",
    liveUrl: "https://task-manager-demo.com",
    featured: true,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "A weather dashboard that displays current weather conditions and forecasts for multiple cities. Integrates with OpenWeatherMap API and features interactive charts.",
    image: "https://picsum.photos/400/250?9",
    link: "https://github.com/example/weather-dashboard",
    contributors: ["Kivi Amarakoon", "Jane Smith"],
    likes: 156,
    technologies: ["Vue.js", "Chart.js", "OpenWeatherMap API", "Vuetify"],
    githubUrl: "https://github.com/example/weather-dashboard",
    liveUrl: "https://weather-demo.com",
  },
  {
    id: 4,
    title: "Blog CMS",
    description:
      "A content management system for blogs with markdown support, image uploads, and SEO optimization. Built with Node.js and MongoDB.",
    image: "https://picsum.photos/400/250?10",
    link: "https://github.com/example/blog-cms",
    contributors: ["Kivi Amarakoon"],
    likes: 142,
    technologies: ["Node.js", "MongoDB", "Express", "React"],
    githubUrl: "https://github.com/example/blog-cms",
    liveUrl: "https://blog-cms-demo.com",
  },
  {
    id: 5,
    title: "Portfolio Website",
    description:
      "A modern portfolio website built with Next.js and Material-UI. Features dark/light theme, responsive design, and smooth animations.",
    image: "https://picsum.photos/400/250?11",
    link: "https://github.com/example/portfolio",
    contributors: ["Kivi Amarakoon"],
    likes: 203,
    technologies: ["Next.js", "Material-UI", "TypeScript", "Framer Motion"],
    githubUrl: "https://github.com/example/portfolio",
    liveUrl: "https://portfolio-demo.com",
    featured: true,
  },
  {
    id: 6,
    title: "API Gateway",
    description:
      "A microservices API gateway built with Spring Cloud Gateway. Handles routing, authentication, rate limiting, and request/response transformation.",
    image: "https://picsum.photos/400/250?12",
    link: "https://github.com/example/api-gateway",
    contributors: ["Kivi Amarakoon", "Mike Johnson"],
    likes: 178,
    technologies: ["Spring Boot", "Spring Cloud", "Java", "Docker"],
    githubUrl: "https://github.com/example/api-gateway",
    liveUrl: "https://api-gateway-demo.com",
  },
];

// Helper function to create paginated response
export const createPaginatedResponse = <T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): PaginatedResponse<T> => {
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

// Helper function to search data
export const searchData = <
  T extends { title: string; description?: string; content?: string },
>(
  data: T[],
  query: string
): T[] => {
  const searchTerm = query.toLowerCase();
  return data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm) ||
      (item.description &&
        item.description.toLowerCase().includes(searchTerm)) ||
      (item.content && item.content.toLowerCase().includes(searchTerm))
  );
};
