import type { Metadata } from "next";
import { projectApi } from "@/lib/apiClient";
import ProjectClientPage from "./ProjectClientPage";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    try {
        // Fetch data for metadata
        // Note: This relies on the API being accessible from the server side.
        // ensure NEXT_PUBLIC_API_URL is available and reachable.
        const response = await projectApi.getBySlug(slug);
        const project = response.data;

        if (!project) {
            return {
                title: "Project Not Found",
            };
        }

        const title = project.title;
        const description = project.description || project.excerpt || "View this project by Kivi Amarakoon";
        const coverImage = project.coverImage || "/default-og.jpg"; // You might want a default image

        return {
            title: `${title} | Kivi Amarakoon`,
            description: description,
            openGraph: {
                title: title,
                description: description,
                type: "article", // or "website" but for a project detail, article fits somewhat, or website
                url: `https://kivi-amarakoon.vercel.app/projects/${slug}`, // Update domain if needed
                siteName: "Kivi Amarakoon Portfolio",
                images: [
                    {
                        url: coverImage,
                        width: 1200,
                        height: 630,
                        alt: title,
                    },
                ],
                locale: "en_US",
            },
            twitter: {
                card: "summary_large_image",
                title: title,
                description: description,
                images: [coverImage],
            },
        };
    } catch (error) {
        console.error("Error generating metadata:", error);
        return {
            title: "Project | Kivi Amarakoon",
        };
    }
}

export default function ProjectPage(props: PageProps) {
    return <ProjectClientPage {...props} />;
}
