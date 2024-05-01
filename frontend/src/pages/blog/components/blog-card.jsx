import { Box, Divider, Stack, Typography } from '@mui/material';
import PropTypes, { string } from 'prop-types';
import KButton from '../../../components/common/button.jsx';
import FavoriteIcon from '@mui/icons-material/Favorite';
import KDivider from '../../../components/common/divider-vertical.jsx';

const BlogCard = ({ title, blogPostImage, description, keywords, hearts }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        p: 1,
        backgroundColor: 'primary.main',
        borderRadius: 2,
        border: 'solid 2px',
        borderColor: 'primary.light2',
        flexGrow: 1,
        mb: { xs: 0, md: 2 },
        boxShadow: '1px 4px 16px 0px rgba(21, 21, 21, 0.75)',
      }}
    >
      <Stack direction={'row'} sx={{ width: '100%' }}>
        <Box
          sx={{
            p: 0,
            width: { xs: 200, md: 220 },
            height: { xs: '100%', md: 140 },
          }}
        >
          <img
            src={blogPostImage}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 5,
              p: 0,
            }}
          />
        </Box>
        <Stack
          direction={'column'}
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            pl: 1,
          }}
        >
          <Stack
            direction={'row'}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              pl: 1,
            }}
          >
            <Typography
              variant={'subtitle1'}
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 800,
              }}
            >
              {title}
            </Typography>
            <Stack
              direction={'row'}
              gap={1}
              sx={{
                backgroundColor: 'primary.light2',
                px: 2,
                py: 0.5,
                height: 'fit-content',
                borderRadius: 2,
                cursor: 'pointer',
              }}
            >
              <Typography variant={'subtitle1'}>{hearts}</Typography>
              <FavoriteIcon
                sx={{ color: 'secondary.light', mt: 0.25, ml: 0.5 }}
              />
            </Stack>
          </Stack>
          <Box sx={{ py: 1 }}>
            <KDivider orientation={'horizontal'} width={'100%'} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              px: 1,
              height: '100%',
            }}
          >
            <Typography variant={'caption'} sx={{ color: 'primary.lighter' }}>
              {description}
            </Typography>
          </Box>
          <Box sx={{ py: 1 }}>
            <KDivider orientation={'horizontal'} width={'100%'} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              pl: 1,
            }}
          >
            <Typography
              variant={'caption'}
              sx={{ height: '100%', display: 'flex', alignItems: 'center' }}
            >
              <strong>Keywords: {keywords}</strong>{' '}
            </Typography>
            <KButton btnLabel={'Read'} size={'small'} />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  blogPostImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  hearts: PropTypes.number,
  // keywords: PropTypes.arrayOf(string).isRequired
};

export default BlogCard;
