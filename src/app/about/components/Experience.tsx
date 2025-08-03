import { Box, Stack, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import SkillCard from "./SkillCard";
import OneColumnSection from "./OneColumnSection";

const Experience = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const stackRef = useRef<HTMLDivElement>(null);

  const skillCards = [
    {
      title: "Associate Software Engineer",
      subtitle: "ITX360 (Pvt) Ltd | Colombo, Sri Lanka",
      date: "2023 - Present",
      listDescription: (
        <>
          <li style={{ color: "text.dark" }}>
            <Typography variant={"caption"} color={"text.dark"} sx={{ p: 0 }}>
              Full-Stack web development
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Back-end development using DDD and Clean Architecture
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Collaborated with business analysts for requirement gathering
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Developed multiple forms and modules using React Typescript
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Implemented authentication and session management using .net
              Identity
            </Typography>
          </li>
        </>
      ),
    },
    {
      title: "Software Engineering - Intern",
      subtitle: "ITX360 (Pvt) Ltd | Colombo, Sri Lanka",
      date: "2023 - 2024",
      listDescription: (
        <>
          <li style={{ color: "text.dark" }}>
            <Typography variant={"caption"} color={"text.dark"} sx={{ p: 0 }}>
              Actively engaged with the development of two web applications
              using .NET
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Work collaboratively with senior developers to optimize the
              existing project.
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Proactively identified and resolved bugs, contributing to a 95%
              bug resolution rate.
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Gained proficiency in Agile development methodologies and
              participated in daily scrum meetings.
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Technologies practiced: .Net, C#, React, Postgres
            </Typography>
          </li>
        </>
      ),
    },
  ];

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % skillCards.length);
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextCard();
    }, 4000); // Scroll every 4 seconds

    return () => clearInterval(interval);
  }, [nextCard]);

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
    <OneColumnSection
      title={"Professional Experience"}
      sectionDescription={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "65vh",
            position: "relative",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Stack
            ref={stackRef}
            sx={{
              gap: 2,
              width: "100%",
              alignItems: "center",
              overflowY: "auto",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE and Edge
              "&::-webkit-scrollbar": {
                display: "none", // Chrome, Safari, Opera
              },
              py: "2rem !important",
              position: "relative",
            }}
          >
            {skillCards.map((card, index) => (
              <SkillCard
                key={index}
                title={card.title}
                subtitle={card.subtitle}
                date={card.date}
                listDescription={card.listDescription}
              />
            ))}
          </Stack>

          {skillCards.length > 1 && (
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
          )}
        </Box>
      }
    />
  );
};

export default Experience;
