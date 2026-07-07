"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  Avatar,
  useTheme,
} from "@mui/material";
import { Launch, GitHub } from "@mui/icons-material";
import { usePostBySlug } from "@/lib/queries";
import ArticleLayout from "@/components/article/ArticleLayout";
import ArticleSkeleton from "@/components/article/ArticleSkeleton";
import ArticleStatusCard from "@/components/article/ArticleStatusCard";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ProjectClientPage = ({ params }: ProjectPageProps) => {
  const theme = useTheme();
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    getSlug();
  }, [params]);

  const {
    data: project,
    isLoading,
    isError,
    error,
    refetch,
  } = usePostBySlug(slug);
  const projectData = project?.data;

  if (!slug || isLoading) {
    return <ArticleSkeleton />;
  }

  if (isError || !projectData) {
    return (
      <ArticleStatusCard
        title="Projects"
        message="Project not found"
        description={
          error?.message ||
          "The project you're looking for might not exist or there was an error loading it."
        }
        backHref="/projects"
        backLabel="Back to Projects"
        onRetry={isError ? () => refetch() : undefined}
      />
    );
  }

  const technologies: string[] = projectData.technologies
    ? typeof projectData.technologies === "string"
      ? projectData.technologies.split(",").map((t: string) => t.trim())
      : projectData.technologies
    : [];
  const contributors: any[] = projectData.contributors || [];
  const githubUrl = projectData.githubUrl;
  const liveUrl = projectData.liveUrl || (projectData as any).link;

  const owner = projectData.owner || (projectData as any).blogOwner;
  const authorName = owner
    ? `${owner.firstName || ""} ${owner.lastName || ""}`.trim()
    : "Kivi Amarakoon";
  const authorRole = contributors.length > 1 ? "Lead Developer" : "Developer";

  const actionButtons = (
    <>
      {liveUrl && (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Launch />}
          component="a"
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            borderRadius: "50px",
            px: 3,
            py: 1,
            fontWeight: 700,
            textTransform: "none",
          }}
        >
          Live Demo
        </Button>
      )}
      {githubUrl && (
        <Button
          startIcon={<GitHub />}
          component="a"
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            borderRadius: "50px",
            px: 3,
            py: 1,
            fontWeight: 700,
            textTransform: "none",
            color: "text.primary",
            border: `1px solid ${theme.palette.divider}`,
            "&:hover": {
              borderColor: "text.secondary",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(0,0,0,0.03)",
            },
          }}
        >
          Source Code
        </Button>
      )}
    </>
  );

  const sidebarExtras = (
    <>
      {(liveUrl || githubUrl) && (
        <>
          <Stack spacing={1.5}>{actionButtons}</Stack>
          <Divider />
        </>
      )}

      {technologies.length > 0 && (
        <>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Technologies
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {technologies.map((tech, index) => (
                <Chip
                  key={tech || index}
                  label={tech}
                  size="small"
                  sx={{
                    background:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(0,0,0,0.04)",
                    border: `1px solid ${theme.palette.divider}`,
                    color: "text.secondary",
                    fontWeight: 500,
                    fontSize: "0.75rem",
                  }}
                />
              ))}
            </Box>
          </Box>
          <Divider />
        </>
      )}

      {contributors.length > 0 && (
        <>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Contributors
            </Typography>
            <Stack spacing={1}>
              {contributors.map((contributor, index) => {
                const name =
                  typeof contributor === "string"
                    ? contributor
                    : `${contributor.firstName || ""} ${contributor.lastName || ""}`.trim();
                return (
                  <Stack
                    key={index}
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                  >
                    <Avatar
                      sx={{
                        width: 28,
                        height: 28,
                        fontSize: "0.75rem",
                        bgcolor: "secondary.main",
                      }}
                    >
                      {name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="body2" color="text.primary">
                      {name}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
          <Divider />
        </>
      )}
    </>
  );

  return (
    <ArticleLayout
      post={projectData}
      backHref="/projects"
      backLabel="Back to Projects"
      breadcrumbLabel="Projects"
      authorName={authorName}
      authorRole={authorRole}
      infoTitle="Project Info"
      subtitle={projectData.description}
      headerActions={
        liveUrl || githubUrl ? (
          <Box
            sx={{
              display: { xs: "flex", lg: "none" },
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "center",
            }}
          >
            {actionButtons}
          </Box>
        ) : undefined
      }
      sidebarExtras={sidebarExtras}
    />
  );
};

export default ProjectClientPage;
