"use client";
import React from "react";
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import SectionHeading from "./SectionHeading";
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
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Reveal>
        <SectionHeading
          eyebrow="What I do"
          title="Turning ideas into products"
          subtitle="From first sketch to production deployment, I cover the whole journey."
        />
      </Reveal>
      <Grid container spacing={3}>
        {highlights.map((item, i) => (
          <Grid item xs={12} md={4} key={item.title}>
            <Reveal delay={i * 0.12} sx={{ height: "100%" }}>
              <Stack
                spacing={2}
                sx={{
                  height: "100%",
                  p: 4,
                  borderRadius: "20px",
                  border: `1px solid ${theme.palette.divider}`,
                  background: isDark
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(12px)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    borderColor: isDark
                      ? "rgba(227,0,0,0.4)"
                      : "rgba(211,47,47,0.4)",
                    boxShadow: isDark
                      ? "0 20px 40px rgba(0,0,0,0.4)"
                      : "0 20px 40px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "secondary.main",
                    background: isDark
                      ? "rgba(227,0,0,0.1)"
                      : "rgba(211,47,47,0.08)",
                    border: `1px solid ${
                      isDark ? "rgba(227,0,0,0.25)" : "rgba(211,47,47,0.2)"
                    }`,
                  }}
                >
                  {item.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
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
