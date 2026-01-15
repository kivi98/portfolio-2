"use client";
import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import TwoColumnSection from "./TwoColumnSection";
import SkillChip from "./SkillChip";
import {
  languageSkills,
  webSkills,
  databaseSkills,
  cloudSkills,
  toolSkills,
  osSkills,
  frameworkSkills,
} from "@/features/skills.config";

const Skills = () => {
  const theme = useTheme();

  const skillCategories = [
    { title: "Programming Languages", skills: languageSkills, icon: "💻" },
    { title: "Web Development", skills: webSkills, icon: "🌐" },
    { title: "Databases", skills: databaseSkills, icon: "🗄️" },
    { title: "Cloud", skills: cloudSkills, icon: "☁️" },
    { title: "Tools", skills: toolSkills, icon: "🛠️" },
    { title: "Operating Systems", skills: osSkills, icon: "💾" },
    { title: "Frameworks", skills: frameworkSkills, icon: "⚡" },
  ];

  return (
    <TwoColumnSection
      title={"Skills"}
      leftComponent={
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={3}>
            {skillCategories.slice(0, 4).map((category, index) => (
              <Grid item xs={12} md={6} sx={{ width: "100%" }} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "1.5rem",
                    background: theme.palette.mode === "dark"
                      ? `linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 100%)`
                      : theme.palette.background.paper, // White in light mode
                    border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
                    boxShadow: theme.palette.mode === "dark"
                      ? "none"
                      : "0 2px 8px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: theme.palette.mode === "dark"
                        ? "0 8px 25px rgba(227,0,0,0.2)"
                        : "0 8px 25px rgba(0,0,0,0.12)",
                      borderColor: theme.palette.secondary.main,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        mr: 1,
                        fontSize: "1.5rem",
                      }}
                    >
                      {category.icon}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "text.main",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                      }}
                    >
                      {category.title}
                    </Typography>
                  </Box>
                  <SkillChip itemList={category.skills} skillType="" />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      }
      rightComponent={
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={3}>
            {skillCategories.slice(4).map((category, index) => (
              <Grid item xs={12} md={6} sx={{ width: "100%" }} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "1.5rem",
                    background: theme.palette.mode === "dark"
                      ? `linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 100%)`
                      : theme.palette.background.paper, // White in light mode
                    border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
                    boxShadow: theme.palette.mode === "dark"
                      ? "none"
                      : "0 2px 8px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: theme.palette.mode === "dark"
                        ? "0 8px 25px rgba(227,0,0,0.2)"
                        : "0 8px 25px rgba(0,0,0,0.12)",
                      borderColor: theme.palette.secondary.main,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        mr: 1,
                        fontSize: "1.5rem",
                      }}
                    >
                      {category.icon}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "text.main",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                      }}
                    >
                      {category.title}
                    </Typography>
                  </Box>
                  <SkillChip itemList={category.skills} skillType="" />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      }
    />
  );
};

export default Skills;
