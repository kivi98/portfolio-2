"use client";

import React, { useRef, useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Navigation from "./components/Navigation";
import WhoAmI from "./components/WhoAmI";
import Education from "./components/Education";
import Skills from "./components/Skills";
import SkillBadges from "./components/SkillBadges";
import Certifications from "./components/Certifications";
import Volunteering from "./components/Volunteering";
import Experience from "./components/Experience";

const About = () => {
  const [activeSection, setActiveSection] = useState(1);

  // Create refs for each section
  const whoAmIRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillBadgesRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);
  const volunteeringRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

  const sectionRefs = [
    { id: 1, text: "Who Am I", ref: whoAmIRef, icon: "PersonIcon" },
    { id: 2, text: "Education", ref: educationRef, icon: "SchoolIcon" },
    { id: 3, text: "Skills", ref: skillsRef, icon: "CodeIcon" },
    { id: 4, text: "Skill Badges", ref: skillBadgesRef, icon: "AppsIcon" },
    {
      id: 5,
      text: "Certifications",
      ref: certificationsRef,
      icon: "VerifiedIcon",
    },
    {
      id: 6,
      text: "Volunteering",
      ref: volunteeringRef,
      icon: "VolunteerActivismIcon",
    },
    { id: 7, text: "Experience", ref: experienceRef, icon: "WorkHistoryIcon" },
  ];

  const scrollToSection = (
    ref: React.RefObject<HTMLDivElement | null>,
    offset = 0
  ) => {
    if (ref.current) {
      const top =
        ref.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    const offset = 150;
    sectionRefs.forEach(({ id, ref }) => {
      const sectionTop = ref.current?.getBoundingClientRect().top;
      const sectionHeight = ref.current?.offsetHeight;
      if (sectionTop && sectionHeight) {
        if (sectionTop <= offset && sectionTop + sectionHeight > offset) {
          setActiveSection(id);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: { xs: "100%", md: "65%" },
      }}
    >
      <Stack direction={"row"} sx={{ gap: 2 }}>
        <Box
          sx={{
            display: { xs: "none", md: "block", lg: "block", xl: "block" },
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            ml: -30,
            p: 0,
            height: 400,
            position: "sticky",
            top: "9.4rem",
          }}
        >
          <Navigation
            activeSection={activeSection}
            sectionRefs={sectionRefs}
            scrollToSection={scrollToSection}
          />
        </Box>

        <Box>
          {sectionRefs.map(({ id, text, ref }) => {
            const ComponentMap: { [key: string]: React.ComponentType } = {
              "Who Am I": WhoAmI,
              Education: Education,
              Skills: Skills,
              "Skill Badges": SkillBadges,
              Certifications: Certifications,
              Volunteering: Volunteering,
              Experience: Experience,
            };
            const Component = ComponentMap[text];
            return (
              <Box key={id} ref={ref}>
                {Component && <Component />}
              </Box>
            );
          })}
        </Box>
      </Stack>
    </Container>
  );
};

export default About;
