import { Box, Stack, Typography, IconButton, styled, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import zIndex from '@mui/material/styles/zIndex';

const SkillCardStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  borderRadius: '10px',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.transparentLevels[2] : theme.palette.transparentLevelsWhite[8],
  padding: '1rem',
  marginInline: '2rem !important',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  width: '90% !important',
  boxShadow: '0px 0px 12px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  border: `1px solid ${theme.palette.transparentLevels[1]}`,
  borderLeft: `8px solid ${theme.palette.transparentLevels[1]}`,
  position: 'relative',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 0px 12px rgba(0,0,0,0.2)',
    borderColor: theme.palette.mode === 'dark' ? theme.palette.transparentLevelsWhite[2] : theme.palette.transparentLevels[1],
    '&::before': {
      opacity: 1,
    },
  },
}));

const SkillIconStyled = styled('img')({
  height: '2.5rem',
  width: '2.5rem',
  marginRight: '1rem',
});

const HoverBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.transparentLevelsWhite[2] : theme.palette.transparentLevels[1],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  '*:hover > &': {
    opacity: 1,
  },
}));

const SkillCard = ({ title, subtitle, description, date, listDescription }) => {
  return (
    <SkillCardStyled
      sx={{
        pt: 2,
        px: 2.5,
        pb: 2.5,
        width: { xs: 'calc(100% - 20px)', md: '96%' },
        height: '100%',
      }}
    >
      <Stack
        direction={'row'}
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography
          variant={'h3'}
          sx={{
            color: 'text.primary',
            fontWeight: 'bold',
          }}
        >
          {title}
        </Typography>
        <Box>
          <IconButton component="a" href="https://www.google.com" target="_blank" rel="noopener noreferrer">
            <OpenInNewIcon sx={{ 
              color: 'text.primary' }} />
          </IconButton>
        </Box>
      </Stack>
      <Divider />
      <Stack
        direction={'row'}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant={'subtitle1'} sx={{ color: 'secondary.light', fontSize: '0.75rem !important' }}>
          {subtitle}
        </Typography>
        <Typography variant={'subtitle2'} sx={{ color: 'text.secondary', fontSize: '0.75rem !important' }}>
          {date}
        </Typography>
      </Stack>
      <Divider
        sx={{
          mb: 2,
        }}
      />
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {description && (
          <Typography
            variant={'body1'}
            sx={{
              color: 'text.secondary',
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
              pl: 2,
              listStyle: 'disc',
              '& li': {
                color: 'text.secondary',
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
      </Box>
    </SkillCardStyled>
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
