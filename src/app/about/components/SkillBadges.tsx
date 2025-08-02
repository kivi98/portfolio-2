import { Box } from "@mui/material";
import OneColumnSection from "./OneColumnSection";
import SkillIcon from "./SkillIcon";

const SkillBadges = () => {
  const skillsConfig = [
    { name: "JavaScript", image: "/skills/javascript-original.png" },
    { name: "TypeScript", image: "/skills/typescript-original.png" },
    { name: "React", image: "/skills/react-original-wordmark.png" },
    { name: "HTML5", image: "/skills/html5-original.png" },
    { name: "CSS3", image: "/skills/css3-original.png" },
    { name: "Node.js", image: "/skills/nodejs-plain-wordmark.png" },
    { name: "Express", image: "/skills/express-original.png" },
    { name: "MongoDB", image: "/skills/mongodb-plain-wordmark.png" },
    { name: "PostgreSQL", image: "/skills/postgresql-plain-wordmark.png" },
    { name: "Java", image: "/skills/java-original-wordmark.png" },
    { name: "Spring", image: "/skills/spring-original-wordmark.png" },
    { name: "C#", image: "/skills/csharp-original.png" },
    { name: ".NET Core", image: "/skills/dotnetcore-original.png" },
    { name: "Python", image: "/skills/python-original-wordmark.png" },
    { name: "Vue.js", image: "/skills/vuejs-original-wordmark.png" },
    { name: "Next.js", image: "/skills/nextjs-original-wordmark.png" },
    { name: "Svelte", image: "/skills/svelte-original-wordmark.png" },
    { name: "Git", image: "/skills/git-original-wordmark.png" },
    { name: "GitHub", image: "/skills/github-original-wordmark.png" },
    { name: "MySQL", image: "/skills/mysql-plain-wordmark.png" },
    { name: "Redis", image: "/skills/redis-plain-wordmark.png" },
    { name: "Bootstrap", image: "/skills/bootstrap-original-wordmark.png" },
    { name: "Figma", image: "/skills/figma-original.png" },
    { name: "VS Code", image: "/skills/vscode-original-wordmark.png" },
    { name: "JetBrains", image: "/skills/jetbrains-original.png" },
    { name: "Android Studio", image: "/skills/androidstudio-plain.png" },
    { name: "Linux", image: "/skills/linux-original.png" },
    { name: "Azure", image: "/skills/azure-original-wordmark.png" },
    { name: "Terraform", image: "/skills/terraform-original-wordmark.png" },
    { name: "LaTeX", image: "/skills/latex-original.png" },
    { name: "npm", image: "/skills/npm-original-wordmark.png" },
    { name: "NuGet", image: "/skills/nuget-original-wordmark.png" },
    { name: "Slack", image: "/skills/slack-original-wordmark.png" },
    { name: "Storybook", image: "/skills/storybook-original-wordmark.png" },
  ];

  return (
    <OneColumnSection
      title={"Skill Badges"}
      sectionDescription={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            maxWidth: "100%",
          }}
        >
          {skillsConfig.map((skill, index) => (
            <SkillIcon
              key={index}
              image={skill.image}
              placeholderText={skill.name}
            />
          ))}
        </Box>
      }
    />
  );
};

export default SkillBadges;
