"use client";

import React from "react";
import ArticleStatusCard from "@/components/article/ArticleStatusCard";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const BlogPostError = ({ error, reset }: ErrorProps) => (
  <ArticleStatusCard
    title="Blog"
    message="Something went wrong"
    description="The article you're looking for might not exist or there was an error loading it. Please try again or head somewhere else."
    backHref="/blog"
    backLabel="Back to Blog"
    onRetry={reset}
    devDetails={`Error: ${error.message}${error.digest ? `\nDigest: ${error.digest}` : ""}`}
  />
);

export default BlogPostError;
