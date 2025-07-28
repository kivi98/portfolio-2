import { Box, Typography } from "@mui/material";
import TwoColumnSection from "./TwoColumnSection";
import KImageBox from "./KImageBox";
import { ImageItem } from "@/types";

const WhoAmI = () => {
  const imageArray: ImageItem[] = [
    {
      id: 1,
      src: "/my-images/my-image-2.jpg",
      alt: "my-image1",
    },
    {
      id: 2,
      src: "/my-images/my-image-4.jpg",
      alt: "my-image4",
    },
    {
      id: 3,
      src: "/my-images/my-image-5.jpg",
      alt: "my-image5",
    },
    {
      id: 4,
      src: "/my-images/my-image-6.jpg",
      alt: "my-image6",
    },
    {
      id: 5,
      src: "/my-images/my-image-9.jpg",
      alt: "my-image9",
    },
    {
      id: 6,
      src: "/my-images/my-image-12.jpg",
      alt: "my-image12",
    },
  ];

  return (
    <TwoColumnSection
      title={"Who Am I"}
      rightComponent={
        // <Box
        //   sx={{
        //     position: "relative",
        //     height: "fit-content",
        //     "&::before": {
        //       content: '""',
        //       position: "absolute",
        //       top: -15,
        //       right: -15,
        //       bottom: -15,
        //       left: -15,
        //       border: "2px solid",
        //       borderColor: "secondary.main",
        //       borderRadius: 2,
        //       opacity: 0.5,
        //       zIndex: -1,
        //     },
        //   }}
        // >
          <KImageBox
            height={{ xs: 300, md: 540 }}
            imageArray={imageArray}
            autoTransition={true}
            transitionInterval={3000}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
            }}
          />
        // </Box>
      }
      leftComponent={
        <Typography
          variant={"body1"}
          sx={{
            "&::first-letter": {
              fontSize: "3rem",
              fontWeight: "bold",
              color: "secondary.main",
              float: "left",
              lineHeight: "1",
              padding: "0.2rem",
              marginRight: "0.2rem",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            },
            fontSize: { xs: 15, md: 17 },
            lineHeight: 1.8,
            color: "text.light",
            textAlign: "justify",
            p: 3,
            borderRadius: 2,
            backgroundColor: "transparentLevels.3",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            position: "relative",
            border: "1px solid",
            borderColor: "transparentLevelsWhite.1",
          }}
        >
          I&#39;m an aspiring software engineer with a passion for crafting
          innovative solutions to real-world challenges. With experience in web,
          mobile, and enterprise-level development, I enjoy building
          user-centered software using modern tools like React, .NET, and Clean
          Architecture.
          <br />
          <br />
          Currently pursuing an MSc in Computer Science at the University of Sri
          Jayawardenapura, I'm eager to deepen my knowledge in areas like AI,
          Software Architecture, and Networking. Whether it&#39;s creating
          efficient systems or experimenting with the latest technologies, I'm
          committed to continuous learning and growth.
          <br />
          <br />
          In essence, I'm just an ordinary student with extraordinary
          dreams—determined to grow into an expert in software engineering, one
          line of code at a time.
        </Typography>
      }
    />
  );
};

export default WhoAmI;
