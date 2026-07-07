"use client";

import React from "react";
import ArticleStatusCard from "@/components/article/ArticleStatusCard";

const BlogPostNotFound = () => (
  <ArticleStatusCard
    title="404"
    message="Article not found"
    description="The article you're looking for doesn't exist or may have been moved."
    backHref="/blog"
    backLabel="Back to Blog"
  />
);

export default BlogPostNotFound;
