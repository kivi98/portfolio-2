import { Stack, Typography, Box } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import TwoColumnSection from "./TwoColumnSection";
import KImageBox from "./KImageBox";
import SkillCard from "./SkillCard";

const Volunteering = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const stackRef = useRef<HTMLDivElement>(null);

  const imageArray = [
    {
      id: 1,
      src: "/volunteering/vol-1.jpg",
      alt: "volunteering-1",
    },
    {
      id: 2,
      src: "/volunteering/vol-2.jpg",
      alt: "volunteering-2",
    },
    {
      id: 3,
      src: "/volunteering/vol-3.jpg",
      alt: "volunteering-3",
    },
    {
      id: 4,
      src: "/volunteering/vol-4.jpg",
      alt: "volunteering-4",
    },
    {
      id: 5,
      src: "/volunteering/vol-5.jpg",
      alt: "volunteering-5",
    },
    {
      id: 6,
      src: "/volunteering/vol-6.jpg",
      alt: "volunteering-6",
    },
    {
      id: 7,
      src: "/volunteering/vol-7.jpg",
      alt: "volunteering-7",
    },
    {
      id: 8,
      src: "/volunteering/vol-8.jpeg",
      alt: "volunteering-8",
    },
    {
      id: 9,
      src: "/volunteering/vol-9.jpeg",
      alt: "volunteering-9",
    },
    {
      id: 10,
      src: "/volunteering/vol-10.jpeg",
      alt: "volunteering-10",
    },
    {
      id: 11,
      src: "/volunteering/vol-11.jpg",
      alt: "volunteering-11",
    },
    {
      id: 12,
      src: "/volunteering/vol-12.jpg",
      alt: "volunteering-12",
    },
    {
      id: 13,
      src: "/volunteering/vol-13.jpg",
      alt: "volunteering-14",
    },
  ];

  const skillCards = [
    {
      title: "IEEE Innovation Nation Sri Lanka 2023",
      subtitle: "Vice Chairperson",
      date: "2023 - 2024",
      listDescription: (
        <>
          <li style={{ color: "text.dark" }}>
            <Typography variant={"caption"} color={"text.dark"} sx={{ p: 0 }}>
              Vice Chairperson (2023 - Present): Appointed as Vice Chairperson,
              leading strategic vision, program development, and mentoring to
              advance the mission of IEEE Innovation Nation Sri Lanka.
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Finance Member (2022 - 2023): Managed finances at the national
              level, ensuring the success of key programs and initiatives.
            </Typography>
          </li>
        </>
      ),
    },
    {
      title: "IEEE Student branch - UCSC",
      subtitle: "Vice Chairperson",
      date: "2023 - 2024",
      listDescription: (
        <>
          <li style={{ color: "text.dark" }}>
            <Typography variant={"caption"} color={"text.dark"} sx={{ p: 0 }}>
              Vice Chairperson (2023 - Present): Elected as Vice Chairperson,
              providing strategic leadership and representing member interests,
              demonstrating trust and leadership prowess.
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Program Team Director (2022): Led event planning and execution,
              refining organizational and leadership capabilities.
            </Typography>
          </li>
          <li>
            <Typography variant={"caption"} sx={{ p: 0 }}>
              Member (2021 - 2022): Actively engaged in branch activities and
              event organization, fostering a vibrant community of learners.
            </Typography>
          </li>
        </>
      ),
    },
    {
      title: "Charter Rotaract Club - UCSC",
      subtitle: "Co-Director, Community Service",
      date: "2022 - 2023",
      listDescription: (
        <li style={{ color: "text.dark" }}>
          <Typography variant={"caption"} color={"text.dark"} sx={{ p: 0 }}>
            As the Community Services Director of the Charter Rotaract Club at
            the University of Colombo School of Computing, I played a pivotal
            role in advancing the club&apos;s mission to serve the community and
            make a positive impact.
          </Typography>
        </li>
      ),
    },
    {
      title: "Pahasara - Official Media Unit - UCSC",
      subtitle: "Executives Committee Member",
      date: "2022 - 2023",
      listDescription: (
        <li style={{ color: "text.dark" }}>
          <Typography variant={"caption"} color={"text.dark"} sx={{ p: 0 }}>
            Serving as an Executive Committee Member for the &quot;Pahasara&quot;
            Official Media Unit at the University of Colombo School of
            Computing, I played a vital role in the organization&apos;s mission
            to capture and disseminate the essence of campus life and events.
          </Typography>
        </li>
      ),
    },
    {
      title: "Student Union - UCSC",
      subtitle: "Union Committee Member/Batch Representative",
      date: "2021 - 2022",
      listDescription: (
        <li style={{ color: "text.dark" }}>
          <Typography variant={"caption"} color={"text.dark"} sx={{ p: 0 }}>
            Acted as an active member and batch representative within the
            student union, advocating for the interests and concerns of my
            peers, organizing events, and fostering a sense of community within
            the batch.
          </Typography>
        </li>
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
    <TwoColumnSection
      title={"Volunteering"}
      rightComponent={
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
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
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
                listDescription={card.listDescription}
              />
            ))}
          </Stack>

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
        </Box>
      }
      leftComponent={
        <KImageBox
          height="540px"
          imageArray={imageArray}
          autoTransition={true}
          transitionInterval={3000}
          imageSx={{
            objectFit: "cover",
          }}
        />
      }
    />
  );
};

export default Volunteering;
