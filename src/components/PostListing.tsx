"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Pagination,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import type { UseQueryResult } from "@tanstack/react-query";
import { usePosts } from "@/lib/queries";
import { ContentCategory, PostStatus } from "@/enum";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

interface PostListingProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  emptyMessage: string;
  category: ContentCategory;
  /** Search hook (useSearchBlogs / useSearchProjects) — called unconditionally */
  useSearch: (
    search: string,
    page: number,
    limit: number,
  ) => UseQueryResult<any, Error>;
  renderCard: (item: any) => React.ReactNode;
}

const LIMIT = 6;

/**
 * Shared listing page for blog posts and projects: PageHero + centered
 * pill search + responsive card grid with skeleton loading, styled
 * empty/error states and pagination.
 */
const PostListing: React.FC<PostListingProps> = ({
  eyebrow,
  title,
  subtitle,
  searchPlaceholder,
  emptyMessage,
  category,
  useSearch,
  renderCard,
}) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const searchQuery = useSearch(search, page, LIMIT);
  const listQuery = usePosts(page, LIMIT, category, PostStatus.Published);
  const { data, isLoading, isError, error } = search.trim()
    ? searchQuery
    : listQuery;

  const items = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", pb: { xs: 6, md: 10 } }}>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle}>
        <Stack alignItems="flex-start">
          <TextField
            name={`${eyebrow.toLowerCase()}-search`}
            placeholder={searchPlaceholder}
            size="small"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            InputProps={{
              startAdornment: (
                <SearchIcon
                  sx={{ mr: 1, color: "text.disabled", fontSize: 20 }}
                />
              ),
            }}
            sx={{
              width: { xs: "100%", sm: 380 },
              "& .MuiInputBase-root": {
                borderRadius: "2px",
                px: 2,
                background: (theme) => theme.palette.background.paper,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "divider",
              },
            }}
          />
        </Stack>
      </PageHero>

      {isError ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            px: 4,
            borderRadius: "3px",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            background: (theme) => theme.palette.background.paper,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Something went wrong
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {error?.message || "Failed to load content. Please try again later."}
          </Typography>
        </Box>
      ) : !isLoading && items.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary" fontWeight={500}>
            {search ? "Nothing matches your search." : emptyMessage}
          </Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {isLoading
              ? Array.from({ length: LIMIT }, (_, i) => (
                  <Stack spacing={1.5} key={i}>
                    <Skeleton
                      variant="rounded"
                      height={220}
                      sx={{ borderRadius: "3px" }}
                    />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="90%" />
                    <Skeleton variant="text" width="80%" />
                  </Stack>
                ))
              : items.map((item: any, i: number) => (
                  <Reveal key={item.id} delay={(i % 3) * 0.1}>
                    {renderCard(item)}
                  </Reveal>
                ))}
          </Box>

          {!isLoading && totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="secondary"
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: "2px",
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default PostListing;
