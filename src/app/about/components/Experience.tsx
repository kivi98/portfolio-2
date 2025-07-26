import { Box, Stack, Typography } from "@mui/material";
import SkillCard from "./SkillCard";
import OneColumnSection from "./OneColumnSection";

const Experience = () => {
  return (
    <OneColumnSection
      title={"Professional Experience"}
      sectionDescription={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "60vh",
          }}
        >
          <Stack
            sx={{
              gap: 2,
              width: "100%",
              alignItems: "center",
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              py: "2rem !important",
            }}
          >
            <SkillCard
              title={"Associate Software Engineer"}
              subtitle={"ITX360 (Pvt) Ltd | Colombo, Sri Lanka"}
              date={"2023 - Present"}
              listDescription={
                <>
                  <li style={{ color: "text.dark" }}>
                    <Typography
                      variant={"caption"}
                      color={"text.dark"}
                      sx={{ p: 0 }}
                    >
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
                      Collaborated with business analysts for requirement
                      gathering
                    </Typography>
                  </li>
                  <li>
                    <Typography variant={"caption"} sx={{ p: 0 }}>
                      Developed multiple forms and modules using React
                      Typescript
                    </Typography>
                  </li>
                  <li>
                    <Typography variant={"caption"} sx={{ p: 0 }}>
                      Implemented authentication and session management using
                      .net Identity
                    </Typography>
                  </li>
                </>
              }
            />
            <SkillCard
              title={"Software Engineering - Intern"}
              subtitle={"ITX360 (Pvt) Ltd | Colombo, Sri Lanka"}
              date={"2023 - 2024"}
              listDescription={
                <>
                  <li style={{ color: "text.dark" }}>
                    <Typography
                      variant={"caption"}
                      color={"text.dark"}
                      sx={{ p: 0 }}
                    >
                      Actively engaged with the development of two web
                      applications using .NET
                    </Typography>
                  </li>
                  <li>
                    <Typography variant={"caption"} sx={{ p: 0 }}>
                      Work collaboratively with senior developers to optimize
                      the existing project.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant={"caption"} sx={{ p: 0 }}>
                      Proactively identified and resolved bugs, contributing to
                      a 95% bug resolution rate.
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
              }
            />
          </Stack>
        </Box>
      }
    />
  );
};

export default Experience;
