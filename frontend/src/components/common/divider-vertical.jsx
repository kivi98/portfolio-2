import { Divider, Box } from '@mui/material';
import PropTypes from 'prop-types';

const KDivider = ({ height, orientation, width }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Divider
        orientation={orientation}
        flexItem
        sx={{
          mx: '3rem',
          backgroundColor: 'primary.lighter',
          borderRadius: 10,
          height: { height },
          width: { width },
          my: 'auto',
        }}
      />
    </Box>
  );
};

KDivider.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  orientation: PropTypes.string.isRequired,
};

export default KDivider;
