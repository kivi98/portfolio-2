import SkillCard from '../../../components/common/skill-card.jsx';
import KImageBox from '../../../components/common/imageBox-standard.jsx';
import aboutImage from '../../../assets/images/about-me.png';
import TwoColumnSection from '../../../components/common/section-body-type-2.jsx';
import { Stack, Typography, Box } from '@mui/material';

const Volunteering = () => {
  return (
    <TwoColumnSection
      title={'Volunteering'}
      rightComponent={
        <Box
          sx={{
            width: '100%',
            height: '55vh',
            position: 'relative',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          <Stack
            direction={'column'}
            spacing={2}
            sx={{
              paddingTop: 2,
              width: 'calc(100% - 20px)',

            }}
          >
            <SkillCard
              title={'IEEE Innovation Nation Sri Lanka 2023'}
              subtitle={'Vice Chairperson'}
              date={'2023 - 2024'}
              listDescription={
                <>
                  <li style={{ color: 'text.dark' }}>
                    <Typography
                      variant={'caption'}
                      color={'text.dark'}
                      sx={{ p: 0 }}
                    >
                      Vice Chairperson (2023 - Present): Appointed as Vice
                      Chairperson, leading strategic vision, program
                      development, and mentoring to advance the mission of IEEE
                      Innovation Nation Sri Lanka.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant={'caption'} sx={{ p: 0 }}>
                      Finance Member (2022 - 2023): Managed finances at the
                      national level, ensuring the success of key programs and
                      initiatives.
                    </Typography>
                  </li>
                </>
              }
            />
            <SkillCard
              title={'IEEE Student branch - UCSC'}
              subtitle={'Vice Chairperson'}
              date={'2023 - 2024'}
              listDescription={
                <>
                  <li style={{ color: 'text.dark' }}>
                    <Typography
                      variant={'caption'}
                      color={'text.dark'}
                      sx={{ p: 0 }}
                    >
                      Vice Chairperson (2023 - Present): Elected as Vice
                      Chairperson, providing strategic leadership and
                      representing member interests, demonstrating trust and
                      leadership prowess.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant={'caption'} sx={{ p: 0 }}>
                      Program Team Director (2022): Led event planning and
                      execution, refining organizational and leadership
                      capabilities.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant={'caption'} sx={{ p: 0 }}>
                      Member (2021 - 2022): Actively engaged in branch
                      activities and event organization, fostering a vibrant
                      community of learners.
                    </Typography>
                  </li>
                </>
              }
            />
            <SkillCard
              title={'Charter Rotaract Club - UCSC'}
              subtitle={'Co-Director, Community Service'}
              date={'2022 - 2023'}
              listDescription={
                <li style={{ color: 'text.dark' }}>
                  <Typography
                    variant={'caption'}
                    color={'text.dark'}
                    sx={{ p: 0 }}
                  >
                    As the Community Services Director of the Charter Rotaract
                    Club at the University of Colombo School of Computing, I
                    played a pivotal role in advancing the club's mission to
                    serve the community and make a positive impact.
                  </Typography>
                </li>
              }
            />
            <SkillCard
              title={'"Phasara" - Official Media Unit - UCSC'}
              subtitle={'Executives Committee Member'}
              date={'2022 - 2023'}
              listDescription={
                <li style={{ color: 'text.dark' }}>
                  <Typography
                    variant={'caption'}
                    color={'text.dark'}
                    sx={{ p: 0 }}
                  >
                    Serving as an Executive Committee Member for the "Phasara"
                    Official Media Unit at the University of Colombo School of
                    Computing, I played a vital role in the organization's
                    mission to capture and disseminate the essence of campus
                    life and events.
                  </Typography>
                </li>
              }
            />
            <SkillCard
              title={'Student Union - UCSC'}
              subtitle={'Union Committee Member/Batch Representative'}
              date={'2021 - 2022'}
              listDescription={
                <li style={{ color: 'text.dark' }}>
                  <Typography
                    variant={'caption'}
                    color={'text.dark'}
                    sx={{ p: 0 }}
                  >
                    Acted as an active member and batch representative within
                    the student union, advocating for the interests and concerns
                    of my peers, organizing events, and fostering a sense of
                    community within the batch.
                  </Typography>
                </li>
              }
            />
          </Stack>
        </Box>
      }
      leftComponent={
        <KImageBox
          src={aboutImage}
          alt={'body-image'}
          // height={{ xs: 300, md: 400 }}
          // width={{ xs: 350, md: 450 }}
        />
      }
    />
  );
};

export default Volunteering;
