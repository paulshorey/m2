import React, { forwardRef } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
// @ts-ignore
// import styles from './index.module.scss';
import validMuiProps from '@techytools/uui/functions/validMuiProps';

export type InlineProps = BoxProps & {
  as?: React.ElementType;
};
function Inline({ as, component, children, ...rest }: InlineProps, ref: any) {
  return (
    <Box
      ref={ref}
      // Using 'span' as default, because 'div' often can not be rendered inside <p>, etc.
      component={component || as || 'span'}
      {...validMuiProps(rest)}
    >
      {children}
    </Box>
  );
}
Inline.displayName = 'Inline';

export default forwardRef(Inline);
