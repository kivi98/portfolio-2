"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Navigation from "./components/Navigation";
import WhoAmI from "./components/WhoAmI";
import Education from "./components/Education";
import Skills from "./components/Skills";
import SkillBadges from "./components/SkillBadges";
import Certifications from "./components/Certifications";
import Volunteering from "./components/Volunteering";
import Experience from "./components/Experience";
import CredlyBadges from "./components/CredlyBadges";

const About = () => {
  const [activeSection, setActiveSection] = useState(1);

  // Create refs for each section
  const whoAmIRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillBadgesRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);
  const credlyBadgesRef = useRef<HTMLDivElement>(null);
  const volunteeringRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

  const sectionRefs = useMemo(
    () => [
      { id: 1, text: "Who Am I", ref: whoAmIRef, icon: "PersonIcon" },
      { id: 2, text: "Education", ref: educationRef, icon: "SchoolIcon" },
      {
        id: 3,
        text: "Certifications",
        ref: certificationsRef,
        icon: "WorkspacePremiumIcon",
      },
      {
        id: 4,
        text: "Credly",
        ref: credlyBadgesRef,
        icon: "CardMembershipIcon",
      },
      { id: 5, text: "Skills", ref: skillsRef, icon: "CodeIcon" },
      { id: 6, text: "Skill Badges", ref: skillBadgesRef, icon: "AppsIcon" },
      {
        id: 7,
        text: "Volunteering",
        ref: volunteeringRef,
        icon: "VolunteerActivismIcon",
      },
      {
        id: 8,
        text: "Experience",
        ref: experienceRef,
        icon: "WorkHistoryIcon",
      },
    ],
    [],
  );

  const scrollToSection = useCallback(
    (ref: React.RefObject<HTMLDivElement | null>, offset = 0) => {
      if (ref.current) {
        const top =
          ref.current.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    [],
  );

  const handleScroll = useCallback(() => {
    const offset = 150;
    sectionRefs.forEach(({ id, ref }) => {
      const sectionTop = ref.current?.getBoundingClientRect().top;
      const sectionHeight = ref.current?.offsetHeight;
      if (sectionTop !== undefined && sectionHeight !== undefined) {
        if (sectionTop <= offset && sectionTop + sectionHeight > offset) {
          setActiveSection(id);
        }
      }
    });
  }, [sectionRefs]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      {/* Navigation positioned absolutely/fixed outside the main container */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "fixed", // Changed to fixed
          top: "9.4rem",
          left: "calc(50% - 32.5% - 280px)", // Position it to the left of the container
          zIndex: 1000,
          width: 200,
          height: "fit-content",
        }}
      >
        <Navigation
          activeSection={activeSection}
          sectionRefs={sectionRefs}
          scrollToSection={scrollToSection}
        />
      </Box>

      {/* Main content container */}
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          width: { xs: "100%", md: "65%" },
          pt: { xs: "90px", md: "110px" }, // Add top padding for fixed header
        }}
      >
        <Box sx={{ width: "100%" }}>
          {sectionRefs.map(({ id, text, ref }) => {
            const ComponentMap: { [key: string]: React.ComponentType } = {
              "Who Am I": WhoAmI,
              Education: Education,
              Skills: Skills,
              "Skill Badges": SkillBadges,
              Certifications: Certifications,
              Credly: CredlyBadges,
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
      </Container>
    </>
  );
};

export default About;
