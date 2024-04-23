import { Box, Divider, Stack, Tooltip } from '@mui/material';
import KNavButton from './components/nav-button.jsx';
import github from '../../assets/images/github.png';
import linkedin from '../../assets/images/linkedin.png';
import logo from '../../assets/images/logo.png';

const Header = () => {
  return (
    <Box
      className={'nav'}
      sx={{
        boxSizing: 'border-box',
        color: 'text.main',
        fontFamily: 'fontFamily',
        backgroundColor: 'primary.main',
        p: '1rem 1rem',
        boxShadow: '0px 0px 12px #0D0D0D',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <Stack
        direction={'row'}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          zIndex: 1005,
        }}
      >
        <Stack
          direction={'row'}
          gap={'1rem'}
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'text.main',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '50%',
              p: 0.25,
            }}
          >
            <img src={logo} alt={'logo'} style={{ height: 40 }} />
          </Box>
          <Box sx={{ fontWeight: 700, fontSize: 18 }}>Kivi Amarakoon</Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              backgroundColor: 'primary.lighter',
              width: 2,
              height: 50,
              borderRadius: 10,
            }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <KNavButton label={'Home'} active={false}></KNavButton>
            <KNavButton label={'About Me'} active={true}></KNavButton>
            <KNavButton label={'Blog'} active={false}></KNavButton>
            <KNavButton label={'Projects'} active={false}></KNavButton>
            <KNavButton label={'Contact Me'} active={false}></KNavButton>
          </Box>
        </Stack>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Tooltip title="GitHub">
            <img
              src={github}
              alt={'github'}
              style={{ height: 30, cursor: 'pointer' }}
            />
          </Tooltip>
          <Tooltip title={'LinkedIn'}>
            <img
              src={linkedin}
              alt={'linked-in'}
              style={{ height: 30, cursor: 'pointer' }}
            />
          </Tooltip>
        </Box>
      </Stack>
    </Box>
  );
};

export default Header;
