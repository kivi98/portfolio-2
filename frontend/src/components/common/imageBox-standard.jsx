import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const KImageBox = ({ src, alt, height, width }) => {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      height={height}
      width={width}
      sx={{
        objectFit: 'cover',
        borderRadius: 2,
      }}
    ></Box>
  );
};

KImageBox.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default KImageBox;
