import { Box, Divider, Stack, Typography } from '@mui/material';
import PropTypes, { string } from 'prop-types';
import KButton from '../../../components/common/button.jsx';
import KDivider from '../../../components/common/divider-vertical.jsx';

const BlogCard = ({ title, blogPostImage, description, keywords }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        p: 1,
        backgroundColor: 'primary.main',
        borderRadius: 2,
      }}
    >
      <Stack direction={'row'} sx={{ width: '100%' }}>
        <Box>
          <img
            src={blogPostImage}
            alt={title}
            style={{ width: 130, height: 130 }}
          />
        </Box>
        <Stack
          direction={'column'}
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            py: 1,
          }}
        >
          <Stack
            direction={'row'}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              px: 1,
            }}
          >
            <Typography variant={'subtitle1'}>{title}</Typography>
            <Typography variant={'h6'}>H</Typography>
          </Stack>
          <KDivider width={'98%'} orientation={'horizontal'} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
            <Typography variant={'caption'}>{description}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              px: 1,
            }}
          >
            <Typography
              variant={'caption'}
              sx={{ height: '100%', display: 'flex', alignItems: 'flex-end' }}
            >
              <strong>Keywords: {keywords}</strong>{' '}
            </Typography>
            <KButton btnLabel={'Read'} />
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
  // keywords: PropTypes.arrayOf(string).isRequired
};

export default BlogCard;
