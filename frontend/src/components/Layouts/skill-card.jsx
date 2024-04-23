import { Box, Divider, Stack, Typography } from '@mui/material';

const SkillCard = ({ title, description, date }) => {
  return (
    <Stack
      direction={'column'}
      sx={{
        backgroundColor: 'primary.light2',
        borderRadius: 2,
        p: 1,
        width: '80%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 0.5,
        }}
      >
        {title}
      </Box>
      <Divider
        sx={{
          backgroundColor: 'primary.lighter',
          borderRadius: 10,
        }}
      />
      <Stack
        direction={'row'}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 0.5,
        }}
      >
        <Typography variant={'caption'}>{description}</Typography>
        <Typography variant={'caption'}>{date}</Typography>
      </Stack>
    </Stack>
  );
};

export default SkillCard;
