import { Box, Stack } from "@mui/material";
import TwoColumnSection from "./TwoColumnSection";
import KImageBox from "./KImageBox";
import SkillCard from "./SkillCard";

const Certifications = () => {
  const imageArray = [
    {
      id: 1,
      src: '/certifications/cert-1.jpeg',
      alt: 'cert-1'
    },
    {
      id: 2,
      src: '/certifications/cert-2.png',
      alt: 'cert-1'
    },
    {
      id: 3,
      src: '/certifications/cert-3.png',
      alt: 'cert-1'
    },    {
      id: 4,
      src: '/certifications/cert-4.png',
      alt: 'cert-1'
    },
    {
      id: 5,
      src: '/certifications/cert-5.png',
      alt: 'cert-1'
    },
    {
      id: 6,
      src: '/certifications/cert-6.png',
      alt: 'cert-1'
    },
    {
      id: 7,
      src: '/certifications/cert-7.png',
      alt: 'cert-1'
    }
  ]
  return (
    <TwoColumnSection
      title={"Certifications"}
      rightComponent={
        <KImageBox
        height={{ xs: 300, md: 540 }}
        imageArray={imageArray}
        autoTransition={true}
        transitionInterval={3000}
        />
      }
      leftComponent={

          <Stack
            direction={"column"}
            spacing={2}
            sx={{
              alignItems: "stretch",
              maxHeight: '65vh',
              overflowY: 'auto',
            }}
          >
            <SkillCard
              title={"Azure Fundamentals Certification"}
              subtitle={"Microsoft"}
              date={"20/12/2023"}
              description={
                "Gained foundational knowledge of Azure services, cloud computing principles, and security, enabling effective integration of cloud solutions in projects."
              }
            />
            <SkillCard
              title={"GitHub Foundation Exam"}
              subtitle={"GitHub"}
              date={"20/12/2023"}
              description={
                "Demonstrated proficiency in GitHub tools and workflows, essential for modern version control and collaborative software development."
              }
            />
            <SkillCard
              title={"Postman API Fundamentals Student Expert"}
              subtitle={"Postman"}
              date={"20/12/2023"}
              description={
                "Mastered API testing and documentation with Postman, enhancing API integration and debugging capabilities."
              }
            />
            <SkillCard
              title={"Certified Cyber-Security"}
              subtitle={"ISC2 Certifications"}
              date={"20/12/2023"}
              description={
                "Validated foundational knowledge in cybersecurity concepts, ensuring secure application design and deployment"
              }
            />
            <SkillCard
              title={"Cyber-security Essentials"}
              subtitle={"Cisco"}
              date={"20/12/2023"}
              description={
                "Developed a strong understanding of cybersecurity practices to mitigate threats and vulnerabilities in software systems."
              }
            />
            <SkillCard
              title={"Introduction to Cyber-security"}
              subtitle={"Cisco"}
              date={"20/12/2023"}
              description={
                "Acquired introductory knowledge of cybersecurity concepts, essential for creating resilient applications."
              }
            />
            <SkillCard
              title={"Agile Foundation"}
              subtitle={"PMIS"}
              date={"20/12/2023"}
              description={
                "Developed practical skills for implementing Scrum practices in software development projects."
              }
            />
            <SkillCard
              title={"Scrum: The Basics"}
              subtitle={"PMIS"}
              date={"20/12/2023"}
              description={
                "Understood the core principles of Scrum to enhance team collaboration and iterative development."
              }
            />
            <SkillCard
              title={"Agile Software Development: Scrum for Developers"}
              subtitle={"PMIS"}
              date={"20/12/2023"}
              description={
                "Deepened expertise in Scrum methodologies, enabling better handling of complex projects and team dynamics."
              }
            />
            <SkillCard
              title={"Scrum: Advanced"}
              subtitle={"PMIS"}
              date={"20/12/2023"}
              description={
                "Deepened expertise in Scrum methodologies, enabling better handling of complex projects and team dynamics."
              }
            />
            <SkillCard
              title={"Creating API Documentation"}
              subtitle={"LinkedIn Learning"}
              date={"20/12/2023"}
              description={
                "Enhanced skills in crafting clear and effective API documentation to improve developer collaboration and API usability."
              }
            />
          </Stack>
      }
    />
  );
};

export default Certifications;
