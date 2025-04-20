import React, { useRef, useState, useEffect } from 'react';
import { Box, Container, Stack } from '@mui/material';
import WhoAmI from './components/who-am-i.jsx';
import Education from './components/education.jsx';
import Skills from './components/skills.jsx';
import SkillBadges from './components/skill-badges.jsx';
import Certifications from './components/certifications.jsx';
import Volunteering from './components/volunteering.jsx';
import Experience from './components/experience.jsx';
import Navigations from './components/navigations.jsx';

const About = () => {
  const [activeSection, setActiveSection] = useState(1); // Track active section

  // Create refs for each section
  const whoAmIRef = useRef(null);
  const educationRef = useRef(null);
  const skillsRef = useRef(null);
  const skillBadgesRef = useRef(null);
  const certificationsRef = useRef(null);
  const volunteeringRef = useRef(null);
  const experienceRef = useRef(null);

  const sectionRefs = [
    { id: 1, text: 'Who Am I', ref: whoAmIRef, icon: 'PersonIcon' },
    { id: 2, text: 'Education', ref: educationRef, icon: 'SchoolIcon' },
    { id: 3, text: 'Skills', ref: skillsRef, icon: 'CodeIcon' },
    { id: 4, text: 'Skill Badges', ref: skillBadgesRef, icon: 'AppsIcon' },
    {
      id: 5,
      text: 'Certifications',
      ref: certificationsRef,
      icon: 'VerifiedIcon',
    },
    {
      id: 6,
      text: 'Volunteering',
      ref: volunteeringRef,
      icon: 'VolunteerActivismIcon',
    },
    { id: 7, text: 'Experience', ref: experienceRef, icon: 'WorkHistoryIcon' },
  ];

  const scrollToSection = (ref, offset = 0) => {
    if (ref.current) {
      const top =
        ref.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    const offset = 150; // Adjust based on header height
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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: { xs: '100%', md: '65%' },
      }}
    >
      <Stack direction={'row'} sx={{ gap: 2 }}>
        <Box
          sx={{
            display: { xs: 'none', md: 'block', lg: 'block', xl: 'block' },
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            ml: -30,
            p: 0,
            height: 400,
            position: 'sticky',
            top: '9.4rem',
          }}
        >
          <Navigations
            activeSection={activeSection}
            sectionRefs={sectionRefs}
            scrollToSection={scrollToSection}
          />
        </Box>

        <Box>
          {sectionRefs.map(({ id, text, ref }) => (
            <Box key={id} ref={ref}>
              {React.createElement(
                {
                  'Who Am I': WhoAmI,
                  Education: Education,
                  Skills: Skills,
                  'Skill Badges': SkillBadges,
                  Certifications: Certifications,
                  Volunteering: Volunteering,
                  Experience: Experience,
                }[text],
              )}
            </Box>
          ))}
        </Box>
      </Stack>
    </Container>
  );
};

export default About;
