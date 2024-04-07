import { Box, Stack } from '@mui/material';

const OneColumnSection = ({ sectionDescription, sectionBody }) => {
  return (
    <Box
      direction={'column'}
      sx={{
        display: 'flex',
        alignItems: 'center',
        color: 'text.main',
        pb: 10,
      }}
    >
      <Stack direction={'column'}>
        <Box
          sx={{
            mb: 5,
          }}
        >
          {sectionDescription}
        </Box>
        <Box>{sectionBody}</Box>
      </Stack>
    </Box>
  );
};

export default OneColumnSection;
