import { Box, Divider, Stack, Typography } from '@mui/material';

const TwoColumnSection = ({ leftComponent, rightComponent, title }) => {
  return (
    <Box
      sx={{
        height: 'fit-content',
        pb: 10,
      }}
    >
      <Box
        sx={{
          color: 'text.main',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          mb: 10,
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
        direction={'row'}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.main',
          flexDirection: 'row',
        }}
      >
        <Box sx={{ flex: 1 }}>{leftComponent}</Box>
        <Divider
          orientation={'vertical'}
          flexItem
          sx={{
            mx: '3rem',
            backgroundColor: 'primary.lighter',
            borderRadius: 10,
          }}
        />
        <Box sx={{ flex: 1 }}>{rightComponent}</Box>
      </Stack>
    </Box>
  );
};

export default TwoColumnSection;
