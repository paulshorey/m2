'use client';
import Inline from '@techytools/uui/components/atoms/v1/containers/Inline';
import React, { useEffect } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';
// @ts-ignore
// import styles from './index.module.scss';

// type Modify<T, R> = Omit<T, keyof R> & R;
type Props = TextFieldProps & {
  type?: string;
  label?: string;
  ButtonsLeft?: string | React.ReactNode;
  ButtonsRight?: string | React.ReactNode;
  /**
   * If passing a React Component to ButtonsLeft, ButtonsRight, or helperText,
   * those components will be rendered only once! Will not be reactive!
   * To trigger them to update, set buttonsRerender to a new value or reference.
   */
  buttonsRerender?: any;
  suffix?: string | React.ReactNode;
  endAdornment?: string | React.ReactNode;
  prefix?: string | React.ReactNode;
  startAdornment?: string | React.ReactNode;
  sxInput?: TextFieldProps['sx'];
  sxLabel?: TextFieldProps['sx'];
  info?: string | React.ReactNode;
  infoAbove?: boolean;
  infoBelow?: boolean;
  InputProps?: TextFieldProps['InputProps'];
};

export function FormTextarea(
  {
    buttonsRerender,
    ButtonsLeft,
    ButtonsRight,
    FormHelperTextProps,
    type,
    label,
    suffix,
    endAdornment,
    prefix,
    startAdornment,
    info,
    infoAbove,
    infoBelow,
    InputProps,
    helperText,
    sx,
    ...rest
  }: Props,
  ref: any
) {
  const [HelperText, setHelperText] = React.useState<React.ReactNode | null>(
    null
  );
  // Render a pipe between buttons, one of the items is null/undefined
  for (let Button of [ButtonsLeft, ButtonsRight]) {
    if (Array.isArray(Button)) {
      for (let i in Button) {
        if (Button[i] === null) {
          Button[i] = (
            <Inline key={i} sx={{ padding: '1px 0 0 1px', opacity: '0.5' }}>
              |
            </Inline>
          );
        }
      }
    }
  }
  useEffect(() => {
    setHelperText(
      <Inline
        sx={{
          position: 'relative',
          display: 'flex',
          height: '0',
          pointerEvents: 'none',
        }}
      >
        <Inline
          sx={{
            position: 'absolute',
            top: '-1.7rem',
            left: '0.33rem',
            pointerEvents: 'all',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          {ButtonsLeft}
        </Inline>
        <Inline
          sx={{
            '&, & *': {
              position: 'relative !important',
              maxHeight: '1rem !important',
              lineHeight: '1.25rem !important',
              fontSize: '0.563rem !important',
              overflow: 'hidden !important',
              margin: '0 !important',
              padding: '0 !important',
              textAlign: 'right !important',
              whiteSpace: 'nowrap !important',
            },
            '*': {
              margin: '0 0 0 0.25rem !important',
              display: 'inline-block !important',
            },
          }}
        >
          {helperText}
        </Inline>
        <Inline
          sx={{
            position: 'absolute',
            top: '-1.7rem',
            right: '0.33rem',
            pointerEvents: 'all',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          {ButtonsRight}
        </Inline>
      </Inline>
    );
  }, [helperText, buttonsRerender]);
  const handleFocus = (e: any) => {
    e.target.select();
  };
  return (
    <TextField
      multiline
      size="small"
      type={'text'}
      label={label}
      inputRef={ref}
      InputProps={{
        onFocus: handleFocus,
        // startAdornment:
        //   prefix || startAdornment ? (
        //     <InputAdornment position="start">
        //       {prefix || startAdornment}
        //     </InputAdornment>
        //   ) : undefined,
        // endAdornment:
        //   suffix || endAdornment ? (
        //     <InputAdornment position="end">
        //       {suffix || endAdornment}
        //     </InputAdornment>
        //   ) : undefined,
        ...InputProps,
        sx: {
          width: '100%',
          height: '100% !important',
          flex: '1',
          overflow: 'auto',
          padding: '0 !important',
          textarea: {
            padding: '12px 14px 8px !important',
            textIndent: '0 !important',
            width: '100%',
            overflow: 'auto',
            lineHeight: '1.75',
          },
          ...(InputProps?.sx || {}),
        },
      }}
      FormHelperTextProps={{
        ...FormHelperTextProps,
        sx: {
          m: '0',
          p: '0',
          lineHeight: '0.75rem',
          fontSize: '0.563rem',
          textAlign: 'right',
          width: '100%',
          ...(FormHelperTextProps?.sx || {}),
        },
      }}
      helperText={HelperText}
      {...rest}
      sx={{
        ...sx,
        'label[data-shrink="false"]': {
          marginTop: '7px',
        },
      }}
    />
  );
}
FormTextarea.displayName = 'FormTextarea';

export default React.forwardRef(FormTextarea);
