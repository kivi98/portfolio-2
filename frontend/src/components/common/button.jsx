import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const KButton = ({ btnLabel, onClick }) => {
  return (
    <>
      <Button
        type={'submit'}
        onClick={onClick}
        sx={{
          backgroundColor: 'secondary.main',
          borderRadius: 1,
          px: 5,
          color: 'text.light',
          '&:hover': {
            backgroundColor: 'secondary.light',
          },
        }}
      >
        {btnLabel}
      </Button>
    </>
  );
};

KButton.propTypes = {
  btnLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default KButton;
