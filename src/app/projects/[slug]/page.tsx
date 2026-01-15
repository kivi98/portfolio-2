"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Typography,
    Chip,
    Avatar,
    Divider,
    Stack,
    Breadcrumbs,
    Link,
    Paper,
    IconButton,
    Tooltip,
    Button,
    LinearProgress,
    Fab,
    Fade,
    useTheme,
} from "@mui/material";
import {
    Favorite,
    Share,
    ArrowBack,
    CalendarToday,
    Person,
    AccessTime,
    GitHub,
    Launch,
    KeyboardArrowUp,
    BookmarkBorder,
} from "@mui/icons-material";
import { usePostBySlug } from "@/lib/queries";
import { useRouter } from "next/navigation";
import { LoadingSpinner, ErrorMessage } from "@/lib/hooks";
import { MdxRenderer } from "@/components/mdx/MdxRenderer";
import Image from "next/image";

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

const ProjectPage = ({ params }: ProjectPageProps) => {
    const router = useRouter();
    const theme = useTheme();
    const [slug, setSlug] = useState<string>("");
    const [readingProgress, setReadingProgress] = useState(0);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        const getSlug = async () => {
            const resolvedParams = await params;
            setSlug(resolvedParams.slug);
        };
        getSlug();
    }, [params]);

    const { data: project, isLoading, isError, error } = usePostBySlug(slug);
    const projectData = project?.data;

    // Reading progress and scroll tracking
    useEffect(() => {
        const updateReadingProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;

            setReadingProgress(progress);
            setShowScrollToTop(scrollTop > 300);
        };

        window.addEventListener("scroll", updateReadingProgress);
        return () => window.removeEventListener("scroll", updateReadingProgress);
    }, []);

    // Estimated reading time calculation
    const estimatedReadingTime = React.useMemo(() => {
        if (!projectData?.content) return 0;
        const wordsPerMinute = 200;
        const wordCount = projectData.content.split(" ").length;
        return Math.ceil(wordCount / wordsPerMinute);
    }, [projectData?.content]);

    if (!slug) {
        return (
            <Container
                maxWidth="lg"
                sx={{ py: { xs: 4, md: 8 }, pt: { xs: "90px", md: "130px" } }}
            >
                <LoadingSpinner />
            </Container>
        );
    }

    if (isLoading) {
        return (
            <Container
                maxWidth="lg"
                sx={{ py: { xs: 4, md: 8 }, pt: { xs: "90px", md: "130px" } }}
            >
                <LoadingSpinner />
            </Container>
        );
    }

    if (isError) {
        return (
            <Container
                maxWidth="lg"
                sx={{ py: { xs: 4, md: 8 }, pt: { xs: "90px", md: "130px" } }}
            >
                <ErrorMessage error={error} message="Project not found" />
            </Container>
        );
    }

    if (!project) {
        return (
            <Container
                maxWidth="lg"
                sx={{ py: { xs: 4, md: 8 }, pt: { xs: "90px", md: "130px" } }}
            >
                <Typography
                    variant="h4"
                    color="text.secondary"
                    sx={{ textAlign: "center" }}
                >
                    Project not found
                </Typography>
            </Container>
        );
    }

    const handleBackClick = () => {
        router.push("/projects");
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: projectData?.title,
                text: projectData?.description || projectData?.content?.substring(0, 150),
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Extract technology tags and contributors
    const technologies = projectData?.tags || [];
    const contributors: any[] = projectData?.contributors || [];
    const githubUrl = (projectData as any)?.githubUrl;
    const liveUrl = (projectData as any)?.liveUrl || (projectData as any)?.link;

    return (
        <>
            {/* Reading Progress Bar */}
            <LinearProgress
                variant="determinate"
                value={readingProgress}
                sx={{
                    position: "fixed",
                    top: { xs: 70, md: 80 },
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    height: 3,
                    backgroundColor: "transparent",
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: "secondary.main",
                    },
                }}
            />

            <Container
                maxWidth={false}
                sx={{
                    maxWidth: "1200px",
                    mx: "auto",
                    py: { xs: 4, md: 6 },
                    pt: { xs: "100px", md: "120px" },
                    px: { xs: 2, md: 4 },
                }}
            >
                {/* Navigation Header */}
                <Box sx={{ mb: 4 }}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mb: 2 }}
                    >
                        <Button
                            startIcon={<ArrowBack />}
                            onClick={handleBackClick}
                            sx={{
                                color: "text.secondary",
                                textTransform: "none",
                                "&:hover": {
                                    backgroundColor: "secondary.main",
                                    color: "white",
                                },
                                transition: "all 0.3s ease",
                            }}
                        >
                            Back to Projects
                        </Button>

                        <Stack direction="row" spacing={1}>
                            <Tooltip title="Bookmark">
                                <IconButton size="small">
                                    <BookmarkBorder />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Share">
                                <IconButton size="small" onClick={handleShare}>
                                    <Share />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>

                    <Breadcrumbs sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={handleBackClick}
                            sx={{
                                color: "text.secondary",
                                textDecoration: "none",
                                cursor: "pointer",
                                "&:hover": { color: "secondary.main" },
                            }}
                        >
                            Projects
                        </Link>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "300px",
                            }}
                        >
                            {projectData?.title}
                        </Typography>
                    </Breadcrumbs>
                </Box>

                {/* Project Header */}
                <Box sx={{ mb: 6, textAlign: "center" }}>
                    {/* Title */}
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                            fontWeight: 800,
                            lineHeight: 1.2,
                            mb: 3,
                            background:
                                theme.palette.mode === "dark"
                                    ? "linear-gradient(135deg, #ffffff, #e0e0e0)"
                                    : "linear-gradient(135deg, #1a1a1a, #333333)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            maxWidth: "800px",
                            mx: "auto",
                        }}
                    >
                        {projectData?.title}
                    </Typography>

                    {/* Description */}
                    {projectData?.description && (
                        <Typography
                            variant="h6"
                            sx={{
                                color: "text.secondary",
                                maxWidth: "700px",
                                mx: "auto",
                                mb: 4,
                                fontSize: { xs: "1rem", md: "1.25rem" },
                                fontWeight: 400,
                                lineHeight: 1.6,
                            }}
                        >
                            {projectData.description}
                        </Typography>
                    )}

                    {/* Author and Meta Info */}
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        alignItems="center"
                        justifyContent="center"
                        spacing={{ xs: 2, sm: 4 }}
                        sx={{ mb: 4 }}
                    >
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar
                                sx={{
                                    width: 48,
                                    height: 48,
                                    background: "linear-gradient(135deg, #e30000, #ff6b6b)",
                                }}
                            >
                                <Person />
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    {projectData?.owner?.firstName || "Kivi"}{" "}
                                    {projectData?.owner?.lastName || "Amarakoon"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {contributors.length > 1 ? "Lead Developer" : "Developer"}
                                </Typography>
                            </Box>
                        </Stack>

                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ display: { xs: "none", sm: "block" } }}
                        />

                        <Stack direction="row" spacing={3}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <CalendarToday fontSize="small" color="action" />
                                <Typography variant="body2" color="text.secondary">
                                    {new Date(projectData?.createdAt || "").toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        },
                                    )}
                                </Typography>
                            </Stack>

                            {projectData?.content && (
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <AccessTime fontSize="small" color="action" />
                                    <Typography variant="body2" color="text.secondary">
                                        {estimatedReadingTime} min read
                                    </Typography>
                                </Stack>
                            )}

                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Favorite fontSize="small" color="secondary" />
                                <Typography variant="body2" color="text.secondary">
                                    {projectData?.likes || 0}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>

                    {/* Technologies/Tags */}
                    {technologies && technologies.length > 0 && (
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                            flexWrap="wrap"
                            sx={{ gap: 1, mb: 4 }}
                        >
                            {technologies.map((tag, index) => {
                                const tagName = typeof tag === "string" ? tag : tag.name;
                                const tagKey = typeof tag === "string" ? tag : tag.id;
                                return (
                                    <Chip
                                        key={tagKey || index}
                                        label={tagName}
                                        size="medium"
                                        sx={{
                                            backgroundColor: "secondary.main",
                                            color: "white",
                                            fontWeight: 600,
                                            fontSize: "0.875rem",
                                            "&:hover": {
                                                backgroundColor: "secondary.dark",
                                                transform: "translateY(-2px)",
                                            },
                                            transition: "all 0.2s ease",
                                        }}
                                    />
                                );
                            })}
                        </Stack>
                    )}

                    {/* Action Buttons */}
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        justifyContent="center"
                        sx={{ mb: 4 }}
                    >
                        {liveUrl && (
                            <Button
                                variant="contained"
                                color="secondary"
                                href={liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                endIcon={<Launch />}
                                sx={{
                                    borderRadius: 3,
                                    px: 4,
                                    py: 1.5,
                                    fontWeight: 700,
                                    textTransform: "none",
                                    fontSize: "1rem",
                                }}
                            >
                                View Live Demo
                            </Button>
                        )}
                        {githubUrl && (
                            <Button
                                variant="outlined"
                                color="secondary"
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                startIcon={<GitHub />}
                                sx={{
                                    borderRadius: 3,
                                    px: 4,
                                    py: 1.5,
                                    fontWeight: 600,
                                    textTransform: "none",
                                    fontSize: "1rem",
                                }}
                            >
                                View on GitHub
                            </Button>
                        )}
                    </Stack>
                </Box>

                {/* Featured Image */}
                {projectData?.coverImage && (
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: { xs: 300, sm: 400, md: 500 },
                            mb: 6,
                            borderRadius: 3,
                            overflow: "hidden",
                            boxShadow: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "0 20px 60px rgba(0, 0, 0, 0.5)"
                                    : "0 20px 60px rgba(0, 0, 0, 0.15)",
                        }}
                    >
                        <Image
                            src={projectData.coverImage}
                            alt={projectData.title}
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                        />
                    </Box>
                )}

                {/* Main Content */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", lg: "1fr 300px" },
                        gap: 4,
                        alignItems: "start",
                    }}
                >
                    {/* Project Content */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3, sm: 4, md: 6 },
                            borderRadius: 3,
                            background:
                                theme.palette.mode === "dark"
                                    ? "rgba(35, 39, 47, 0.4)"
                                    : "rgba(255, 255, 255, 0.7)",
                            backdropFilter: "blur(20px)",
                            border:
                                theme.palette.mode === "dark"
                                    ? "1px solid rgba(255, 255, 255, 0.1)"
                                    : "1px solid rgba(0, 0, 0, 0.05)",
                            minHeight: "60vh",
                        }}
                    >
                        <MdxRenderer content={projectData?.content || ""} />
                    </Paper>

                    {/* Sidebar - Desktop Only */}
                    <Box
                        sx={{
                            display: { xs: "none", lg: "block" },
                            position: "sticky",
                            top: 120,
                        }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                background:
                                    theme.palette.mode === "dark"
                                        ? "rgba(35, 39, 47, 0.4)"
                                        : "rgba(255, 255, 255, 0.7)",
                                backdropFilter: "blur(20px)",
                                border:
                                    theme.palette.mode === "dark"
                                        ? "1px solid rgba(255, 255, 255, 0.1)"
                                        : "1px solid rgba(0, 0, 0, 0.05)",
                            }}
                        >
                            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                                Project Info
                            </Typography>

                            <Stack spacing={2}>
                                <Box>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 1 }}
                                    >
                                        Reading Progress
                                    </Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={readingProgress}
                                        sx={{
                                            height: 6,
                                            borderRadius: 3,
                                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                                            "& .MuiLinearProgress-bar": {
                                                borderRadius: 3,
                                                backgroundColor: "secondary.main",
                                            },
                                        }}
                                    />
                                    <Typography variant="caption" color="text.secondary">
                                        {Math.round(readingProgress)}% completed
                                    </Typography>
                                </Box>

                                <Divider />

                                <Box>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 2 }}
                                    >
                                        Share this project
                                    </Typography>
                                    <Stack direction="row" spacing={1}>
                                        <Tooltip title="Share">
                                            <IconButton
                                                size="small"
                                                onClick={handleShare}
                                                sx={{
                                                    backgroundColor: "secondary.main",
                                                    color: "white",
                                                    "&:hover": { backgroundColor: "secondary.dark" },
                                                }}
                                            >
                                                <Share fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Bookmark">
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    backgroundColor: (theme) =>
                                                        theme.palette.mode === "dark"
                                                            ? "rgba(255,255,255,0.1)"
                                                            : "rgba(0,0,0,0.1)",
                                                    "&:hover": {
                                                        backgroundColor: "secondary.main",
                                                        color: "white",
                                                    },
                                                }}
                                            >
                                                <BookmarkBorder fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </Box>

                                {contributors && contributors.length > 0 && (
                                    <>
                                        <Divider />
                                        <Box>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ mb: 2 }}
                                            >
                                                Contributors
                                            </Typography>
                                            <Stack spacing={1}>
                                                {contributors.map((contributor, index) => (
                                                    <Stack
                                                        key={index}
                                                        direction="row"
                                                        alignItems="center"
                                                        spacing={1}
                                                    >
                                                        <Avatar
                                                            sx={{
                                                                width: 32,
                                                                height: 32,
                                                                fontSize: "0.875rem",
                                                            }}
                                                        >
                                                            {typeof contributor === "string"
                                                                ? contributor.charAt(0)
                                                                : contributor.firstName?.charAt(0) || "?"}
                                                        </Avatar>
                                                        <Typography variant="body2">
                                                            {typeof contributor === "string"
                                                                ? contributor
                                                                : `${contributor.firstName} ${contributor.lastName}`}
                                                        </Typography>
                                                    </Stack>
                                                ))}
                                            </Stack>
                                        </Box>
                                    </>
                                )}
                            </Stack>
                        </Paper>
                    </Box>
                </Box>
            </Container>

            {/* Scroll to Top FAB */}
            <Fade in={showScrollToTop}>
                <Fab
                    onClick={scrollToTop}
                    size="medium"
                    sx={{
                        position: "fixed",
                        bottom: 24,
                        right: 24,
                        backgroundColor: "secondary.main",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "secondary.dark",
                            transform: "scale(1.1)",
                        },
                        transition: "all 0.3s ease",
                        zIndex: 1000,
                    }}
                >
                    <KeyboardArrowUp />
                </Fab>
            </Fade>
        </>
    );
};

export default ProjectPage;
