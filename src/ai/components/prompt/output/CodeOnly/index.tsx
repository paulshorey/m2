import styles from './index.module.scss';
import React from 'react';

export default function ({ message }) {
  const textareaRef: any = React.useRef(null);
  const textareaFocus = React.useCallback(async () => {
    if (textareaRef.current) {
      textareaRef.current.select();

      try {
        await navigator.clipboard.writeText(textareaRef.current.value);
      } catch (err) {
        console.error('Error copying text to clipboard: ', err);
      }
    }
  }, []);
  return (
    <div className={styles.outputCodeOnly}>
      <textarea
        ref={textareaRef}
        onFocus={textareaFocus}
        value={message}
        readOnly
      />
    </div>
  );
}
