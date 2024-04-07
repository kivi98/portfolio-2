import { Box, Container, Stack } from '@mui/material';
import test from '../../assets/images/test.png';

const Home = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '150vh',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          p: 2,
          gap: 2,
        }}
      >
        <Box>
          <img src={test} alt={'test'} style={{ height: 400 }} />
        </Box>
        <Box>
          <img src={test} alt={'test'} style={{ height: 400 }} />
        </Box>
      </Stack>
    </Container>
  );
};

export default Home;
