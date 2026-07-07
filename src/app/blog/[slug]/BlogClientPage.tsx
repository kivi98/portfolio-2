"use client";

import React, { useEffect, useState } from "react";
import { useBlogBySlug } from "@/lib/queries";
import ArticleLayout from "@/components/article/ArticleLayout";
import ArticleSkeleton from "@/components/article/ArticleSkeleton";
import ArticleStatusCard from "@/components/article/ArticleStatusCard";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const BlogPostClientPage = ({ params }: BlogPostPageProps) => {
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    getSlug();
  }, [params]);

  const { data: blog, isLoading, isError, error, refetch } = useBlogBySlug(slug);
  const blogData = blog?.data;

  if (!slug || isLoading) {
    return <ArticleSkeleton />;
  }

  if (isError || !blogData) {
    return (
      <ArticleStatusCard
        title="Blog"
        message="Article not found"
        description={
          error?.message ||
          "The article you're looking for might not exist or there was an error loading it."
        }
        backHref="/blog"
        backLabel="Back to Blog"
        onRetry={isError ? () => refetch() : undefined}
      />
    );
  }

  const owner = blogData.owner || (blogData as any).blogOwner;
  const authorName = owner
    ? `${owner.firstName || ""} ${owner.lastName || ""}`.trim()
    : "Kivi Amarakoon";

  return (
    <ArticleLayout
      post={blogData}
      backHref="/blog"
      backLabel="Back to Blog"
      breadcrumbLabel="Blog"
      authorName={authorName}
      authorRole="Author"
      infoTitle="Article Info"
    />
  );
};

export default BlogPostClientPage;
