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
    Modal,
    Backdrop,
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
    FormatListBulleted,
    Close,
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

interface TocItem {
    id: string;
    text: string;
    level: number;
}

const ProjectPage = ({ params }: ProjectPageProps) => {
    const router = useRouter();
    const theme = useTheme();
    const [slug, setSlug] = useState<string>("");
    const [readingProgress, setReadingProgress] = useState(0);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [tocItems, setTocItems] = useState<TocItem[]>([]);
    const [activeHeading, setActiveHeading] = useState<string>("");
    const [showMobileToc, setShowMobileToc] = useState(false);

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
        return () => window.removeEventListener("scroll", updateReadingProgress);
    }, []);

    // Extract TOC from content and set up intersection observer
    useEffect(() => {
        if (!projectData?.content) return;

        // Extract headings from content
        const extractTocFromContent = () => {
            // Wait for content to be rendered
            setTimeout(() => {
                const headings = document.querySelectorAll(
                    ".mdx-content h1, .mdx-content h2, .mdx-content h3, .mdx-content h4, .mdx-content h5, .mdx-content h6",
                );
                const tocData: TocItem[] = [];

                headings.forEach((heading, index) => {
                    const level = parseInt(heading.tagName.charAt(1));
                    const text = heading.textContent || "";
                    const id = `heading-${index}`;

                    // Add ID to heading if it doesn't have one
                    heading.id = id;

                    tocData.push({ id, text, level });
                });

                setTocItems(tocData);
            }, 100);
        };

        extractTocFromContent();
    }, [projectData?.content]);

    // Intersection Observer for active heading tracking
    useEffect(() => {
        if (tocItems.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveHeading(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-20% 0% -60% 0%",
                threshold: 0,
            },
        );

        tocItems.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            tocItems.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [tocItems]);

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

    const scrollToHeading = (headingId: string) => {
        const element = document.getElementById(headingId);
        if (element) {
            const offset = 120; // Account for fixed header
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: "smooth",
            });
        }
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
                            {tocItems.length > 0 && (
                                <Tooltip title="Table of Contents">
                                    <IconButton
                                        size="small"
                                        onClick={() => setShowMobileToc(true)}
                                        sx={{ display: { xl: "none", lg: "none" } }}
                                    >
                                        <FormatListBulleted />
                                    </IconButton>
                                </Tooltip>
                            )}
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
                            top: 150,
                            marginTop: "0px",
                            alignSelf: "start",
                            zIndex: 10,
                        }}
                    >
                        <Stack spacing={3}>
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

                            {tocItems.length > 0 && (
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
                                        maxHeight: "calc(100vh - 500px)",
                                        overflowY: "auto",
                                        "&::-webkit-scrollbar": {
                                            width: "4px",
                                        },
                                        "&::-webkit-scrollbar-track": {
                                            background: "transparent",
                                        },
                                        "&::-webkit-scrollbar-thumb": {
                                            background: theme.palette.mode === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                                            borderRadius: "4px",
                                        },
                                        "&::-webkit-scrollbar-thumb:hover": {
                                            background: theme.palette.mode === 'dark' ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                                        }
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={600}
                                        sx={{ mb: 2 }}
                                    >
                                        Table of Contents
                                    </Typography>
                                    <Stack spacing={1}>
                                        {tocItems.map((item) => (
                                            <Button
                                                key={item.id}
                                                onClick={() => scrollToHeading(item.id)}
                                                sx={{
                                                    justifyContent: "flex-start",
                                                    textAlign: "left",
                                                    textTransform: "none",
                                                    pl: 1 + (item.level - 1) * 1.5,
                                                    pr: 2,
                                                    py: 0.75,
                                                    minHeight: "auto",
                                                    color:
                                                        activeHeading === item.id ? "white" : "text.secondary",
                                                    backgroundColor:
                                                        activeHeading === item.id
                                                            ? "rgba(114, 137, 218, 0.8)"
                                                            : "transparent",
                                                    border: "none",
                                                    borderRadius: 2,
                                                    fontSize: "0.85rem",
                                                    fontWeight: activeHeading === item.id ? 600 : 400,
                                                    "&:hover": {
                                                        backgroundColor:
                                                            activeHeading === item.id
                                                                ? "rgba(114, 137, 218, 0.9)"
                                                                : theme.palette.mode === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                                                    },
                                                    transition: "all 0.2s ease",
                                                }}
                                            >
                                                {item.text}
                                            </Button>
                                        ))}
                                    </Stack>
                                </Paper>
                            )}
                        </Stack>
                    </Box>
                </Box>
            </Container>

            {/* Mobile TOC Modal */}
            <Modal
                open={showMobileToc}
                onClose={() => setShowMobileToc(false)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                        sx: {
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            backdropFilter: "blur(4px)",
                        },
                    },
                }}
            >
                <Fade in={showMobileToc}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: { xs: "90%", sm: "400px" },
                            maxHeight: "80vh",
                            overflowY: "auto",
                            outline: "none",
                        }}
                    >
                        <Paper
                            elevation={24}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                background:
                                    theme.palette.mode === "dark"
                                        ? "linear-gradient(135deg, rgba(35, 39, 47, 0.98) 0%, rgba(45, 49, 57, 0.98) 100%)"
                                        : "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 245, 245, 0.98) 100%)",
                                backdropFilter: "blur(20px)",
                                border:
                                    theme.palette.mode === "dark"
                                        ? "1px solid rgba(255, 255, 255, 0.1)"
                                        : "1px solid rgba(0, 0, 0, 0.1)",
                                position: "relative",
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: "1px",
                                    background:
                                        "linear-gradient(90deg, transparent, rgba(114, 137, 218, 0.3), transparent)",
                                    borderRadius: "3px 3px 0 0",
                                },
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{
                                    mb: 3,
                                    pb: 2,
                                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    fontWeight={600}
                                    sx={{
                                        color: theme.palette.mode === 'dark' ? "white" : "text.primary",
                                        textTransform: "uppercase",
                                        letterSpacing: 1,
                                        fontSize: "1rem",
                                    }}
                                >
                                    Table of Contents
                                </Typography>
                                <IconButton
                                    onClick={() => setShowMobileToc(false)}
                                    size="small"
                                    sx={{
                                        backgroundColor: theme.palette.mode === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                                        color: theme.palette.mode === 'dark' ? "white" : "text.primary",
                                        "&:hover": {
                                            backgroundColor: theme.palette.mode === 'dark' ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
                                            transform: "scale(1.1)",
                                        },
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    <Close />
                                </IconButton>
                            </Stack>

                            <Stack spacing={1}>
                                {tocItems.map((item) => (
                                    <Button
                                        key={item.id}
                                        onClick={() => {
                                            scrollToHeading(item.id);
                                            setShowMobileToc(false);
                                        }}
                                        sx={{
                                            justifyContent: "flex-start",
                                            textAlign: "left",
                                            textTransform: "none",
                                            pl: 1 + (item.level - 1) * 1.5,
                                            pr: 2,
                                            py: 0.75,
                                            minHeight: "auto",
                                            color:
                                                activeHeading === item.id ? "white" : "text.secondary",
                                            backgroundColor:
                                                activeHeading === item.id
                                                    ? "rgba(114, 137, 218, 0.8)"
                                                    : "transparent",
                                            border: "none",
                                            borderRadius: 2,
                                            fontSize: "0.85rem",
                                            fontWeight: activeHeading === item.id ? 600 : 400,
                                            "&:hover": {
                                                backgroundColor:
                                                    activeHeading === item.id
                                                        ? "rgba(114, 137, 218, 0.9)"
                                                        : theme.palette.mode === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                                            },
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        {item.text}
                                    </Button>
                                ))}
                            </Stack>
                        </Paper>
                    </Box>
                </Fade>
            </Modal>

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
