import React, { useState } from 'react';
import MuiSlider, { SliderProps } from '@mui/material/Slider';
import Tooltip from '@techytools/uui/components/form/Tooltip';
import styledProps from './styledProps';

type Modify<T, R> = Omit<T, keyof R> & R;
export type Props = Modify<
  SliderProps,
  {
    name?: string;
    type?: string;
    label?: string | React.ReactNode;
    suffix?: string | React.ReactNode;
    endAdornment?: string | React.ReactNode;
    prefix?: string | React.ReactNode;
    startAdornment?: string | React.ReactNode;
    min?: number;
    max?: number;
    step?: number;
    className?: string;
    classNameLabel?: string;
    classNameInput?: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    info?: string | React.ReactNode;
    infoAbove?: boolean;
    infoBelow?: boolean;
    size?: SliderProps['size'] | 'tiny';
  }
>;

export function Slider(props: Props) {
  let {
    name,
    type,
    label,
    suffix,
    endAdornment,
    prefix,
    startAdornment,
    min,
    max,
    className,
    classNameLabel,
    classNameInput,
    onClick,
    step = 1,
    info,
    infoAbove,
    sx = {},
    infoBelow,
    inputProps = {},
    size,
    ...rest
  } = styledProps(props);
  const [value, setValue] = useState(0);
  function handleChange(e: any, value: any, activeThumb: number) {
    // controlled input
    let num = value;
    if (max !== undefined && num > max) {
      num = max;
    }
    if (min !== undefined && num < min) {
      num = min;
    }
    if (step !== undefined) {
      let decimals = countDecimals(step);
      num = Number(num.toFixed(decimals));
    }
    // done fixing input
    setValue(num);
  }

  return (
    <div
      className={className}
      // sx={{
      //   'label': 'FormSlider',
      //   ':hover:not(:focus-within)': {
      //     fieldset: {
      //       borderColor: '#fff !important',
      //     },
      //     label: {
      //       color: '#fff !important',
      //     },
      //   },
      //   'height': '1.5rem',
      //   'lineHeight': '1.25rem',
      //   '::placeholder': {
      //     m: '0',
      //     height: '1.25rem',
      //     lineHeight: '1.25rem',
      //   },
      // }}
      // variant="outlined"
    >
      {/* <InputLabel
        htmlFor="outlined-adornment-text"
        size="small"
        sx={{
          'height': '1.5rem',
          'lineHeight': '1.25rem',
          'm': '0',
          'top': '-0.10rem !important',
          '@media (max-width: 767px)': {
            left: '0 !important',
            px: '0 !important',
            maxWidth: '110% !important',
          },
          '&.MuiInputLabel-shrink': {
            top: '-0.25rem !important',
          },
        }}
        className={classNameLabel}
      >
        {label}
      </InputLabel> */}
      <MuiSlider
        // sx={{
        //   legend: {
        //     fontSize: '0.8em',
        //     span: {
        //       fontSize: '1em',
        //     },
        //   },
        //   m: '0',
        //   height: '1.5rem',
        //   lineHeight: '1.25rem',
        // }}
        sx={sx}
        size="small"
        // label={label}
        onChange={handleChange}
        defaultValue={value}
        // inputProps={{
        //   min,
        //   max,
        //   step,
        //   name,
        //   ...inputProps,
        // }}
        // onMouseDown={
        //   onClick
        //     ? (e) => {
        //         onClick(e);
        //       }
        //     : undefined
        // }
        // className={classNameInput}
        {...rest}
      />
      {!!info && (
        <Tooltip above={infoAbove} below={infoBelow}>
          {info}
        </Tooltip>
      )}
    </div>
  );
}

function countDecimals(number: number) {
  let str = number.toString();
  let separator = str.includes(',') ? ',' : '.';
  let parts = str.split(separator);
  return parts[1] ? parts[1].length : 0;
}

export default Slider;
