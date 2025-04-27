import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const TwoColumnSection = ({ leftComponent, rightComponent, title }) => {
  return (
    <Box
      sx={{
        mt: { xs: 3, md: 0 },
        height: 'fit-content',
        pb: title && { xs: 3, md: 10 },
      }}
    >
      {title && (
        <Box
          sx={{
            color: 'text.main',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            mb: { xs: 4, md: 8 },
            mt: { xs: 2, md: 4 },
          }}
        >
          <Typography variant="h1">{title}</Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Divider
              sx={{
                backgroundColor: 'secondary.light',
                width: { xs: '70%', md: '50%' },
                height: 2,
                my: 2,
                boxShadow: '0px 0px 12px #E30000',
                borderRadius: 10,
              }}
            />
          </Box>
        </Box>
      )}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={5.5}>
          <Box sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            {leftComponent}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={1}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Divider
            orientation="vertical"
            sx={{
              height: '100%',
              mx: { xs: 0, md: 'auto' },
              backgroundColor: 'transparentLevelsWhite.2',
              borderRadius: 10,
              display: { xs: 'none', md: 'block' },
              minHeight: '200px',
            }}
          />
        </Grid>
        <Grid item xs={12} md={5.5}>
          <Box sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            {rightComponent}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

TwoColumnSection.propTypes = {
  leftComponent: PropTypes.element.isRequired,
  rightComponent: PropTypes.element.isRequired,
  title: PropTypes.string,
};

export default TwoColumnSection;
