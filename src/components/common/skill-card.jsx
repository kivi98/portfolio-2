import { Box, Divider, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const SkillCard = ({ title, subtitle, description, date, listDescription }) => {
  return (
    <Stack
      direction={'column'}
      sx={{
        backgroundColor: 'primary.light2',
        border: 'solid 1px',
        borderColor: 'transparentLevelsWhite.2',
        borderRadius: 2,
        p: 1,
        width: { xs: 'calc(100% - 20px)', md: '96%' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 0.5,
        }}
      >
        <Typography variant={'h4'}>{title}</Typography>
      </Box>
      <Divider
        sx={{
          backgroundColor: 'transparentLevelsWhite.2',
          borderRadius: 10,
        }}
      />
      <Stack
        direction={'row'}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 0.5,
        }}
      >
        <Typography variant={'caption'}>{subtitle}</Typography>
        <Typography variant={'caption'}>{date}</Typography>
      </Stack>
      {(description || listDescription) && (
        <Divider
          sx={{
            backgroundColor: 'transparentLevelsWhite.2',
            borderRadius: 10,
          }}
        />
      )}
      {description && (
        <Box>
          <Typography
            variant={'caption'}
            color={'text.dark'}
            sx={{
              pt: 1,
              lineHeight: '1.15rem',
              display: 'inline-block',
            }}
          >
            {description}
          </Typography>
        </Box>
      )}
      {listDescription && (
        <Box sx={{ p: 0, pt: '0.3rem' }}>
          <ul
            style={{
              paddingTop: 0,
              margin: 0,
              lineHeight: '1rem',
              paddingLeft: '1rem',
              color: '#b6b6b6',
            }}
          >
            {listDescription}
          </ul>
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
