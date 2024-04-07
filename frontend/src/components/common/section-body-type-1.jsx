import { Box, Divider, Stack } from '@mui/material';

const TwoColumnSection = ({ leftComponent, rightComponent }) => {
  return (
    <Stack
      direction={'row'}
      sx={{
        display: 'flex',
        alignItems: 'center',
        color: 'text.main',
        flexDirection: 'row',
        pb: 10,
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
  );
};

export default TwoColumnSection;
