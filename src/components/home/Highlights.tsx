"use client";
import React from "react";
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const highlights = [
  {
    icon: <CodeIcon />,
    title: "Full-stack development",
    description:
      "Modern, responsive web apps with React, Next.js and TypeScript — built with attention to performance, accessibility and detail.",
  },
  {
    icon: <StorageIcon />,
    title: "Backend & APIs",
    description:
      "Robust services and data layers with Java, Node.js and .NET, backed by SQL and NoSQL databases and clean, well-tested APIs.",
  },
  {
    icon: <CloudQueueIcon />,
    title: "Cloud & DevOps",
    description:
      "Shipping with confidence using Azure, Docker and Git-based workflows — from local builds to automated, reliable deployments.",
  },
];

const Highlights = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Reveal>
        <SectionHeading
          index="01"
          eyebrow="What I do"
          title="Turning ideas into products"
          subtitle="From first sketch to production deployment, I cover the whole journey."
        />
      </Reveal>
      <Grid container spacing={0}>
        {highlights.map((item, i) => (
          <Grid item xs={12} md={4} key={item.title}>
            <Reveal delay={i * 0.12} sx={{ height: "100%" }}>
              <Stack
                spacing={2.5}
                sx={{
                  height: "100%",
                  p: { xs: 3, md: 4 },
                  borderTop: `1px solid ${theme.palette.divider}`,
                  borderLeft: {
                    xs: "none",
                    md:
                      i === 0
                        ? "none"
                        : `1px solid ${theme.palette.divider}`,
                  },
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(244,239,231,0.03)"
                        : "rgba(27,23,18,0.03)",
                  },
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box sx={{ color: "secondary.main", display: "flex" }}>
                    {item.icon}
                  </Box>
                  <Typography variant="overline" sx={{ color: "text.disabled" }}>
                    {`0${i + 1}`}
                  </Typography>
                </Stack>
                <Typography variant="h5" sx={{ fontSize: "1.3rem" }}>
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", lineHeight: 1.7 }}
                >
                  {item.description}
                </Typography>
              </Stack>
            </Reveal>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Highlights;
