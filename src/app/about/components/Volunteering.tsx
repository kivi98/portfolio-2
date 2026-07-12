import { Grid, Typography } from "@mui/material";
import OneColumnSection from "./OneColumnSection";
import KImageBox from "./KImageBox";
import SkillCard from "./SkillCard";
import Reveal from "@/components/Reveal";

const imageArray = [
  {
    id: 1,
    src: "/volunteering/vol-1.jpg",
    alt: "volunteering-1",
  },
  {
    id: 2,
    src: "/volunteering/vol-2.jpg",
    alt: "volunteering-2",
  },
  {
    id: 3,
    src: "/volunteering/vol-3.jpg",
    alt: "volunteering-3",
  },
  {
    id: 4,
    src: "/volunteering/vol-4.jpg",
    alt: "volunteering-4",
  },
  {
    id: 5,
    src: "/volunteering/vol-5.jpg",
    alt: "volunteering-5",
  },
  {
    id: 6,
    src: "/volunteering/vol-6.jpg",
    alt: "volunteering-6",
  },
  {
    id: 7,
    src: "/volunteering/vol-7.jpg",
    alt: "volunteering-7",
  },
  {
    id: 8,
    src: "/volunteering/vol-8.jpeg",
    alt: "volunteering-8",
  },
  {
    id: 9,
    src: "/volunteering/vol-9.jpeg",
    alt: "volunteering-9",
  },
  {
    id: 10,
    src: "/volunteering/vol-10.jpeg",
    alt: "volunteering-10",
  },
  {
    id: 11,
    src: "/volunteering/vol-11.jpg",
    alt: "volunteering-11",
  },
  {
    id: 12,
    src: "/volunteering/vol-12.jpg",
    alt: "volunteering-12",
  },
  {
    id: 13,
    src: "/volunteering/vol-13.jpg",
    alt: "volunteering-14",
  },
];

const skillCards = [
  {
    title: "IEEE Innovation Nation Sri Lanka 2023",
    subtitle: "Vice Chairperson",
    date: "2023 - 2024",
    listDescription: (
      <>
        <li>
          <Typography variant={"caption"} sx={{ p: 0 }}>
            Vice Chairperson (2023 - Present): Appointed as Vice Chairperson,
            leading strategic vision, program development, and mentoring to
            advance the mission of IEEE Innovation Nation Sri Lanka.
          </Typography>
        </li>
        <li>
          <Typography variant={"caption"} sx={{ p: 0 }}>
            Finance Member (2022 - 2023): Managed finances at the national
            level, ensuring the success of key programs and initiatives.
          </Typography>
        </li>
      </>
    ),
  },
  {
    title: "IEEE Student branch - UCSC",
    subtitle: "Vice Chairperson",
    date: "2023 - 2024",
    listDescription: (
      <>
        <li>
          <Typography variant={"caption"} sx={{ p: 0 }}>
            Vice Chairperson (2023 - Present): Elected as Vice Chairperson,
            providing strategic leadership and representing member interests,
            demonstrating trust and leadership prowess.
          </Typography>
        </li>
        <li>
          <Typography variant={"caption"} sx={{ p: 0 }}>
            Program Team Director (2022): Led event planning and execution,
            refining organizational and leadership capabilities.
          </Typography>
        </li>
        <li>
          <Typography variant={"caption"} sx={{ p: 0 }}>
            Member (2021 - 2022): Actively engaged in branch activities and
            event organization, fostering a vibrant community of learners.
          </Typography>
        </li>
      </>
    ),
  },
  {
    title: "Charter Rotaract Club - UCSC",
    subtitle: "Co-Director, Community Service",
    date: "2022 - 2023",
    listDescription: (
      <li>
        <Typography variant={"caption"} sx={{ p: 0 }}>
          As the Community Services Director of the Charter Rotaract Club at the
          University of Colombo School of Computing, I played a pivotal role in
          advancing the club&apos;s mission to serve the community and make a
          positive impact.
        </Typography>
      </li>
    ),
  },
  {
    title: "Pahasara - Official Media Unit - UCSC",
    subtitle: "Executives Committee Member",
    date: "2022 - 2023",
    listDescription: (
      <li>
        <Typography variant={"caption"} sx={{ p: 0 }}>
          Serving as an Executive Committee Member for the &quot;Pahasara&quot;
          Official Media Unit at the University of Colombo School of Computing,
          I played a vital role in the organization&apos;s mission to capture
          and disseminate the essence of campus life and events.
        </Typography>
      </li>
    ),
  },
  {
    title: "Student Union - UCSC",
    subtitle: "Union Committee Member/Batch Representative",
    date: "2021 - 2022",
    listDescription: (
      <li>
        <Typography variant={"caption"} sx={{ p: 0 }}>
          Acted as an active member and batch representative within the student
          union, advocating for the interests and concerns of my peers,
          organizing events, and fostering a sense of community within the
          batch.
        </Typography>
      </li>
    ),
  },
];

const Volunteering = () => {
  return (
    <OneColumnSection
      title={"Volunteering"}
      eyebrow="Community"
      sectionDescription={
        <Reveal sx={{ width: "100%" }}>
          <KImageBox
            height="400px"
            imageArray={imageArray}
            autoTransition={true}
            transitionInterval={3000}
            sx={{
              borderRadius: "3px",
              overflow: "hidden",
              border: "1px solid",
              borderColor: "divider",
            }}
            imageSx={{
              objectFit: "cover",
            }}
          />
        </Reveal>
      }
      sectionBody={
        <Grid container spacing={3}>
          {skillCards.map((card, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Reveal delay={(index % 2) * 0.1} sx={{ height: "100%" }}>
                <SkillCard
                  title={card.title}
                  subtitle={card.subtitle}
                  date={card.date}
                  listDescription={card.listDescription}
                  zoomInAnimation
                />
              </Reveal>
            </Grid>
          ))}
        </Grid>
      }
    />
  );
};

export default Volunteering;
