import Box, { BoxProps } from '@mui/material/Box';
import React from 'react';
// @ts-ignore
import styles from './index.module.scss';

export type Props = {
  pageWidth?: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | number;
};

const PageWidth = React.forwardRef<HTMLDivElement, BoxProps & Props>(
  ({ pageWidth, className, sx = {}, ...props }, ref) => {
    // default is 'md'
    let width = 1230;
    if (pageWidth === 'xl') {
      width = 1680;
    } else if (pageWidth === 'lg') {
      width = 1390;
    } else if (pageWidth === 'sm') {
      width = 1030;
    } else if (pageWidth === 'xs') {
      width = 910;
    } else if (typeof pageWidth === 'number') {
      width = pageWidth;
    }
    return (
      <Box
        {...props}
        className={styles.component}
        ref={ref}
        sx={{
          label: `PageWidth-${width}`,
          ...sx,
          // medium
          [`@media (max-width: ${width + 60}px)`]: {
            px: '30px !important',
          },
          // small
          [`@media (max-width: 500px`]: {
            px: '15px !important',
          },
          // large
          [`@media (min-width: ${width + 61}px)`]: {
            px:`calc((100% - ${width}px) / 2) !important`,
          },
        }}
      ></Box>
    );
  }
);
PageWidth.displayName = 'PageWidth';

export default PageWidth;
