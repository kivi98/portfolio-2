import { Box } from '@mui/material';

const SkillIcon = ({ image, placeholderText }) => {
  return (
    <Box
      sx={{
        border: '1px solid #8c8c8c',
        p: 2,
        borderRadius: 5,
        backgroundColor: 'primary.light2',
      }}
    >
      <img
        src={image}
        alt={placeholderText}
        style={{ height: '5rem', width: '5rem' }}
      />
    </Box>
  );
};

export default SkillIcon;
