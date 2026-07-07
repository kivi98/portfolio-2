import { Stack } from "@mui/material";
import TwoColumnSection from "./TwoColumnSection";
import KImageBox from "./KImageBox";
import SkillCard from "./SkillCard";

const Education = () => {
  const imageArray = [
    {
      id: 1,
      src: "/educations/japura.webp",
      alt: "japura",
    },
    {
      id: 2,
      src: "/educations/ucsc.jpg",
      alt: "ucsc",
    },
  ];
  return (
    <TwoColumnSection
      title={"Education"}
      eyebrow="Learning"
      rightComponent={
        <Stack
          direction={"column"}
          sx={{
            width: "100%",
            gap: 2,
            alignItems: "center",
          }}
        >
          <SkillCard
            date={"2024 - Present"}
            title={"MSc. Computer Science"}
            subtitle={"University of Sri Jayawardenapura"}
            description={"Specialized in Artificial Intelligence"}
          />
          <SkillCard
            date={"2021 - 2024"}
            title={"BSc. Information Systems"}
            subtitle={"University of Colombo School of Computing"}
            description={"Specialized in Software Engineering"}
          />
        </Stack>
      }
      leftComponent={
        <KImageBox
          imageArray={imageArray}
          height="400px"
          autoTransition={true}
          transitionInterval={3000}
          sx={{
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
          }}
        />
      }
    />
  );
};

export default Education;
