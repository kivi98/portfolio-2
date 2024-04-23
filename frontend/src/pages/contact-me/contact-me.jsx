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

const ContactMe = () => {
  return (
    <Container>
      <Stack
        direction="row"
        sx={{
          gap: 2,
          width: '100%',
        }}
      >
        <Box>
          <img src={test} alt={'test'} style={{ height: 400 }} />
        </Box>
        <KDivider height={'80%'} />
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
                gap: 2,
                minWidth: '100%',
              }}
            >
              <KTextField placeholder={'Email'} name={'email'} required />
              <KTextField name={'name'} placeholder={'Name'} required />
              <KTextField name={'subject'} placeholder={'Subject'} required />
              <KTextField
                multiline
                rows={4}
                name={'message'}
                placeholder={'Message'}
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
            Get in touch...
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
          <img src={facebook} alt={'facebook'} style={{ height: 55 }} />
          <img src={instagram} alt={'instagram'} style={{ height: 55 }} />
          <img src={linkedin} alt={'linkedin'} style={{ height: 55 }} />
          <img src={github} alt={'github'} style={{ height: 55 }} />
          <img src={medium} alt={'medium'} style={{ height: 55 }} />
          <img src={x} alt={'x'} style={{ height: 55 }} />
        </Stack>
      </Box>
    </Container>
  );
};

export default ContactMe;
