import { Box, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import KButton from '../../../components/common/button.jsx';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ProjectCard = ({
  title,
  projectPostImage,
  description,
  keywords,
  hearts,
}) => {
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
        mb: 2,
        boxShadow: '1px 4px 16px 0px rgba(21, 21, 21, 0.75)',
      }}
    >
      <Stack direction={'row'} sx={{ width: '100%' }}>
        <Box>
          <img
            src={projectPostImage}
            alt={title}
            style={{
              width: 200,
              height: 130,
              objectFit: 'cover',
              borderRadius: 5,
            }}
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
            <Typography
              variant={'subtitle1'}
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: { xs: 600, md: 800 },
                fontSize: { xs: 14, md: 18 },
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
                borderRadius: 2,
                mt: -1,
                cursor: 'pointer',
              }}
            >
              <Typography variant={'subtitle1'}>{hearts}</Typography>
              <FavoriteIcon
                sx={{ color: 'secondary.light', mt: 0.25, ml: 0.5 }}
              />
            </Stack>
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
            <Typography variant={'caption'} sx={{ color: 'primary.lighter' }}>
              {description}
            </Typography>
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

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  projectPostImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  hearts: PropTypes.number,
  // keywords: PropTypes.arrayOf(string).isRequired
};

export default ProjectCard;
