"use client";
import React from "react";
import {
  Box,
  Button,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { usePosts } from "@/lib/queries";
import { ContentCategory, PostStatus } from "@/enum";
import ProjectCard from "@/app/projects/components/ProjectCard";
import SectionHeading from "./SectionHeading";
import Reveal from "@/components/Reveal";

const FeaturedProjects = () => {
  const { data, isLoading, isError } = usePosts(
    1,
    3,
    ContentCategory.Project,
    PostStatus.Published,
  );

  const projects = data?.data || [];

  // Nothing worth showing — keep the landing page clean instead of erroring
  if (isError || (!isLoading && projects.length === 0)) {
    return null;
  }

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Reveal>
        <SectionHeading
          eyebrow="Selected work"
          title="Featured projects"
          subtitle="A few things I've designed and built recently."
        />
      </Reveal>
      <Grid container spacing={3} justifyContent="center">
        {isLoading
          ? [0, 1, 2].map((i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Stack spacing={1.5}>
                  <Skeleton
                    variant="rounded"
                    height={220}
                    sx={{ borderRadius: 4 }}
                  />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="80%" />
                </Stack>
              </Grid>
            ))
          : projects.map((project: any, i: number) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={project.id}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Reveal delay={i * 0.12} sx={{ width: "100%" }}>
                  <ProjectCard project={project} />
                </Reveal>
              </Grid>
            ))}
      </Grid>
      <Stack alignItems="center" sx={{ mt: 5 }}>
        <Button
          component={Link}
          href="/projects"
          endIcon={<ArrowForwardIcon />}
          sx={{
            color: "text.primary",
            borderRadius: "50px",
            px: 4,
            py: 1.2,
            fontWeight: 700,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "secondary.main",
              color: "secondary.main",
              transform: "translateY(-2px)",
            },
          }}
        >
          View all projects
        </Button>
      </Stack>
    </Box>
  );
};

export default FeaturedProjects;
