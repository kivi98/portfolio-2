"use client";
import React from "react";
import { useSearchBlogs } from "@/lib/queries";
import { ContentCategory } from "@/enum";
import PostListing from "@/components/PostListing";
import BlogCard from "./components/BlogCard";

const Blog = () => (
  <PostListing
    eyebrow="Writing"
    title="Thoughts & tutorials"
    subtitle="Notes on software development, design principles and the ever-evolving digital landscape — from coding best practices to emerging tech trends."
    searchPlaceholder="Search articles…"
    emptyMessage="No articles published yet — check back soon."
    category={ContentCategory.Blog}
    useSearch={useSearchBlogs}
    renderCard={(blog) => <BlogCard blog={blog} />}
  />
);

export default Blog;
