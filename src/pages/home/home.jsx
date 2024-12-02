import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import test from '../../assets/images/test.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <Box
        sx={{
          height: { xs: '100%', md: 'calc(100vh - 220px)' },
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{
            gap: 2,
            width: '100%',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box // landing page image
            component={'img'}
            src={test}
            alt={'testImage'}
            sx={{
              height: { xs: 350, md: 'calc(100vh - 450px)' },
              width: 'auto',
              mt: 0,
              objectFit: 'cover',
              borderRadius: 2,
              mb: { xs: 2, md: 0 },
            }}
          />
          <Box
            sx={{
              backgroundColor: 'secondary.other',
              height: '50px',
              width: '50px',
              mt: 1,
              borderRadius: 1,
              display: { xs: 'none', md: 'block' },
            }}
          />
          <Box>
            <Typography
              variant="h1"
              sx={{
                color: 'text.main',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              }}
            >
              <span>
                Hi there, <br />
                Welcome to my portfolio
              </span>
            </Typography>
            <Divider
              sx={{
                backgroundColor: 'secondary.light',
                width: { xs: '100%', md: '50%' },
                height: 2,
                my: 2,
                boxShadow: '0px 0px 12px #E30000',
                borderRadius: 10,
              }}
            />
            <Typography variant={'body1'} sx={{ color: 'text.main', mb: 2 }}>
              <span>
                {' '}
                👋 I'm Kivi Amarakoon, a software enthusiast dedicated to
                crafting user-friendly apps, optimizing algorithms, and solving
                complex problems. I'm passionate about continuous learning,
                exploring new technologies, and embracing the digital
                revolution. Join me in building the future, one line of code at
                a time.
              </span>
              <br />
              <br />
              <span>Let's create, innovate, and inspire together!</span>
            </Typography>
            <Link to="/about-me">
              <Button
                sx={{
                  backgroundColor: 'secondary.main',
                  color: 'text.light',
                  width: { xs: '100%', md: '10rem' },
                  height: { xs: '2.5rem', md: '3rem' },
                  fontWeight: 700,
                  '&:hover': {
                    backgroundColor: 'secondary.light',
                  },
                }}
                endIcon={<DoubleArrowIcon />}
              >
                About Me
              </Button>
            </Link>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default Home;
