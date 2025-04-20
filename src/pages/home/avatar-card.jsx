import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  styled,
} from '@mui/material';
import { GitHub, LinkedIn, Code } from '@mui/icons-material';
import me from '../../assets/images/profiles/me-new.jpeg';
import { useEffect, useState } from 'react';

// Add bounce keyframes
const bounceKeyframes = `
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  }
  @keyframes shadowScale {
    0%, 100% {
      transform: scaleX(1);
      opacity: 0.2;
    }
    50% {
      transform: scaleX(0.85);
      opacity: 0.1;
    }
  }
`;

// Replace the existing text animation keyframes with this
const textAnimationKeyframes = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

// Update the style append
const style = document.createElement('style');
style.innerHTML = bounceKeyframes + textAnimationKeyframes;
document.head.appendChild(style);

// Styled Components
const CardWrapper = styled(Box)(({ theme }) => ({
  margin: 'auto',
  maxWidth: 280,
  position: 'relative',
  width: '100%',
  animation: 'bounce 3s ease-in-out infinite',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: `linear-gradient(
      45deg,
      #ff0000,
      #cc0000,
      #990000,
      #ff1a1a,
      #ff0000
    )`,
    backgroundSize: '400%',
    animation: 'animate 20s linear infinite',
    borderRadius: 10,
    opacity: 0.1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -15,
    left: '10%',
    width: '80%',
    height: '20px',
    background: 'black',
    borderRadius: '50%',
    filter: 'blur(15px)',
    animation: 'shadowScale 3s ease-in-out infinite',
    zIndex: -1,
  },
  '@keyframes animate': {
    '0%': { backgroundPosition: '0 0' },
    '50%': { backgroundPosition: '400% 0' },
    '100%': { backgroundPosition: '0 0' },
  },
}));

const StyledCard = styled(Card)({
  background: 'linear-gradient(135deg,rgb(43, 43, 43) 0%,rgb(26, 26, 26) 100%)',
  backgroundColor: '#333333',
  width: { md: 'calc(100% - 30px)', xs: '100%' },
  borderRadius: 10,
  boxShadow: `
    0 4px 8px rgba(70, 68, 68, 0.1),
    0 12px 28px rgba(0, 0, 0, 0.2),
    0 2px 4px rgba(255, 0, 0, 0.05),
    0 8px 16px rgba(255, 0, 0, 0.1)
  `,
  backdropFilter: 'blur(100px)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -20,
    height: 4,
    background: 'linear-gradient(to right, #990000, #ff0000, #990000)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    opacity: 0.5,
  },
});

const ProfileAvatar = styled(Avatar)({
  width: 100,
  height: 100,
  border: '1px solid',
  margin: 'auto',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.3)',
  },
  marginBottom: '1.5rem',
  marginTop: '-1.5rem',
});

const SocialLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const ProfileName = styled(Typography)({
  color: '#F5F5F5',
  marginBottom: '0.2rem',
  marginLeft: '-1.5rem',
});

const ProfileTitle = styled(Typography)({
  fontWeight: 500,
  width: 'fit-content',
  padding: '0 16px',
  marginLeft: '-1.3rem',
  borderRadius: 10,
  color: '#C3C3C3',
  backgroundColor: '#131313',
});

const SocialButton = styled(IconButton)({
  color: '#F5F5F5',
});

// Social media links configuration
const socialLinks = [
  { title: 'GitHub Profile', icon: GitHub, key: 'github' },
  { title: 'LinkedIn Profile', icon: LinkedIn, key: 'linkedin' },
  { title: 'Portfolio', icon: Code, key: 'portfolio' },
];

// Update the AnimatedTypography component
const AnimatedTypography = styled(Typography)(({ phase }) => ({
  color: '#F5F5F5',
  '&::after': {
    content: '"|"',
    marginLeft: '2px',
    animation: 'blink 1s step-end infinite',
    opacity: phase === 'deleting' ? 0 : 1,
  },
}));

const AvatarCard = () => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('typing'); // typing, deleting
  const words = ['Developer', 'Designer'];
  const typingSpeed = 150; // Speed for typing
  const deletingSpeed = 100; // Speed for deleting
  const pauseDuration = 1000; // Pause before deleting/typing

  useEffect(() => {
    let timeout;

    const animate = () => {
      const currentWord = words[index];

      if (phase === 'typing') {
        if (displayText.length < currentWord.length) {
          // Still typing
          setDisplayText(currentWord.slice(0, displayText.length + 1));
          timeout = setTimeout(animate, typingSpeed);
        } else {
          // Finished typing, pause before deleting
          timeout = setTimeout(() => {
            setPhase('deleting');
            animate();
          }, pauseDuration);
        }
      } else if (phase === 'deleting') {
        if (displayText.length > 0) {
          // Still deleting
          setDisplayText(displayText.slice(0, -1));
          timeout = setTimeout(animate, deletingSpeed);
        } else {
          // Finished deleting, move to next word
          setPhase('typing');
          setIndex((prev) => (prev + 1) % words.length);
          timeout = setTimeout(animate, typingSpeed);
        }
      }
    };

    timeout = setTimeout(animate, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, index, phase]);

  const profile = {
    name: 'Kivi Amarakoon',
    title: 'Associate Software Engineer',
    avatarUrl: me,
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    portfolio: 'https://yourportfolio.com',
  };

  const handleSocialClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <CardWrapper>
      <StyledCard elevation={3}>
        <Box
          sx={{
            backgroundColor: 'secondary.main',
            height: '50px',
            width: '100%',
            color: 'text.main',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <AnimatedTypography
            variant="h6"
            fontWeight="bold"
            align="center"
            phase={phase}
          >
            {displayText}
          </AnimatedTypography>
        </Box>
        <CardHeader
          avatar={<ProfileAvatar src={profile.avatarUrl} alt={profile.name} />}
          title={
            <ProfileName variant="h5" fontWeight="bold" align="center">
              {profile.name}
            </ProfileName>
          }
          subheader={
            <ProfileTitle variant="subtitle1" align="center">
              {profile.title}
            </ProfileTitle>
          }
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
            pt: 8,
            width: '100%',
          }}
        />
        <CardContent>
          <SocialLinks>
            {socialLinks.map(({ title, icon: Icon, key }) => (
              <Tooltip key={key} title={title}>
                <SocialButton onClick={() => handleSocialClick(profile[key])}>
                  <Icon />
                </SocialButton>
              </Tooltip>
            ))}
          </SocialLinks>
        </CardContent>
      </StyledCard>
    </CardWrapper>
  );
};

export default AvatarCard;
