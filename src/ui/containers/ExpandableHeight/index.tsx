import Box, { BoxProps } from '@mui/material/Box';
import { useState, memo, forwardRef, ComponentProps } from 'react';
// @ts-ignore
import styles from './index.module.scss';

export type Props = BoxProps & {
  /**
   * Supports any `display:block` tag, plus `span` and `a`. Default is `div`.
   * Does not support form inputs (with focus) or iframes.
   */
  as?:
    | 'div'
    | 'span'
    | 'p'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'blockquote'
    | 'a'
    | 'ul'
    | 'ol'
    | 'li'
    | 'td'
    | 'figure'
    | 'form';
  variant?: 'horizontal' | 'vertical';
  hover?: boolean;
  click?: boolean;
};

export const ExpandableHeight = (props: Props, ref: any) => {
  /*
   * Logic
   */
  let {
    children,
    as = 'div',
    variant = 'vertical',
    hover,
    click,
    className,
    ...rest
  } = props;
  const [clicked, setClicked] = useState(false);
  const [ariaHidden, setAriaHidden] = useState<undefined | boolean>(undefined);
  const handleClick = () => {
    setAriaHidden(clicked);
    setClicked(!clicked);
  };
  /*
   * Style
   */
  if (styles.default) {
    className += ' ' + styles.default;
  }
  if (hover && styles.hover) {
    className += ' ' + styles.hover;
  }
  if (variant && styles[variant]) {
    className += ' ' + styles[variant];
  }
  /*
   * Markup
   */
  // const Tag = `${as}` as any;
  return (
    <Box
      className={styles.expandableAnimationWrapper}
      ref={ref}
      aria-hidden={ariaHidden}
      onClick={click ? handleClick : undefined}
      {...rest}
    >
      <div className={styles.expandableAnimation}>
        <div className={styles.expandableTransformWrapper}>
          <div className={styles.expandableContent}>{children}</div>
        </div>
      </div>
    </Box>
  );
};
ExpandableHeight.displayName = 'Expandable';

export default memo(forwardRef(ExpandableHeight));
