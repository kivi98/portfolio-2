"use client";
import React from "react";
import { useSearchProjects } from "@/lib/queries";
import { ContentCategory } from "@/enum";
import PostListing from "@/components/PostListing";
import ProjectCard from "./components/ProjectCard";

const Projects = () => (
  <PostListing
    eyebrow="Selected work"
    title="Things I've built"
    subtitle="A collection of projects spanning web applications, APIs and cloud solutions — each one a unique challenge and a creative solution."
    searchPlaceholder="Search projects…"
    emptyMessage="No projects published yet — check back soon."
    category={ContentCategory.Project}
    useSearch={useSearchProjects}
    renderCard={(project) => <ProjectCard project={project} />}
  />
);

export default Projects;
