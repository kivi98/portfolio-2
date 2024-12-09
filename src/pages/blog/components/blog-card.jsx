import { useState } from 'react';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import KButton from '../../../components/common/button.jsx';
import FavoriteIcon from '@mui/icons-material/Favorite';
import KDivider from '../../../components/common/divider-vertical.jsx';
import PopupDialog from '../../../components/common/popup-dialog.jsx';
import getTruncatedText from '../../../utils/truncate-string.js';

const BlogCard = ({ blog, viewArticle }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: { xs: '100%', md: '40%' },
        p: 1,
        backgroundColor: 'primary.main',
        borderRadius: 2,
        border: 'solid 1px',
        borderColor: 'primary.light2',
        flexGrow: 1,
      }}
    >
      <Stack direction={'column'} sx={{ width: '100%' }}>
        <Box
          sx={{
            p: 0,
            width: { xs: 'auto', md: '100%' },
            height: { xs: 220, md: 220 },
            cursor: 'pointer',
            mb: '0.5rem',
          }}
          onClick={handleOpen}
        >
          <img
            src={blog.image}
            alt={blog.title}
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
            pl: 0,
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
                fontWeight: { xs: 600, md: 800 },
                fontSize: { xs: 14, md: 18 },
              }}
            >
              {blog.title}
            </Typography>
            <Stack
              direction={'row'}
              gap={1}
              sx={{
                backgroundColor: 'transparentLevels.4',
                pl: 2,
                pr: 1.5,
                mr: 0.6,
                mt: -28,
                py: 0.5,
                height: 'fit-content',
                borderRadius: 2,
                cursor: 'pointer',
              }}
            >
              <Typography variant={'subtitle1'}>{blog.likes}</Typography>
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
              {getTruncatedText(blog.content, 200)}
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
            <Stack direction={'row'}>
              <Avatar sx={{ width: '28px', height: '28px', mt: '0.1rem' }} />
              <Typography
                variant={'caption'}
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  ml: 1,
                }}
              >
                Tags: {blog.tags}
              </Typography>
            </Stack>
            <KButton
              btnLabel={'Read'}
              size={'small'}
              sx={{ px: '1.83rem' }}
              onClick={viewArticle.bind(this, blog.id)}
            />
          </Box>
        </Stack>
      </Stack>
      <PopupDialog
        open={open}
        onClose={handleClose}
        title={blog.title}
        content={blog.content}
      />
    </Box>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.object.isRequired,
  viewArticle: PropTypes.func,
};

export default BlogCard;
