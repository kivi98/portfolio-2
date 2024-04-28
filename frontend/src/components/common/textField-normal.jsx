import { Box, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const KTextField = ({
  placeholder,
  name,
  multiline,
  rows,
  required,
  ...props
}) => {
  return (
    <Box>
      <TextField
        multiline={multiline}
        rows={rows}
        placeholder={placeholder}
        name={name}
        required={required}
        {...props}
        sx={{
          backgroundColor: 'primary.light2',
          borderRadius: 1,
          borderColor: 'primary.main',
          width: '100%',
          '.MuiOutlinedInput-root': {
            '& fieldset': {
              color: 'primary.light3',
              border: 0.5,
            },
            '&:hover fieldset': {
              borderColor: 'primary.lighter',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'text.dark',
            },
            '& .MuiOutlinedInput-input': {
              color: 'text.dark',
            },
          },
        }}
      ></TextField>
    </Box>
  );
};

KTextField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  required: PropTypes.bool,
  rows: PropTypes.number,
};

export default KTextField;
