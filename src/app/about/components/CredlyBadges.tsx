"use client";

import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useCredlyBadges } from "@/lib/credlyHooks";
import { CredlyBadgeDisplay } from "@/types/credly";
import {
  CredlyBadgeCard,
  CredlyBadgeCardSkeleton,
  CredlyBadgesError,
  CredlyBadgesEmpty,
} from "./CredlyBadgeCard";
import OneColumnSection from "./OneColumnSection";
import CollapsibleItems from "./CollapsibleItems";

const CREDLY_USERNAME =
  process.env.NEXT_PUBLIC_CREDLY_USERNAME || "kivi-amarakoon-arachchi";

const CredlyBadges: React.FC = () => {
  const {
    data: badges,
    isLoading,
    isError,
    error,
  } = useCredlyBadges(CREDLY_USERNAME);

  const renderContent = () => {
    if (isLoading) {
      return <CredlyBadgeCardSkeleton />;
    }

    if (isError) {
      return <CredlyBadgesError message={(error as Error)?.message} />;
    }

    if (!badges || badges.length === 0) {
      return <CredlyBadgesEmpty />;
    }

    return (
      <CollapsibleItems
        items={badges}
        initialCount={6}
        moreLabel={(n) => `Show ${n} more badges`}
      >
        {(visible) => (
          <Grid container spacing={3}>
            {visible.map((badge: CredlyBadgeDisplay) => (
              <Grid item xs={12} sm={6} md={4} key={badge.id}>
                <CredlyBadgeCard badge={badge} />
              </Grid>
            ))}
          </Grid>
        )}
      </CollapsibleItems>
    );
  };

  return (
    <OneColumnSection
      title="Credly Badges"
      eyebrow="Verified"
      sectionDescription={
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, textAlign: "center" }}
          >
            Professional certifications and digital badges earned through
            Credly, demonstrating verified skills and achievements.
          </Typography>
          {renderContent()}
        </Box>
      }
    />
  );
};

export default CredlyBadges;
