import { Button as MuiButton } from '@mui/material';
import PropTypes from 'prop-types';

const KButton = ({ label, onClick, active }) => {
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
        height: '3rem',
        px: 2,
        '&:hover': {
          backgroundColor: 'rgba(227,0,0,0.18)',
        },
        ...(active ? activeStyle : {}),
      }}
      onClick={onClick}
    >
      {label}
    </MuiButton>
  );
};

KButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool.isRequired,
};

export default KButton;
