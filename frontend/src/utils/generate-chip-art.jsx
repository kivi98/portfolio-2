import { Box, Chip, Divider, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const GenerateChipArt = ({ itemList, skillType }) => {
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 0.5,
          width: '100%',
        }}
      >
        <Typography variant={'caption'} sx={{ fontWeight: 600 }}>
          {skillType ? skillType : 'Skills:'}
        </Typography>
      </Box>
      {/*<Divider sx={{ backgroundColor: 'primary.light3', mb: '0.2rem' }} />*/}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        {itemList.map((item) => (
          <Chip
            key={item.id}
            label={item.label}
            sx={{
              m: 0.5,
              color: 'text.main',
              backgroundColor: item.color,
              '&:hover': {
                backgroundColor: 'primary.dark2',
              },
              cursor: 'pointer',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

GenerateChipArt.propTypes = {
  itemList: PropTypes.array.isRequired,
  skillType: PropTypes.string,
};

export default GenerateChipArt;
