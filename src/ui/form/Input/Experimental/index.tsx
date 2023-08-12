import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Slider, { SliderProps } from '@mui/material/Slider';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@techytools/uui/components/form/Tooltip';
import fraction_to_range from '@techytools/fn/io/num/fraction_to_range';
import fraction_from_range from '@techytools/fn/io/num/fraction_from_range';
import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material/TextField';

type Props = TextFieldProps & {
  sxInput?: TextFieldProps['sx'];
  sxLabel?: TextFieldProps['sx'];
  InputProps?: TextFieldProps['InputProps'];
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
  inputProps?: OutlinedInputProps;
  sliderProps?: SliderProps;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  info?: string | React.ReactNode;
  infoAbove?: boolean;
  infoBelow?: boolean;
  slider?: boolean;
};

export function FormInput({
  FormHelperTextProps,
  InputProps,
  name,
  type,
  label,
  suffix,
  endAdornment,
  prefix,
  startAdornment,
  min = 0,
  max = 100,
  className,
  classNameLabel,
  classNameInput,
  onClick,
  step = 1,
  info,
  infoAbove,
  infoBelow,
  inputProps = {},
  sliderProps = {},
  slider,
  value: initialValue,
  ...rest
}: Props) {
  const [value, setValue] = useState(initialValue);
  const [sliderValue, setSliderValue] = useState(
    slider ? fraction_from_range(Number(initialValue), [min, max]) : 0
  );

  function handleChangeString(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('handleChangeString', event.target.value);
    // @ts-ignore tsFixMe - don't have time to figure out all the subtle Event differences rn
    handleChangeString(event.target.value);
    setValue(event.target.value);
  }
  function handleChangeNumber(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('handleChangeNumber', event.target.value);
    let num = Number(event.target.value);
    if (max !== undefined && num > max) {
      num = max;
    }
    if (min !== undefined && num < min) {
      num = min;
    }
    // round num to step
    num = Math.round(num / step) * step;
    let decimals = countDecimals(step);
    setValue(num.toFixed(decimals) + '');
    setSliderValue(fraction_from_range(num, [min, max]) * 100);
  }
  function handleChangeSlider(event: any, percent: number) {
    let number = percent / 100;
    console.log('handleChangeSlider', event.target.value, number);
    setSliderValue(percent);
    setValue(fraction_to_range(number, [min, max, step]));
  }

  const handleFocus = (e: any) => {
    setTimeout(() => {
      e.target.select();
    }, 0);
  };
  return (
    <TextField
      value={value}
      onChange={type === 'number' ? handleChangeNumber : handleChangeString}
      onKeyDown={(e) => {
        // Parse number
        if (type === 'number') {
          // Default @mui up/down can only go up by 1, not step
          if (e.key === 'Up' || e.key === 'Down') {
            // only affects <input type="number"
            e.preventDefault();
            let num = Number(value);
            if (e.key === 'Up') {
              num += step;
            }
            if (e.key === 'Down') {
              num -= step;
            }
            handleChangeNumber({
              target: {
                value: num,
              },
            } as any);
          }
        }
      }}
      size="small"
      id="outlined-adornment-text"
      type={type === 'number' ? 'text' : type}
      label={label}
      sx={{
        'color': 'rgba(255,255,255,0.25)',
        ':hover,:target,:active,:focus,:focus-within,:focus-visible': {
          color: 'orange !important',
        },
        'label': 'FormTextarea',
        // ':hover:not(:focus-within)': {
        //   fieldset: {
        //     borderColor: '#fff !important',
        //   },
        //   label: {
        //     color: '#fff !important',
        //   },
        // },
        'minHeight': '1.5rem',
        'lineHeight': '1.25rem',
        '::placeholder': {
          m: '0',
          height: '1.25rem',
          lineHeight: '1.25rem',
        },
      }}
      InputProps={{
        onFocus: handleFocus,
        startAdornment:
          prefix || startAdornment ? (
            <InputAdornment position="start">
              {prefix || startAdornment}
            </InputAdornment>
          ) : undefined,
        endAdornment:
          suffix || endAdornment ? (
            <InputAdornment position="end">
              {suffix || endAdornment}
            </InputAdornment>
          ) : undefined,
        ...InputProps,
        // onMouseDown:{
        //   onClick
        //     ? (e) => {
        //         onClick(e);
        //       }
        //     : undefined
        // },
        // min,
        // max,
        // step,
        name,
        sx: {
          legend: {
            fontSize: '0.8em',
            span: {
              fontSize: '1em',
            },
          },
          m: '0',
          height: '1.5rem',
          lineHeight: '1.25rem',
          borderBottomRightRadius: '0px !important',
          borderBottomLeftRadius: '0px !important',
          borderBottom: '0 !important',
          mb: '-1px !important',
          ...(InputProps?.sx || {}),
        },
      }}
      FormHelperTextProps={{
        ...FormHelperTextProps,
        sx: {
          '&, *': {
            m: '0.25rem 0 0',
            p: '0',
            lineHeight: '0.75rem',
            fontSize: '0.563rem',
            textAlign: 'left',
            width: '100%',
          },
          ...(FormHelperTextProps?.sx || {}),
        },
      }}
      helperText={
        <Slider
          name={name}
          min={0}
          max={100}
          step={0.01}
          size="small"
          // @ts-ignore - not even using the event (1st argument), don't care what type it is
          onChange={handleChangeSlider}
          value={sliderValue}
          {...sliderProps}
          sx={{
            'color': 'inherit',
            'overflow': 'visible',
            'borderRadius': 'var(--mui-shape-borderRadius)',
            'borderTopRightRadius': '0px',
            'borderTopLeftRadius': '0px',
            'height': '10px',
            'width': 'calc(100% - 10px)',
            'm': '0 5px',
            'p': '0',
            'backgroundColor': 'transparent !important',
            '.MuiSlider-rail': {
              opacity: '1',
              border: 'solid 1px currentColor',
              borderTop: 'none',
              background: 'none',
              borderTopRightRadius: '0px',
              borderTopLeftRadius: '0px',
              overflow: 'hidden',
              height: '10px',
              width: 'calc(100% + 10px)',
              ml: '-5px',
            },
            '.MuiSlider-track': {
              background: 'none !important',
              height: '10px',
              borderRadius: 'var(--mui-shape-borderRadius)',
              borderTopRightRadius: '0px',
              borderTopLeftRadius: '0px',
              borderBottomRightRadius: '0px',
            },
            '.MuiSlider-thumb': {
              'width': '10px',
              'height': '10px',
              'boxShadow': 'none',
              '&::after,&::before': {
                display: 'none',
              },
            },
            ...(sliderProps.sx || {}),
          }}
        />
      }
      {...rest}
    />
  );
}

function countDecimals(number) {
  let str = number.toString();
  let separator = str.includes(',') ? ',' : '.';
  let parts = str.split(separator);

  return parts.length === 2 ? parts[1].length : 0;
}

export default FormInput;
