import { Box, Divider, Typography } from '@mui/material';

const SectionTitle = ({ title }) => {
  return (
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
  );
};

export default SectionTitle;
