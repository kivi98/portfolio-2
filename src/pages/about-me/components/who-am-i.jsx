import { Typography } from '@mui/material';
import TwoColumnSection from '../../../components/common/section-body-type-2';
import KImageBox from '../../../components/common/imageBox-standard';
import { MyImageArray } from '../image-arrays/my-image-array.js';

const WhoAmI = () => {
  return (
    <TwoColumnSection
      title={'Who Am I'}
      rightComponent={
        <KImageBox
          imageArray={MyImageArray}
          alt={'body-image'}
          height={{ xs: 300, md: 400 }}
        />
      }
      leftComponent={
        <Typography
          variant={'body1'}
          fontSize={20}
          sx={{
            fontSize: { xs: 14, md: 16 },
          }}
        >
          <span>
            <span
              style={{
                fontSize: 36,
                fontWeight: 500,
                margin: 0,
                padding: 0,
                backgroundColor: '#181818',
                paddingLeft: 5,
                paddingRight: 5,
                borderRadius: 5,
                marginRight: 5,
              }}
            >
              I&#39;
            </span>
            m an aspiring software engineer with a passion for crafting
            innovative solutions to real-world challenges. With experience in
            web, mobile, and enterprise-level development, I enjoy building
            user-centered software using modern tools like React, .NET, and
            Clean Architecture.
            <br />
            <br />
            Currently pursuing an MSc in Computer Science at the University of
            Moratuwa, I’m eager to deepen my knowledge in areas like AI,
            Software Architecture, and Networking. Whether it&#39;s creating
            efficient systems or experimenting with the latest technologies, I’m
            committed to continuous learning and growth.
            <br />
            <br />
            In essence, I’m just an ordinary student with extraordinary
            dreams—determined to grow into an expert in software engineering,
            one line of code at a time.
          </span>
        </Typography>
      }
    />
  );
};

export default WhoAmI;
