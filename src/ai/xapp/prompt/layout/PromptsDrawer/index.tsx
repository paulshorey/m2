import React from 'react';
import TemporaryDrawer from '../TemporaryDrawer';
import styles from './index.module.scss';

const PromptsDrawer = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => {
          console.log('onClick');
          setOpen(!open);
        }}
      >
        {open ? 'Close' : 'Prompts'}
      </button>
      <TemporaryDrawer
        anchor="right"
        open={open}
        onClose={() => {
          console.log('onClose');
          setOpen(false);
        }}
      >
        {' '}
      </TemporaryDrawer>
    </div>
  );
};

export default PromptsDrawer;
