import React from 'react';
import Svg, { SvgProps } from '.';

export type Props = SvgProps

export default function SvgIcon(props: Props) {
  return (
    <Svg  
      viewBox="0 0 38.71 37.51"
      {...props}
    >
      <path
        fill="currentColor"
        d="m38.13,34.21l-12.44-11.96c4.19-5.96,3.18-14.23-2.51-18.97C17.18-1.72,8.27-.91,3.27,5.09s-4.18,14.91,1.81,19.9c5.21,4.34,12.76,4.36,17.99.07l12.37,11.9c.76.74,1.98.72,2.72-.04.74-.76.72-1.98-.04-2.72ZM3.45,14.15c0-5.91,4.79-10.7,10.7-10.7s10.7,4.79,10.7,10.7-4.79,10.7-10.7,10.7c-5.91,0-10.69-4.79-10.7-10.7Z"
      />
    </Svg>
  );
}
