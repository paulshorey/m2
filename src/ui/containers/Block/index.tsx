import React, { forwardRef } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
// @ts-ignore
// import styles from './index.module.scss';
import validMuiProps from '@techytools/uui/functions/validMuiProps';

export type BlockProps = BoxProps & {
  as?: React.ElementType;
};
function Block({ as, component, children, ...rest }: BlockProps, ref: any) {
  return (
    <Box
      ref={ref}
      component={component || as || 'div'}
      {...validMuiProps(rest)}
    >
      {children}
    </Box>
  );
}
Block.displayName = 'Block';

export default forwardRef(Block);
