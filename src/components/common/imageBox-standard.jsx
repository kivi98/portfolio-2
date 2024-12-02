import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import Carousel from 'react-material-ui-carousel';

const KImageBox = ({ src, alt, height, width, imageArray }) => {
  if (imageArray && imageArray.length > 0) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Carousel
          autoPlay={true}
          animation={'slide'}
          navButtonsAlwaysVisible={true}
        >
          {imageArray.map((image) => (
            <Box
              component="img"
              key={image.id}
              src={image.src}
              alt={image.alt}
              height={'100%'}
              width={'100%'}
              minHeight={height}
              sx={{
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
          ))}
        </Carousel>
      </Box>
    );
  }

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
    />
  );
};

KImageBox.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  imageArray: PropTypes.array,
};

export default KImageBox;
