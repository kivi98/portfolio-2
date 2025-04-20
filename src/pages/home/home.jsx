import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Link } from 'react-router-dom';
import AvatarCard from './avatar-card';

const Home = () => {
  return (
    <Container>
      <Box
        sx={{
          height: { xs: '100%', md: 'calc(100vh - 220px)' },
        }}
      >
        <Grid
          container
          sx={{
            width: '100%',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                mt: { xs: '1rem', md: '0rem' },
                mb: { xs: '1.5rem', md: '0rem' },
              }}
            >
              <AvatarCard />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
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
                  crafting user-friendly apps, optimizing algorithms, and
                  solving complex problems. I'm passionate about continuous
                  learning, exploring new technologies, and embracing the
                  digital revolution. Join me in building the future, one line
                  of code at a time.
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
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
