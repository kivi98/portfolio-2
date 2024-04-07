import { Box, Divider, Stack, Tooltip } from '@mui/material';
import './header.css';
import KButton from './components/Button.jsx';
import github from '../../assets/images/github.png';
import linkedin from '../../assets/images/linkedin.png';
import logo from '../../assets/images/logo.png';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  const toggleHeaderVisibility = () => {
    setIsHeaderVisible(!isHeaderVisible);
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
        transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out',
      }}
      onClick={toggleHeaderVisibility}
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
          <KButton label={'Home'} active={false}></KButton>
          <KButton label={'About Me'} active={true}></KButton>
          <KButton label={'Blog'} active={false}></KButton>
          <KButton label={'Projects'} active={false}></KButton>
          <KButton label={'Contact Me'} active={false}></KButton>
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          zIndex: 1001,
          mr: 0,
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'primary.main',
            width: 100,
            height: 50,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            top: 80,
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: 5,
            borderBottomColor: 'secondary.light',
          }}
        >
          Drop
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
