"use client";
import { Grid } from "@mui/material";
import OneColumnSection from "./OneColumnSection";
import SkillCard from "./SkillCard";
import CollapsibleItems from "./CollapsibleItems";
import Reveal from "@/components/Reveal";

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

const Certifications = () => {
  return (
    <OneColumnSection
      title={"Certifications"}
      eyebrow="Credentials"
      sectionBody={
        <CollapsibleItems
          items={skillCards}
          initialCount={6}
          moreLabel={(n) => `Show ${n} more`}
        >
          {(visible) => (
            <Grid container spacing={3}>
              {visible.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} key={card.title}>
                  <Reveal delay={(index % 3) * 0.1} sx={{ height: "100%" }}>
                    <SkillCard
                      title={card.title}
                      subtitle={card.subtitle}
                      date={card.date}
                      description={card.description}
                      zoomInAnimation
                    />
                  </Reveal>
                </Grid>
              ))}
            </Grid>
          )}
        </CollapsibleItems>
      }
    />
  );
};

export default Certifications;
