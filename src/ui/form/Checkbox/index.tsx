import { InputHTMLAttributes, ReactElement, memo, forwardRef } from 'react';
import { Checkbox } from 'ariakit/checkbox';
// @ts-ignore
import styles from './index.module.scss';
import { ChangeEvent } from 'react';

export type variant = 'xs' | 'sm' | 'lg' | 'xl' | 'round' | 'text';
export type Props = InputHTMLAttributes<HTMLElement & HTMLInputElement> & {
  /**
   * Will be shown above the input element.
   */
  label?: ReactElement | string | number;
  variant?: variant;
  variants?: variant[];
  checked?: boolean;
  value?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Input. Pass variant such as "primary", "outlined", "cancel", or "disabled"
 */
export const Component = (
  {
    label,
    variant,
    variants = [],
    checked,
    onChange,
    value,
  }: Props,
  ref: any
) => {
  let classNames = variants;
  if (variant) {
    classNames?.push(variant);
  }
  return (
    <label
      className={
        styles.default +
        (classNames?.length
          ? ' ' + classNames.map((c) => styles[c]).join(' ')
          : '')
      }
    >
      <Checkbox
        ref={ref}
        checked={
          typeof checked === 'boolean'
            ? checked
            : typeof value === 'boolean'
            ? value
            : false
        }
        onChange={(e) => {
          if (onChange) {
            let syntheticEvent = { ...e } as ChangeEvent<HTMLInputElement>;
            if (syntheticEvent.target.value === 'on') {
              syntheticEvent.target.value =
                e.target.checked === true ? 'true' : '';
            }
            onChange(syntheticEvent);
          }
        }}
      />{' '}
      {label}
    </label>
  );
};

export default memo(forwardRef(Component));
