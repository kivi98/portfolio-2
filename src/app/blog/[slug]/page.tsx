import type { Metadata } from "next";
import { postApi } from "@/lib/apiClient";
import BlogPostClientPage from "./BlogClientPage";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    // Fetch data for metadata
    // Note: This relies on the API being accessible from the server side.
    // Ensure NEXT_PUBLIC_API_URL is available and reachable.
    const response = await postApi.getBySlug(slug);
    const post = response.data;

    if (!post) {
      return {
        title: "Blog Post Not Found",
      };
    }

    const title = post.title;
    const description =
      post.description ||
      post.excerpt ||
      "Read this blog post by Kivi Amarakoon";
    const coverImage = post.coverImage || "/default-og.jpg"; // You might want a default image

    return {
      title: `${title} | Kivi Amarakoon`,
      description: description,
      openGraph: {
        title: title,
        description: description,
        type: "article",
        url: `https://kivi-amarakoon.vercel.app/blog/${slug}`, // Update domain if needed
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
      title: "Blog Post | Kivi Amarakoon",
    };
  }
}

export default function BlogPostPage(props: PageProps) {
  return <BlogPostClientPage {...props} />;
}
