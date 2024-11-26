import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import KNavButton from './components/nav-button.jsx';
import github from '../../assets/images/github.png';
import linkedin from '../../assets/images/linkedin.png';
import logo from '../../assets/images/logo.png';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import useOnClickOutside from './hooks/useOnClickOutside.js';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import KDivider from '../common/divider-vertical.jsx';

const Header = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState('/');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef();

  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location]);
  const activeBtnHandler = (path) => {
    setActiveButton(path);
    toggleMobileMenu();
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };
  useOnClickOutside(mobileMenuRef, () => setMobileMenuOpen(false));

  return (
    <Box
      ref={mobileMenuRef}
      className={'nav'}
      sx={{
        boxSizing: 'border-box',
        color: 'text.main',
        fontFamily: 'fontFamily',
        backgroundColor: 'primary.dark2',
        p: '1rem 1rem',
        boxShadow: '0px 0px 12px #0D0D0D',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      {isMobile && (
        <Stack
          direction={'row'}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Stack direction={'row'}>
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
            <Box
              sx={{
                fontWeight: 700,
                fontSize: 18,
                mr: 2,
                ml: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Kivi Amarakoon
            </Box>
          </Stack>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <IconButton onClick={toggleMobileMenu}>
              <MenuIcon sx={{ color: 'text.main' }} />
            </IconButton>
          </Box>
        </Stack>
      )}
      {isMobile && mobileMenuOpen && (
        <Stack
          direction={'column'}
          sx={{
            pt: 3,
            gap: 0.5,
          }}
        >
          <NavLink to={'/'}>
            <KNavButton
              label={'Home'}
              active={activeButton === '/'}
              onClick={() => activeBtnHandler('/')}
            ></KNavButton>
          </NavLink>
          <NavLink to="/about-me">
            <KNavButton
              label={'About Me'}
              active={activeButton === '/about-me'}
              onClick={() => activeBtnHandler('/about-me')}
            ></KNavButton>
          </NavLink>
          <NavLink to="/blog">
            <KNavButton
              label={'Blog'}
              active={activeButton === '/blog'}
              onClick={() => activeBtnHandler('/blog')}
            ></KNavButton>
          </NavLink>
          <NavLink to="/projects">
            <KNavButton
              label={'Projects'}
              active={activeButton === '/projects'}
              onClick={() => activeBtnHandler('/projects')}
            ></KNavButton>
          </NavLink>
          <NavLink to="/contact-me">
            <KNavButton
              label={'Contact Me'}
              active={activeButton === '/contact-me'}
              onClick={() => activeBtnHandler('/contact-me')}
            ></KNavButton>
          </NavLink>
          <Box sx={{ py: 0.5 }}>
            <KDivider orientation={'horizontal'} width={'90%'} />
          </Box>
          <Stack direction={'column'} gap={0.5}>
            <Button
              startIcon={<GitHubIcon />}
              sx={{
                textTransform: 'none',
                backgroundColor: 'primary.light',
                color: 'text.main',
              }}
            >
              GitHUb
            </Button>
            <Button
              startIcon={<LinkedInIcon />}
              sx={{
                textTransform: 'none',
                backgroundColor: 'primary.light',
                color: 'text.main',
              }}
            >
              LinkedIn
            </Button>
          </Stack>
        </Stack>
      )}
      {!isMobile && (
        <>
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
                <NavLink to={'/'}>
                  <KNavButton
                    label={'Home'}
                    active={activeButton === '/'}
                    onClick={() => activeBtnHandler('/')}
                  ></KNavButton>
                </NavLink>
                <NavLink to="/about-me">
                  <KNavButton
                    label={'About Me'}
                    active={activeButton === '/about-me'}
                    onClick={() => activeBtnHandler('/about-me')}
                  ></KNavButton>
                </NavLink>
                <NavLink to="/blog">
                  <KNavButton
                    label={'Blog'}
                    active={activeButton === '/blog'}
                    onClick={() => activeBtnHandler('/blog')}
                  ></KNavButton>
                </NavLink>
                <NavLink to="/projects">
                  <KNavButton
                    label={'Projects'}
                    active={activeButton === '/projects'}
                    onClick={() => activeBtnHandler('/projects')}
                  ></KNavButton>
                </NavLink>
                <NavLink to="/contact-me">
                  <KNavButton
                    label={'Contact Me'}
                    active={activeButton === '/contact-me'}
                    onClick={() => activeBtnHandler('/contact-me')}
                  ></KNavButton>
                </NavLink>
              </Box>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
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
        </>
      )}
    </Box>
  );
};

export default Header;
