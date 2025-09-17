import { Box, Stack } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import TwoColumnSection from "./TwoColumnSection";
import KImageBox from "./KImageBox";
import SkillCard from "./SkillCard";

const Certifications = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const stackRef = useRef<HTMLDivElement>(null);

  const imageArray = [
    {
      id: 1,
      src: "/certifications/cert-1.jpeg",
      alt: "cert-1",
    },
    {
      id: 2,
      src: "/certifications/cert-2.png",
      alt: "cert-1",
    },
    {
      id: 3,
      src: "/certifications/cert-3.png",
      alt: "cert-1",
    },
    {
      id: 4,
      src: "/certifications/cert-4.png",
      alt: "cert-1",
    },
    {
      id: 5,
      src: "/certifications/cert-5.png",
      alt: "cert-1",
    },
    {
      id: 6,
      src: "/certifications/cert-6.png",
      alt: "cert-1",
    },
    {
      id: 7,
      src: "/certifications/cert-7.png",
      alt: "cert-1",
    },
  ];

  const skillCards = [
    {
      title: "Azure Fundamentals Certification",
      subtitle: "Microsoft",
      date: "20/12/2023",
      description:
        "Gained foundational knowledge of Azure services, cloud computing principles, and security, enabling effective integration of cloud solutions in projects.",
    },
    {
      title: "GitHub Foundation Exam",
      subtitle: "GitHub",
      date: "20/12/2023",
      description:
        "Demonstrated proficiency in GitHub tools and workflows, essential for modern version control and collaborative software development.",
    },
    {
      title: "Postman API Fundamentals Student Expert",
      subtitle: "Postman",
      date: "20/12/2023",
      description:
        "Mastered API testing and documentation with Postman, enhancing API integration and debugging capabilities.",
    },
    {
      title: "Certified Cyber-Security",
      subtitle: "ISC2 Certifications",
      date: "20/12/2023",
      description:
        "Validated foundational knowledge in cybersecurity concepts, ensuring secure application design and deployment",
    },
    {
      title: "Cyber-security Essentials",
      subtitle: "Cisco",
      date: "20/12/2023",
      description:
        "Developed a strong understanding of cybersecurity practices to mitigate threats and vulnerabilities in software systems.",
    },
    {
      title: "Introduction to Cyber-security",
      subtitle: "Cisco",
      date: "20/12/2023",
      description:
        "Acquired introductory knowledge of cybersecurity concepts, essential for creating resilient applications.",
    },
    {
      title: "Agile Foundation",
      subtitle: "PMIS",
      date: "20/12/2023",
      description:
        "Developed practical skills for implementing Scrum practices in software development projects.",
    },
    {
      title: "Scrum: The Basics",
      subtitle: "PMIS",
      date: "20/12/2023",
      description:
        "Understood the core principles of Scrum to enhance team collaboration and iterative development.",
    },
    {
      title: "Agile Software Development: Scrum for Developers",
      subtitle: "PMIS",
      date: "20/12/2023",
      description:
        "Deepened expertise in Scrum methodologies, enabling better handling of complex projects and team dynamics.",
    },
    {
      title: "Scrum: Advanced",
      subtitle: "PMIS",
      date: "20/12/2023",
      description:
        "Deepened expertise in Scrum methodologies, enabling better handling of complex projects and team dynamics.",
    },
    {
      title: "Creating API Documentation",
      subtitle: "LinkedIn Learning",
      date: "20/12/2023",
      description:
        "Enhanced skills in crafting clear and effective API documentation to improve developer collaboration and API usability.",
    },
  ];

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % skillCards.length);
  };

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextCard();
    }, 4000); // Scroll every 4 seconds

    return () => clearInterval(interval);
  }, [nextCard, isPaused]);

  // Scroll to current card
  useEffect(() => {
    if (stackRef.current) {
      const cardHeight = stackRef.current.scrollHeight / skillCards.length;
      stackRef.current.scrollTo({
        top: currentCardIndex * cardHeight,
        behavior: "smooth",
      });
    }
  }, [currentCardIndex, skillCards.length]);

  return (
    <TwoColumnSection
      title={"Certifications"}
      rightComponent={
        <KImageBox
          height="540px"
          imageArray={imageArray}
          autoTransition={true}
          transitionInterval={3000}
          imageSx={{
            objectFit: "contain",
          }}
        />
      }
      leftComponent={
        <Box
          sx={{
            position: "relative",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Stack
            ref={stackRef}
            direction={"column"}
            spacing={2}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            sx={{
              alignItems: "stretch",
              maxHeight: "65vh",
              overflowY: "auto",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE and Edge
              "&::-webkit-scrollbar": {
                display: "none", // Chrome, Safari, Opera
              },
              position: "relative",
            }}
          >
            {skillCards.map((card, index) => (
              <SkillCard
                key={index}
                title={card.title}
                subtitle={card.subtitle}
                date={card.date}
                description={card.description}
              />
            ))}
          </Stack>

          {skillCards.length > 1 && (
            <>
              <Box
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {skillCards.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => setCurrentCardIndex(index)}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor:
                        index === currentCardIndex
                          ? "primary.main"
                          : "rgba(0, 0, 0, 0.3)",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor:
                          index === currentCardIndex
                            ? "primary.main"
                            : "rgba(0, 0, 0, 0.6)",
                      },
                    }}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>
      }
    />
  );
};

export default Certifications;
