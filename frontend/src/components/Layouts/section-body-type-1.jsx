import { Box, Divider, Stack, Typography } from '@mui/material';

const OneColumnSection = ({ sectionDescription, sectionBody, title }) => {
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
      <Box
        direction={'column'}
        sx={{
          display: 'flex',
          color: 'text.main',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Stack direction={'column'} sx={{ width: '100%' }}>
          <Box
            sx={{
              mb: 5,
              display: 'flex',
              width: '100%',
            }}
          >
            {sectionDescription}
          </Box>
          <Box>{sectionBody}</Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default OneColumnSection;
