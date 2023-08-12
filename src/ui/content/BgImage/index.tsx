import Box, { BoxProps } from '@mui/material/Box';
import React, { FC } from 'react';

type Modify<T, R> = Omit<T, keyof R> & R;
type Props = (
  | {
      src: string;
      srcDesktop?: string;
    }
  | {
      src?: string;
      srcDesktop: string;
    }
) & {
  className?: string;
  srcMobile?: string;
  srcTablet?: string;
};

/**
 * Renders a div with a background-image url set to props.src
 */
const BgImage: FC<Modify<BoxProps, Props>> = ({
  className,
  src,
  srcDesktop,
  srcMobile,
  srcTablet,
  ...props
}) => {
  return (
    <Box
      className={'BgImage' + (className ? ' ' + className : '')}
      sx={{
        backgroundImage:[
          `url(${srcMobile || srcTablet || src})`,
          `url(${srcTablet || src})`,
          null,
          null,
          `url(${srcDesktop || src})`, 
        ],
        bgSize:'contain', 
        bgRepeat:'no-repeat',
        bgPosition:'center',
    }}
      {...props}
    />
  );
};

export default BgImage;
