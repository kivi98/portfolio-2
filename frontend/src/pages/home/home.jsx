import {
  Box,
  Button,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import test from '../../assets/images/test.png';

const Home = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          gap: 2,
          width: '100%',
        }}
      >
        <Box>
          <img src={test} alt={'test'} style={{ height: 400 }} />
        </Box>
        <Box
          sx={{
            backgroundColor: 'secondary.other',
            height: '2.5rem',
            width: '8rem',
            mt: 1,
            borderRadius: 1,
          }}
        ></Box>
        <Box>
          <Typography
            variant="h1"
            sx={{ color: 'text.main', fontSize: '3rem' }}
          >
            <span>
              Hi there, <br />
              Welcome to my portfolio
            </span>
          </Typography>
          <Divider
            sx={{
              backgroundColor: 'secondary.light',
              width: '50%',
              height: 2,
              my: 2,
              boxShadow: '0px 0px 12px #E30000',
              borderRadius: 10,
            }}
          />
          <Typography variant={'body1'} sx={{ color: 'text.main', mb: 2 }}>
            <span>
              {' '}
              👋 I'm Kivi Amarakoon, a software enthusiast dedicated to crafting
              user-friendly apps, optimizing algorithms, and solving complex
              problems. I'm passionate about continuous learning, exploring new
              technologies, and embracing the digital revolution. Join me in
              building the future, one line of code at a time.
            </span>
            <br />
            <br />
            <span>Let's create, innovate, and inspire together!</span>
          </Typography>
          <Link>
            <Button
              sx={{
                backgroundColor: 'secondary.main',
                color: 'text.light',
                width: '10rem',
                height: '3rem',
                fontWeight: 700,
                '&:hover': {
                  backgroundColor: 'secondary.light',
                },
              }}
            >
              About Me
            </Button>
          </Link>
        </Box>
      </Stack>
    </Container>
  );
};

export default Home;
