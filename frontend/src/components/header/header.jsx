import { Box, Divider, Stack, Tooltip } from '@mui/material';
import KNavButton from './components/nav-button.jsx';
import github from '../../assets/images/github.png';
import linkedin from '../../assets/images/linkedin.png';
import logo from '../../assets/images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState('/');

  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location]);

  const activeBtnHandler = (path) => {
    setActiveButton(path);
  };

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
          <Box sx={{ fontWeight: 700, fontSize: 18, mr: 2, ml: 1 }}>
            Kivi Amarakoon
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              backgroundColor: 'transparentLevelsWhite.2',
              width: '1px',
              height: 50,
              borderRadius: 10,
            }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link to={'/'}>
              <KNavButton
                label={'Home'}
                active={activeButton === '/'}
                onClick={() => activeBtnHandler('/')}
              ></KNavButton>
            </Link>
            <Link to={'/about-me'}>
              <KNavButton
                label={'About Me'}
                active={activeButton === '/about-me'}
                onClick={() => activeBtnHandler('/about-me')}
              ></KNavButton>
            </Link>
            <Link to={'/blog'}>
              <KNavButton
                label={'Blog'}
                active={activeButton === '/blog'}
                onClick={() => activeBtnHandler('/blog')}
              ></KNavButton>
            </Link>
            <Link to={'/projects'}>
              <KNavButton
                label={'Projects'}
                active={activeButton === '/projects'}
                onClick={() => activeBtnHandler('/projects')}
              ></KNavButton>
            </Link>
            <Link to={'/contact-me'}>
              <KNavButton
                label={'Contact Me'}
                active={activeButton === '/contact-me'}
                onClick={() => activeBtnHandler('/contact-me')}
              ></KNavButton>
            </Link>
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
