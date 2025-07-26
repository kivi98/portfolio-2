import {
  Box,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import React from "react";

import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";
import AppsIcon from "@mui/icons-material/Apps";
import VerifiedIcon from "@mui/icons-material/Verified";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

interface SectionRef {
  id: number;
  text: string;
  ref: React.RefObject<HTMLDivElement | null>;
  icon: string;
}

interface NavigationButtonProps {
  text: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

const NavigationButton = ({
  text,
  icon,
  isActive,
  onClick,
}: NavigationButtonProps) => {
  return (
    <ListItem
      component={"button"}
      onClick={onClick}
      sx={{
        color: isActive ? "white" : "text.dark",
        backgroundColor: isActive ? "secondary.main" : "primary.main",
        cursor: "pointer",
        mx: 0,
        py: "0.2rem",
        width: "100%",
        mb: "0.2rem",
        borderRadius: 2,
        border: "solid 1px transparent",
        "&:hover": {
          backgroundColor: isActive ? "secondary.main" : "transparentLevels.3",
        },
      }}
    >
      <ListItemIcon>
        <Box
          sx={{
            color: isActive ? "white" : "text.dark",
            display: "flex",
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            p: 0,
            m: 0,
          }}
        >
          {icon === "PersonIcon" && <PersonIcon />}
          {icon === "SchoolIcon" && <SchoolIcon />}
          {icon === "CodeIcon" && <CodeIcon />}
          {icon === "AppsIcon" && <AppsIcon />}
          {icon === "VerifiedIcon" && <VerifiedIcon />}
          {icon === "VolunteerActivismIcon" && <VolunteerActivismIcon />}
          {icon === "WorkHistoryIcon" && <WorkHistoryIcon />}
        </Box>
      </ListItemIcon>
      <ListItemText primary={text} />
      <ListItemIcon>
        <Box
          sx={{
            color: isActive ? "white" : "text.dark",
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            p: 0,
            m: 0,
          }}
        >
          <KeyboardArrowRightIcon />
        </Box>
      </ListItemIcon>
    </ListItem>
  );
};

interface NavigationProps {
  sectionRefs: SectionRef[];
  activeSection: number;
  scrollToSection: (
    ref: React.RefObject<HTMLDivElement | null>,
    offset?: number
  ) => void;
}

export const Navigation = ({
  sectionRefs,
  activeSection,
  scrollToSection,
}: NavigationProps) => {
  return (
    <Card
      sx={{
        p: 2,
        minWidth: 280,
        backgroundColor: "transparent",
        display: { xs: "none", md: "block" },
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 2,
        boxShadow: "none",
      }}
    >
      <List>
        {sectionRefs.map(({ id, text, ref, icon }) => (
          <NavigationButton
            key={id}
            text={text}
            icon={icon}
            isActive={activeSection === id}
            onClick={() => scrollToSection(ref, 145)}
          />
        ))}
      </List>
    </Card>
  );
};

export default Navigation;
