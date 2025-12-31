import { Box, Stack, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import SkillCard from "./SkillCard";
import OneColumnSection from "./OneColumnSection";

const Experience = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const stackRef = useRef<HTMLDivElement>(null);

  const skillCards = [
    {
      title: "Software Engineer",
      subtitle: "ITX360 (Pvt) Ltd | Colombo, Sri Lanka",
      date: "Sept 2025 - Present",
      listDescription: (
        <>
          <li style={{ color: "text.dark" }}>
            <Typography variant={"caption"} color={"text.dark"} sx={{ p: 0 }}>
              Designed and developed enterprise-grade applications using ASP.NET
              and ASP.NET Core frameworks
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              System integration projects ensuring seamless data exchange
              between logistics, finance, and ERP systems
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Developed and optimized RESTful Web APIs to support internal
              modules and external partner integrations
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Collaborated with cross-functional teams to deliver scalable
              solutions following Agile practices
            </Typography>
          </li>
        </>
      ),
    },
    {
      title: "Associate Software Engineer",
      subtitle: "ITX360 (Pvt) Ltd | Colombo, Sri Lanka",
      date: "Jun 2024 - Aug 2025",
      listDescription: (
        <>
          <li style={{ color: "text.dark" }}>
            <Typography variant={"caption"} color={"text.dark"} sx={{ p: 0 }}>
              Developed full-stack enterprise applications using .NET Core,
              React TypeScript, and Clean Architecture principles
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Implemented complex authentication systems incorporating
              multi-scheme authentication (Azure AD, .NET Identity)
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Utilized industry-standard frameworks and libraries including
              MediatR, AutoMapper, Entity Framework Core
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Applied Domain-Driven Design patterns and CQRS architecture for
              scalable solutions
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Collaborated with business analysts for requirement gathering and
              solution design
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Developed reusable UI components and forms using React TypeScript
              and Material UI
            </Typography>
          </li>
        </>
      ),
    },
    {
      title: "Software Engineering Intern",
      subtitle: "ITX360 (Pvt) Ltd | Colombo, Sri Lanka",
      date: "Nov 2023 - May 2024",
      listDescription: (
        <>
          <li style={{ color: "text.dark" }}>
            <Typography variant={"caption"} color={"text.dark"} sx={{ p: 0 }}>
              Developed and maintained web applications using .NET Core and
              React
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Collaborated with senior developers to optimize existing projects
              and implement new features
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Achieved 95% bug resolution rate through proactive identification
              and systematic debugging
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Participated in Agile ceremonies and contributed to sprint
              planning and retrospectives
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Gained hands-on experience with enterprise-level development
              practices and tools
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
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              py: "2rem !important",
              position: "relative",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
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
