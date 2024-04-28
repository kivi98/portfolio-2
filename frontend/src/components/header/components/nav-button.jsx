import { Button as MuiButton } from '@mui/material';
import PropTypes from 'prop-types';

const KNavButton = ({ label, onClick, active }) => {
  const activeStyle = {
    backgroundColor: 'secondary.main',
    fontWeight: 700,
    '&:hover': {
      backgroundColor: 'secondary.light',
    },
  };

  return (
    <MuiButton
      sx={{
        color: 'text.main',
        fontWeight: 200,
        fontSize: 16,
        height: '3rem',
        px: 2,
        width: { xs: '100%', md: 'fit-content' },
        textTransform: 'none',
        border: '1px solid transparent',
        transition:
          'background-color 0.3s ease-in-out, border 0.3s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(227,0,0,0.18)',
          border: '1px solid rgb(227,0,0)',
        },
        ...(active ? activeStyle : {}),
      }}
      onClick={onClick}
    >
      {label}
    </MuiButton>
  );
};

KNavButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool.isRequired,
};

export default KNavButton;
