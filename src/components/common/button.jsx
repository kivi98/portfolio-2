import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const KButton = ({
  btnLabel,
  onClick,
  variant,
  size,
  type = 'submit',
  sx,
  ...props
}) => {
  return (
    <Button
      {...props}
      sx={{
        backgroundColor:
          variant === 'outlined' ? 'primary.light3' : 'secondary.main',
        borderRadius: 2,
        px: 5,
        color: 'text.light',
        borderColor: variant === 'outlined' ? 'primary.light3' : 'secondary',
        textTransform: 'none',
        '&:hover': {
          backgroundColor:
            variant === 'outlined'
              ? 'transparentLevelsWhite.3'
              : 'secondary.light',
          borderColor:
            variant === 'outlined' ? 'transparentLevelsWhite.3' : 'secondary',
        },
        ...sx,
      }}
      color={'secondary'}
      variant={variant ?? 'contained'}
      type={type}
      size={size}
      onClick={onClick}
    >
      {btnLabel}
    </Button>
  );
};

KButton.propTypes = {
  btnLabel: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  size: PropTypes.string,
  sx: PropTypes.object,
};

export default KButton;
