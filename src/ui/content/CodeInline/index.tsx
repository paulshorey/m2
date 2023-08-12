import { memo, forwardRef, ComponentProps } from 'react';
// @ts-ignore
import styles from './index.module.scss';

export type Props = ComponentProps<'code'> & {
  /**
   * The string to display. Special characters will be automatically escaped when rendered to HTML.
   */
  code?: string;
  variant?: string;
};

export const CodeInline = (props: Props, ref: any) => {
  let { code, children, variant, className, ...rest } = props;
  /*
   * Style
   */
  if (styles.default) {
    className += ' ' + styles.default;
  }
  if (variant && styles[variant]) {
    className += ' ' + styles[variant];
  }
  return (
    <code ref={ref} className={className} {...rest}>
      <span>{code || children}</span>
    </code>
  );
};
CodeInline.displayName = 'CodeInline';

export default memo(forwardRef(CodeInline));
