import { Box, Divider, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const SkillCard = ({ title, subtitle, description, date, node }) => {
  return (
    <Stack
      direction={'column'}
      sx={{
        backgroundColor: 'primary.light2',
        border: 'solid 1px',
        borderColor: 'transparentLevelsWhite.2',
        boxShadow: '0px 15px 52px -4px rgba(0,0,0,0.20)',
        borderRadius: 2,
        p: 1,
        width: { xs: 'calc(100% - 10px)', md: '90%' },
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
      {(description || node) && (
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
      {node && <Box sx={{ p: 0 }}>{node}</Box>}
    </Stack>
  );
};

SkillCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.any,
  date: PropTypes.string.isRequired,
  node: PropTypes.any,
};

export default SkillCard;
