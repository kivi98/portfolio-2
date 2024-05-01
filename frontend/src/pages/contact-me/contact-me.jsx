import { Box, Stack, Container, Typography } from '@mui/material';
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
import KImageBox from '../../components/common/imageBox-standard.jsx';

const ContactMe = () => {
  return (
    <Container>
      <style>
        {`
          .social-icon {
            height: 55px;
            cursor: pointer;
          }
        `}
      </style>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          gap: 2,
          width: '100%',
        }}
      >
        <Box>
          <KImageBox src={test} alt={'test'} height={400} width={'100%'} />
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
                <KButton btnLabel={'Send'} />
              </Box>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box
        sx={{
          mt: 10,
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
          <img src={facebook} alt={'facebook'} className="social-icon" />
          <img src={instagram} alt={'instagram'} className="social-icon" />
          <img src={linkedin} alt={'linkedin'} className="social-icon" />
          <img src={github} alt={'github'} className="social-icon" />
          <img src={medium} alt={'medium'} className="social-icon" />
          <img src={x} alt={'x'} className="social-icon" />
        </Stack>
      </Box>
    </Container>
  );
};

export default ContactMe;
