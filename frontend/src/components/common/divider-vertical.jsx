import { Divider, Box } from '@mui/material';
import PropTypes from 'prop-types';

const KDivider = ({ height }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Divider
        orientation={'vertical'}
        flexItem
        sx={{
          mx: '3rem',
          backgroundColor: 'primary.lighter',
          borderRadius: 10,
          height: { height },
          my: 'auto',
        }}
      />
    </Box>
  );
};

KDivider.propTypes = {
  height: PropTypes.string.isRequired,
};

export default KDivider;
