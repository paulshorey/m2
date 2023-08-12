import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Slider, { SliderProps } from '@mui/material/Slider';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@techytools/uui/components/form/Tooltip';
import fraction_to_range from '@techytools/fn/io/num/fraction_to_range';
import fraction_from_range from '@techytools/fn/io/num/fraction_from_range';
import count_decimals from '@techytools/fn/io/num/count_decimals';
import FormHelperText, {
  FormHelperTextProps,
} from '@mui/material/FormHelperText';

// type Modify<T, R> = Omit<T, keyof R> & R;
type Props = OutlinedInputProps & {
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
  showSlider?: boolean;
  FormHelperTextProps?: FormHelperTextProps;
  helperText?: string | React.ReactNode;
  errorText?: string | React.ReactNode;
};

export default function FormText({
  FormHelperTextProps,
  helperText,
  errorText,
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
  showSlider,
  value: initialValue,
  ...rest
}: Props) {
  const [value, setValue] = useState(initialValue);
  const [sliderValue, setSliderValue] = useState(
    type === 'number' && showSlider
      ? fraction_from_range(Number(initialValue), [min, max]) * 100
      : 50
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
    num = Math.round(num / step) * step; // round num to step
    let str = num.toFixed(count_decimals(step)) + '';
    str = str.replace(/\.?0+$/, ''); // remove trailing zeros
    setValue(str);
    // update slider
    setSliderValue(fraction_from_range(num, [min, max]) * 100);
  }
  function handleChangeSlider(event: any, percent: number) {
    setSliderValue(percent);
    // update number field
    let str = fraction_to_range(percent / 100, [min, max, step]);
    console.log('handleChangeSlider', event.target.value, str);
    setValue(str);
  }

  return (
    <FormControl
      className={className}
      sx={{
        'color': 'rgba(255,255,255,0.25)',
        ':focus,:focus-within,:focus-visible': {
          color: 'orange !important',
        },
        'label': 'FormTextarea',
        'minHeight': '1.5rem',
        'lineHeight': '1.25rem',
        '::placeholder': {
          m: '0',
          height: '1.25rem',
          lineHeight: '1.25rem',
        },
        ...rest.sx,
      }}
      variant="outlined"
    >
      <InputLabel
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
      </InputLabel>
      <OutlinedInput
        sx={{
          legend: {
            fontSize: '0.8em',
            span: {
              fontSize: '1em',
            },
          },
          m: '0',
          height: '1.5rem',
          lineHeight: '1.25rem',
          borderBottomRightRadius: showSlider ? '0px !important' : undefined,
          borderBottomLeftRadius: showSlider ? '0px !important' : undefined,
          borderBottom: '0 !important',
          mb: '-1px !important',
        }}
        size="small"
        id="outlined-adornment-text"
        type={type || 'text'}
        endAdornment={
          suffix || endAdornment ? (
            <InputAdornment position="end">
              {suffix || endAdornment}
            </InputAdornment>
          ) : undefined
        }
        startAdornment={
          prefix || startAdornment ? (
            <InputAdornment position="start">
              {prefix || startAdornment}
            </InputAdornment>
          ) : undefined
        }
        {...rest}
        label={label}
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
        value={value}
        inputProps={{
          min,
          max,
          step,
          name,
          ...inputProps,
        }}
        onMouseDown={
          onClick
            ? (e) => {
                onClick(e);
              }
            : undefined
        }
        className={classNameInput}
      />
      {!!showSlider && type === 'number' && (
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
      )}
      {!!info && (
        <Tooltip above={infoAbove} below={infoBelow}>
          {info}
        </Tooltip>
      )}
      {/* <FormHelperText
        {...FormHelperTextProps}
        sx={{
          '&, *': {
            m: '0.25rem 0 0',
            p: '0',
            lineHeight: '0.75rem',
            fontSize: '0.563rem',
            textAlign: 'left',
            width: '100%',
          },
          ...(FormHelperTextProps?.sx || {}),
        }}
      >
        {false ? errorText : helperText}
      </FormHelperText> */}
    </FormControl>
  );
}
