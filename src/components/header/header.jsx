import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import KNavButton from './components/nav-button.jsx';
import github from '../../assets/images/github.png';
import linkedin from '../../assets/images/linkedin.png';
import logo from '../../assets/images/logo.png';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef, useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import useOnClickOutside from './hooks/useOnClickOutside.js';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import KDivider from '../common/divider-vertical.jsx';
import navigateToTopOfTheScreen from '../../utils/navigate-to-top-of-the-screen.js';
import { ThemeModeContext } from '../../App';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState('/');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { toggleThemeMode } = useContext(ThemeModeContext);

  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location]);

  const activeBtnHandler = (path) => {
    setActiveButton(path);
    toggleMobileMenu();
    navigateToTopOfTheScreen();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  useOnClickOutside(mobileMenuRef, () => setMobileMenuOpen(false));

  const navButtonStyles = {
    textTransform: 'none',
    backgroundColor: 'primary.light',
    color: 'text.main',
  };

  const renderNavButtons = () => (
    <>
      <NavLink to={'/'}>
        <KNavButton
          label={'Home'}
          active={activeButton === '/'}
          onClick={() => activeBtnHandler('/')}
        />
      </NavLink>
      <NavLink to="/about-me">
        <KNavButton
          label={'About Me'}
          active={activeButton === '/about-me'}
          onClick={() => activeBtnHandler('/about-me')}
        />
      </NavLink>
      <NavLink to="/blogs">
        <KNavButton
          label={'Blog'}
          active={activeButton === '/blogs'}
          onClick={() => activeBtnHandler('/blogs')}
        />
      </NavLink>
      <NavLink to="/projects">
        <KNavButton
          label={'Projects'}
          active={activeButton === '/projects'}
          onClick={() => activeBtnHandler('/projects')}
        />
      </NavLink>
      <NavLink to="/contact-me">
        <KNavButton
          label={'Contact Me'}
          active={activeButton === '/contact-me'}
          onClick={() => activeBtnHandler('/contact-me')}
        />
      </NavLink>
    </>
  );

  return (
    <Box
      ref={mobileMenuRef}
      className={'nav'}
      sx={{
        boxSizing: 'border-box',
        fontFamily: 'fontFamily',
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(41, 41, 41, 0.8)'
          : 'rgba(245, 245, 245, 0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.transparentLevelsWhite[1] : theme.palette.transparentLevels[2]}`,
        color: 'text.primary',
        p: '1rem 1rem',
        boxShadow: theme.palette.mode === 'dark' 
          ? '0px 4px 12px rgba(27, 27, 27, 0.2)'
          : '0px 4px 12px rgba(78, 78, 78, 0.1)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      {isMobile ? (
        <>
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
                  mr: 2,
                  ml: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant={'h3'}
                  sx={{
                    fontFamily: 'Roboto sans',
                    fontWeight: 700,
                    fontSize: 18,
                    textTransform: 'uppercase',
                  }}
                >
                  K i v i &nbsp; A m a r a k o o n
                </Typography>
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
          {mobileMenuOpen && (
            <Stack
              direction={'column'}
              sx={{
                pt: 3,
                gap: 0.5,
              }}
            >
              {renderNavButtons()}
              <Box sx={{ py: 0.5 }}>
                <KDivider orientation={'horizontal'} width={'90%'} />
              </Box>
              <Stack direction={'column'} gap={0.5}>
                <Button startIcon={<GitHubIcon />} sx={navButtonStyles}>
                  GitHub
                </Button>
                <Button startIcon={<LinkedInIcon />} sx={navButtonStyles}>
                  LinkedIn
                </Button>
                <Button 
                  startIcon={theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                  onClick={toggleThemeMode} 
                  sx={navButtonStyles}
                >
                  Toggle Theme
                </Button>
              </Stack>
            </Stack>
          )}
        </>
      ) : (
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
                backgroundColor: 'text.primary',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '50%',
                p: 0.25,
              }}
            >
              <img src={logo} alt={'logo'} style={{ height: 40 }} />
            </Box>
            <Box sx={{ fontWeight: 700, fontSize: 18, mr: 2, ml: 1 }}>
              <Typography
                variant={'h3'}
                sx={{
                  fontFamily: 'Roboto sans',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'text.primary'
                }}
              >
                K i v i &nbsp; A m a r a k o o n
              </Typography>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                backgroundColor: 'transparentLevelsWhite.2',
                borderColor: theme.palette.divider,
                width: '1px',
                height: 50,
                borderRadius: 10,
              }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>{renderNavButtons()}</Box>
          </Stack>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Tooltip title="Toggle light/dark theme">
              <IconButton onClick={toggleThemeMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
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
      )}
    </Box>
  );
};

export default Header;
