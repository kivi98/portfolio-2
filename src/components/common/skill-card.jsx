import { Box, Stack, Typography, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from 'react-router-dom';

const SkillCard = ({ title, subtitle, description, date, listDescription }) => {
  return (
    <Stack
      direction={'column'}
      sx={{
        backgroundColor: 'rgba(78, 78, 78, 0.2)',
        border: '1px solid',
        borderColor: 'rgba(119, 119, 119, 0.2)',
        position: 'relative',
        borderRadius: 2,
        pt: 2,
        px: 2.5,
        pb: 2.5,
        width: { xs: 'calc(100% - 20px)', md: '96%' },
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          '&::before': {
            opacity: 1,
          },
          border: '1px solid',
          borderColor: 'rgba(78, 78, 78, 0.2)',
          backgroundColor: 'rgba(99, 99, 99, 0.2)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          width: '4px',
          height: '100%',
          backgroundColor: 'secondary.main',
          opacity: 0,
          borderTopLeftRadius: '10px',
          borderBottomLeftRadius: '10px',
          transition: 'opacity 0.3s ease-in-out',
        },
      }}
    >
      <Stack
        direction={'row'}
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography
          variant={'h3'}
          sx={{
            color: 'text.light',
            mb: 1,
            fontWeight: 'bold',
          }}
        >
          {title}
        </Typography>
        <Box>
          <IconButton>
            <Link href={`https://www.google.com`} target="_blank">
              <OpenInNewIcon sx={{ color: 'text.main' }} />
            </Link>
          </IconButton>
        </Box>
      </Stack>
      <Stack
        direction={'row'}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant={'subtitle1'} sx={{ color: 'secondary.light' }}>
          {subtitle}
        </Typography>
        <Typography variant={'subtitle2'} sx={{ color: 'text.dark' }}>
          {date}
        </Typography>
      </Stack>

      {description && (
        <Typography
          variant={'body1'}
          sx={{
            color: 'text.dark',
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>
      )}

      {listDescription && (
        <Box
          component="ul"
          sx={{
            m: 0,
            mt: 1,
            pl: 2,
            listStyle: 'disc',
            flexGrow: 1,
            overflowY: 'auto',
            maxHeight: description ? 'calc(100% - 120px)' : 'calc(100% - 80px)',
            '& li': {
              color: 'text.dark',
              mb: 1.5,
              paddingRight: 1,
              '&:last-child': {
                mb: 0,
              },
              '& p': {
                margin: 0,
                lineHeight: 1.6,
              },
            },
          }}
        >
          {listDescription}
        </Box>
      )}
    </Stack>
  );
};

SkillCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.any,
  date: PropTypes.string.isRequired,
  listDescription: PropTypes.any,
};

export default SkillCard;
