"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Link,
  Alert,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { CredlyBadgeDisplay } from "@/types/credly";
import { formatCredlyDate } from "@/lib/credlyApi";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useTheme } from "@mui/material";

interface CredlyBadgeCardProps {
  badge: CredlyBadgeDisplay;
}

export const CredlyBadgeCard: React.FC<CredlyBadgeCardProps> = ({ badge }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.3s ease-in-out",
        boxShadow: "none",
        "&:hover": {
          transform: "translateY(-6px)",
          borderColor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.2)"
              : "rgba(0,0,0,0.2)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 16px 32px rgba(0,0,0,0.3)"
              : "0 16px 32px rgba(0,0,0,0.08)",
        },
        position: "relative",
        background:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.02)"
            : "rgba(255,255,255,0.7)",
        backdropFilter: "blur(12px)",
        borderRadius: "20px",
      }}
    >
      <Link
        href={badge.credlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Badge Image */}
        <Box
          sx={{
            position: "relative",
            paddingTop: "75%", // 4:3 aspect ratio
            backgroundColor: "transparentLevels.3",
          }}
        >
          <CardMedia
            component="img"
            image={badge.imageUrl}
            alt={badge.title}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              padding: 2,
            }}
          />
          {/* Verified Icon Overlay */}
          <Box
            sx={(theme) => ({
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor:
                theme.palette.mode === "light"
                  ? "success.main"
                  : "primary.main",
              borderRadius: "50%",
              padding: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            })}
          >
            <Tooltip title="Verified Badge">
              <VerifiedIcon sx={{ color: "white", fontSize: 20 }} />
            </Tooltip>
          </Box>
        </Box>

        {/* Badge Content */}
        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          {/* Title */}
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{
              fontWeight: 600,
              fontSize: "1rem",
              lineHeight: 1.3,
              minHeight: "2.6em",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {badge.title}
          </Typography>

          {/* Issuer */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1, fontWeight: 500 }}
          >
            {badge.issuer}
          </Typography>

          {/* Issue Date */}
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5 }}>
            Issued: {formatCredlyDate(badge.issuedDate)}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              flexGrow: 1,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              mb: 1.5,
              fontSize: "0.875rem",
            }}
          >
            {badge.description}
          </Typography>

          {/* Skills */}
          {badge.skills && badge.skills.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1 }}>
              {badge.skills.slice(0, 3).map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  size="small"
                  sx={{
                    fontSize: "0.7rem",
                    height: 20,
                  }}
                />
              ))}
              {badge.skills.length > 3 && (
                <Chip
                  label={`+${badge.skills.length - 3}`}
                  size="small"
                  sx={{
                    fontSize: "0.7rem",
                    height: 20,
                  }}
                />
              )}
            </Box>
          )}

          {/* View Badge Link */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "secondary.light",
              mt: "auto",
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              View Badge
            </Typography>
            <OpenInNewIcon sx={{ fontSize: 16 }} />
          </Box>
        </CardContent>
      </Link>
    </Card>
  );
};

// Loading Skeleton Component
export const CredlyBadgeCardSkeleton: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100%",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        paddingTop: 5,
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};

// Error Component
interface CredlyBadgesErrorProps {
  message?: string;
}

export const CredlyBadgesError: React.FC<CredlyBadgesErrorProps> = ({
  message = "Failed to load Credly badges. Please try again later.",
}) => {
  return (
    <Box sx={{ width: "100%", my: 3 }}>
      <Alert severity="error">{message}</Alert>
    </Box>
  );
};

// Empty State Component
export const CredlyBadgesEmpty: React.FC = () => {
  return (
    <Box sx={{ width: "100%", my: 3 }}>
      <Alert severity="info">
        No badges found. Start earning badges on Credly!
      </Alert>
    </Box>
  );
};
