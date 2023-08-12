import React from 'react';
import styles from './index.module.scss';

type Props = React.ComponentPropsWithoutRef<'span'> & {
  label?: string | React.ReactNode;
  open?: boolean;
  placement?: 'left' | 'right';
};

export default function TooltipTextarea({
  label = null,
  children,
  placement = 'right',
  open = false,
}: Props) {
  return (
    <span className={styles.targetContainer}>
      {children}
      <span
        className={styles.tooltipContainer}
        style={{ display: open ? 'inline-block' : 'none' }}
      >
        <span className={styles.tooltip}>
          <span className={styles.tooltipArrowContainer}>
            <span className={styles.tooltipArrow}> </span>
          </span>
          <span className={styles.tooltipContent}>{label}</span>
        </span>
      </span>
    </span>
  );
}
