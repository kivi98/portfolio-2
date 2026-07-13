import { Typography } from "@mui/material";
import TwoColumnSection from "./TwoColumnSection";
import KImageBox from "./KImageBox";
import { ImageItem } from "@/types";

const WhoAmI = () => {
  const imageArray: ImageItem[] = [
    {
      id: 1,
      src: "/my-images/my-image-5.jpg",
      alt: "my-image5",
    },
    {
      id: 2,
      src: "/my-images/my-image-6.jpg",
      alt: "my-image6",
    },
    {
      id: 3,
      src: "/my-images/my-image-9.jpg",
      alt: "my-image9",
    },
    {
      id: 4,
      src: "/my-images/my-image-12.jpg",
      alt: "my-image12",
    },
  ];

  return (
    <TwoColumnSection
      title={"Who Am I"}
      rightComponent={
        <KImageBox
          height={{ xs: "420px", md: "100%" }}
          imageArray={imageArray}
          autoTransition={true}
          transitionInterval={3000}
          sx={{
            borderRadius: "3px",
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            minHeight: { md: "480px" },
          }}
          imageSx={{
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 20%",
          }}
        />
      }
      leftComponent={
        <Typography
          variant={"body1"}
          sx={(theme) => ({
            fontSize: { xs: 15, md: 17 },
            lineHeight: 1.9,
            color: "text.secondary",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: { xs: 3, md: 4 },
            borderRadius: "3px",
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          })}
        >
          I&#39;m an aspiring software engineer with a passion for crafting
          innovative solutions to real-world challenges. With experience in web,
          mobile, and enterprise-level development, I enjoy building
          user-centered software using modern tools like React, .NET, and Clean
          Architecture.
          <br />
          <br />
          Currently pursuing an MSc in Computer Science at the University of Sri
          Jayawardenapura, I&apos;m eager to deepen my knowledge in areas like
          AI, Software Architecture, and Networking. Whether it&#39;s creating
          efficient systems or experimenting with the latest technologies,
          I&apos;m committed to continuous learning and growth.
          <br />
          <br />
          In essence, I&apos;m just an ordinary student with extraordinary
          dreams—determined to grow into an expert in software engineering, one
          line of code at a time.
        </Typography>
      }
    />
  );
};

export default WhoAmI;
