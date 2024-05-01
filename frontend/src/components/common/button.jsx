import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const KButton = ({ btnLabel, onClick, size, ...props }) => {
  return (
    <Button
      {...props}
      sx={{
        backgroundColor: 'secondary.main',
        borderRadius: 2,
        px: 5,
        color: 'text.light',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'secondary.light',
        },
      }}
      type={'submit'}
      size={size}
      onClick={onClick}
    >
      {btnLabel}
    </Button>
  );
};

KButton.propTypes = {
  btnLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.string,
};

export default KButton;
