// create a soft icon bounce effect
import { keyframes } from '@emotion/react';

export const iconBounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
  }
  40% {
      transform: translateY(-10px);
  }
  60% {
      transform: translateY(-5px);
  }
`;
