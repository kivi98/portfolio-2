import { Box, Stack, Container, Typography, styled } from '@mui/material';
import test from '../../assets/images/test.png';
import KButton from '../../components/common/button.jsx';
import KTextField from '../../components/common/textField-normal.jsx';
import KDivider from '../../components/common/divider-vertical.jsx';
import facebook from '../../assets/images/facebook.svg';
import instagram from '../../assets/images/instagram.svg';
import linkedin from '../../assets/images/linkedin.svg';
import github from '../../assets/images/github.svg';
import medium from '../../assets/images/medium.svg';
import x from '../../assets/images/x.svg';
import SendIcon from '@mui/icons-material/Send';
import KImageBox from '../../components/common/imageBox-standard.jsx';
import { iconBounce } from '../../utils/icon-bounce.js';
import { keyframes } from '@emotion/react';

// make a styled Box for Images
const StyledImageBox = styled(Box)`
  height: 40px;
  &:hover {
    animation: ${iconBounce} 1.5s infinite;
    cursor: pointer;
  }
  @media (min-width: 600px) {
    height: 40px;
  }
  @media (min-width: 960px) {
    height: 50px;
  }
  @media (min-width: 1280px) {
    height: 50px;
  }
`;

const ContactMe = () => {
  return (
    <Container>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          gap: 2,
          width: '100%',
        }}
      >
        <Box
          sx={{
            minWidth: { xs: '100%', md: 'fit-content' },
          }}
        >
          <KImageBox
            src={test}
            alt={'test'}
            height={{ xs: 200, md: 400 }}
            width={'100%'}
          />
        </Box>
        <KDivider height={'80%'} orientation={'vertical'} />
        <Box
          sx={{
            alignSelf: 'center',
            width: '100%',
          }}
        >
          <form method={'post'} action={'mailto:kiviamarakoon@gmail.com'}>
            <Stack
              direction="column"
              sx={{
                gap: 1,
                minWidth: '100%',
              }}
            >
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                sx={{
                  display: 'flex',
                  width: '100%',
                  gap: 1,
                }}
              >
                <KTextField
                  placeholder={'Email'}
                  name={'email'}
                  size={'small'}
                  sx={{ width: '100%' }}
                  required
                />
                <KTextField
                  name={'name'}
                  placeholder={'Name'}
                  size={'small'}
                  sx={{ width: '100%' }}
                  required
                />
              </Stack>
              <KTextField
                name={'subject'}
                placeholder={'Subject'}
                size={'small'}
                required
              />
              <KTextField
                multiline
                rows={4}
                name={'message'}
                placeholder={'Message'}
                size={'small'}
                required
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <KButton
                  endIcon={<SendIcon />}
                  btnLabel={'SEND'}
                  sx={{ width: 'fit-content', px: 3, height: 40 }}
                />
              </Box>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box
        sx={{
          mt: { xs: 4, md: 10 },
          textAlign: 'center',
        }}
      >
        <Box sx={{ py: 3 }}>
          <Typography variant={'h6'} sx={{ color: 'text.dark' }}>
            Get in touch with me...
          </Typography>
        </Box>
        <Stack
          direction={'row'}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <StyledImageBox component={'img'} src={facebook} alt={'facebook'} />
          <StyledImageBox component={'img'} src={instagram} alt={'instagram'} />
          <StyledImageBox component={'img'} src={linkedin} alt={'linkedin'} />
          <StyledImageBox component={'img'} src={github} alt={'github'} />
          <StyledImageBox component={'img'} src={medium} alt={'medium'} />
          <StyledImageBox component={'img'} src={x} alt={'x'} />
        </Stack>
      </Box>
    </Container>
  );
};

export default ContactMe;
