import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

const SearchTextField = (name, placeholder) => {
  return (
    <TextField
      name={name}
      placeholder={placeholder}
      size="small"
      type={'search'}
      InputProps={{
        startAdornment: (
          <InputAdornment position={'start'}>
            <SearchIcon sx={{ color: 'primary.lighter' }} />
          </InputAdornment>
        ),
      }}
      sx={{
        width: { xs: '100%', md: 400 },
        backgroundColor: 'primary.light2',
        borderRadius: 3,
        borderColor: 'primary.main',
        transition: 'width 0.3s ease-in-out',
        '&:focus-within': {
          width: { xs: '100%', md: 600 },
        },
        '.MuiOutlinedInput-root': {
          '& fieldset': {
            color: 'primary.light3',
            border: 0.5,
            borderRadius: 3,
          },
          '&:hover fieldset': {
            borderColor: 'primary.lighter',
            borderRadius: 3,
          },
          '&.Mui-focused fieldset': {
            borderColor: 'primary.lighter',
            borderWidth: 1,
            borderRadius: 3,
          },
          '& .MuiOutlinedInput-input': {
            color: 'text.dark',
            borderRadius: 3,
          },
        },
      }}
    />
  );
};

SearchTextField.prototype = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default SearchTextField;
