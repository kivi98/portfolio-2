"use client";

import React from "react";
import { Box, useTheme } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import { mdxComponents } from "./MdxComponents";
import { preprocessContent } from "./ContentProcessor";

// Import KaTeX styles for math rendering
import "katex/dist/katex.min.css";

interface MdxRendererProps {
  content: string;
  className?: string;
}

export const MdxRenderer: React.FC<MdxRendererProps> = ({
  content,
  className,
}) => {
  const theme = useTheme();

  // Preprocess the content to handle HTML img tags and other issues
  const processedContent = preprocessContent(content);

  return (
    <Box
      className={`mdx-content ${className || ""}`}
      sx={{
        // Global styles for the rendered content
        "& .hljs": {
          background:
            theme.palette.mode === "dark"
              ? "rgba(0, 0, 0, 0.4) !important"
              : "rgba(0, 0, 0, 0.03) !important",
          borderRadius: theme.spacing(2),
          padding: theme.spacing(2),
        },
        "& .katex": {
          fontSize: "1.1em",
        },
        "& .katex-display": {
          margin: `${theme.spacing(2)} 0`,
        },
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          rehypeRaw, // This allows HTML tags to be processed
          rehypeHighlight,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: ["anchor"],
              },
            },
          ],
          rehypeKatex,
        ]}
        components={mdxComponents}
      >
        {processedContent}
      </ReactMarkdown>
    </Box>
  );
};

export default MdxRenderer;
