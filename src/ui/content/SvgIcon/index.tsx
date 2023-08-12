import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

export type SvgProps = BoxProps & React.SVGProps<SVGSVGElement> 

type IndexProps = {
  /**
   * Required: for the container `<svg>` element. Example: `0 0 439.2 442.6`
   */
  viewBox: string;
  /**
   * Required: `<path>` or `<g>` or other children for the `<svg>` element
   */
  children: React.ReactNode;
};

export default function Index({viewBox, children, style, ...props}: SvgProps & IndexProps) {
  // this is logic, props are written out the long way intentionally 
  let width = props.width || '1em';
  let height = props.height || '1em';
  if (props.width && !props.height) {
    height = width;
  } else if (props.height && !props.width) {
    width = height;
  }
  if (typeof height === 'number') {
    height = `${height}px`;
  }
  if (typeof width === 'number') {
    width = `${width}px`;
  }
  return (
    <Box 
      fill="none"
      height={height}
      x="0px"
      y="0px"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      style={{
        width,
        height,
        ...(style || {}),
      }}
      {...props}
      component="svg"
    >
      {children}
    </Box>
  );
}
