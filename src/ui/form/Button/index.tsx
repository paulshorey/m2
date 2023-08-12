import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
// @ts-ignore
import styles from './index.module.scss';

// type Modify<T, R> = Omit<T, keyof R> & R;
export type ButtonProps = MuiButtonProps & {
  tabIndex?: number;
  label?: string | React.ReactNode;
  children: string | React.ReactNode;
  onClick?: (e?: any) => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'text' | 'outlined' | 'contained' | 'dashed';
  isSubtle?: boolean;
  isTiny?: boolean;
  isRound?: boolean;
  isIcon?: boolean;
  isCompact?: boolean;
};
export function Button(
  {
    tabIndex,
    label,
    className = '',
    children,
    loading = false,
    disabled = false,
    variant = 'outlined',
    onClick,
    sx = {},
    size,
    color = 'secondary',
    isSubtle,
    isTiny,
    isRound,
    isIcon,
    isCompact,
    ...rest
  }: ButtonProps,
  ref: any
) {
  className += ' ' + styles.component;
  if (isSubtle) {
    className += ' ' + styles.isSubtle;
  }
  if (isTiny) {
    className += ' ' + styles.isTiny;
  }
  if (isRound) {
    className += ' ' + styles.isRound;
  }
  if (isIcon) {
    className += ' ' + styles.isIcon;
  }
  if (isCompact) {
    className += ' ' + styles.isCompact;
  }
  return (
    <MuiButton
      color={color}
      className={className}
      data-variant={variant}
      data-color={color}
      ref={ref}
      tabIndex={tabIndex}
      variant={variant}
      size="small"
      onClick={(e) => {
        if (!disabled && onClick) {
          onClick(e);
        }
      }}
      sx={{
        '&&, && > span': {
          color: !disabled
            ? `var(--mui-palette-${color}-main)`
            : `rgb(var(--mui-palette-common-onBackgroundChannel) / 0.44)`,
        },
        // 'opacity': disabled ? 0.5 : 1,
        ...sx,
      }}
      disabled={disabled}
      {...rest}
    >
      {loading ? '...' : label || children || 'Submit'}
    </MuiButton>
  );
}
Button.componentName = 'FormButton';

export default React.forwardRef(Button);
