import { Typography } from "@mui/material";
import SkillCard from "./SkillCard";
import OneColumnSection from "./OneColumnSection";
import TimelineList from "./TimelineList";

const skillCards = [
  {
    title: "Software Engineer",
    subtitle: "ITX360 (Pvt) Ltd | Colombo, Sri Lanka",
    date: "Sept 2025 - Present",
    listDescription: (
      <>
        <li>
          <Typography variant={"caption"} sx={{ p: 0 }}>
            Designed and developed enterprise-grade applications using ASP.NET
            and ASP.NET Core frameworks
          </Typography>
        </li>
        <li>
          <Typography variant={"caption"} sx={{ p: 0 }}>
            System integration projects ensuring seamless data exchange between
            logistics, finance, and ERP systems
          </Typography>
        </li>
        <li>
          <Typography variant={"caption"} sx={{ p: 0 }}>
            Developed and optimized RESTful Web APIs to support internal modules
            and external partner integrations
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
        <li>
          <Typography variant={"caption"} sx={{ p: 0 }}>
            Developed full-stack enterprise applications using .NET Core, React
            TypeScript, and Clean Architecture principles
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
        <li>
          <Typography variant={"caption"} sx={{ p: 0 }}>
            Implemented secure authentication and authorization using industry
            best practices
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
        <li>
          <Typography variant={"caption"} sx={{ p: 0 }}>
            Developed and maintained web applications using .NET Core and React
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
            Participated in Agile ceremonies and contributed to sprint planning
            and retrospectives
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

const Experience = () => {
  return (
    <OneColumnSection
      title={"Professional Experience"}
      eyebrow="Career"
      sectionBody={
        <TimelineList
          activeIndex={0}
          items={skillCards.map((card, index) => (
            <SkillCard
              key={index}
              title={card.title}
              subtitle={card.subtitle}
              date={card.date}
              listDescription={card.listDescription}
            />
          ))}
        />
      }
    />
  );
};

export default Experience;
