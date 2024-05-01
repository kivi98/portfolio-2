import { Box, Divider, Stack, Typography } from '@mui/material';

const TwoColumnSection = ({ leftComponent, rightComponent, title }) => {
  return (
    <Box
      sx={{
        mt: { xs: 3, md: 0 },
        height: 'fit-content',
        pb: { xs: 3, md: 10 },
      }}
    >
      <Box
        sx={{
          color: 'text.main',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          mb: { xs: 0, md: 10 },
        }}
      >
        <Typography variant="h1">{title}</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
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
        </Box>
      </Box>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.main',
          flexDirection: 'row',
        }}
      >
        <Box
          sx={{
            flex: 1,
            mb: { xs: 3, md: 0 },
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {leftComponent}
        </Box>
        <Divider
          orientation={'vertical'}
          flexItem
          sx={{
            mx: '3rem',
            backgroundColor: 'transparentLevelsWhite.2',
            borderRadius: 10,
            display: { xs: 'hidden', md: 'block' },
          }}
        />
        <Box
          sx={{
            flex: 1,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {rightComponent}
        </Box>
      </Stack>
    </Box>
  );
};

export default TwoColumnSection;
