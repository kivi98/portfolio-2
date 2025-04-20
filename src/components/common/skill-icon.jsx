import { Box, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

const SkillIcon = ({ image, placeholderText, backgroundColor }) => {
  return (
    <Tooltip title={placeholderText} arrow>
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          backgroundColor: 'primary.light',
          border: '1px solid',
          borderColor: 'transparentLevelsWhite.1',
          transition: 'all 0.3s ease-in-out',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            backgroundColor: 'primary.light2',
            '& img': {
              filter: 'brightness(1.2)',
            },
          },
        }}
      >
        <img
          src={image}
          alt={placeholderText}
          style={{
            height: '3.5rem',
            width: '3.5rem',
            transition: 'filter 0.3s ease-in-out',
          }}
        />
      </Box>
    </Tooltip>
  );
};

SkillIcon.propTypes = {
  image: PropTypes.string.isRequired,
  placeholderText: PropTypes.string.isRequired,
};

export default SkillIcon;
