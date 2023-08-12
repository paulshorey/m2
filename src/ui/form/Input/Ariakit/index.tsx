import { TextareaHTMLAttributes, ReactElement, memo, forwardRef } from 'react';
import { FormError, FormInput, FormLabel } from 'ariakit/form';
// @ts-ignore
import styles from './index.module.scss';

export type variant = 'xs' | 'sm' | 'lg' | 'xl' | 'round' | 'text';
export type Props = TextareaHTMLAttributes<
  HTMLElement & HTMLTextAreaElement
> & {
  /**
   * Will be shown above the Textarea element.
   */
  label?: ReactElement | string | number;
  variant?: variant;
  variants?: variant[];
  form?: {
    names: {
      name: string;
    };
  };
};

/**
 * Textarea. Pass variant such as "primary", "outlined", "cancel", or "disabled"
 */
export const Component = (
  { className = '', form, name, label, variant, variants = [] }: Props,
  ref: any
) => {
  let classNames = variants;
  if (variant) {
    classNames?.push(variant);
  }
  let fieldName = name || form?.names?.name || '';
  return (
    <span
      className={
        styles.default +
        (classNames?.length
          ? ' ' + classNames.map((c) => styles[c]).join(' ')
          : '')
      }
    >
      {!!label && <FormLabel name={fieldName}>{label}</FormLabel>}
      <FormInput ref={ref} name={fieldName} />
      {!!form?.names?.name && (
        <FormError as="span" name={fieldName} className={styles.error} />
      )}
    </span>
  );
};

export default memo(forwardRef(Component));
