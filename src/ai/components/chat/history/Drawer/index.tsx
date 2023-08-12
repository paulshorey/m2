import React from 'react';
import TemporaryDrawer from '../../../../xapp/prompt/layout/TemporaryDrawer';
import AccordionLayout from '../DrawerAccordion';
import styles from './index.module.scss';
import { uiStore, type uiState } from '#/state/ui';
import Header from '#/components/ui/Header';
import IconClose from '@phosphor-icons/react/dist/icons/X';
import Button from '@techytools/ui/form/Button';

const AccordionDrawer = () => {
  const ui = uiStore((state) => state as uiState);
  return (
    <div className={styles.container}>
      <TemporaryDrawer
        anchor="right"
        open={ui.openSystemDrawer}
        onClose={() => {
          console.log('onClose');
          ui.openSystemDrawer_toggle();
        }}
      >
        <Header
          ChildrenRight={
            <Button
              isIcon
              variant="text"
              sx={{ mx: '-3px', mt: '2px' }}
              onClick={() => {
                ui.openSystemDrawer_toggle();
              }}
            >
              <IconClose
                width={24}
                height={24}
                weight="bold"
                color="var(--mui-palette-primary-light)"
              />
            </Button>
          }
          ChildrenLeft={
            <div>
              More from <a href="">techy.tools</a>:
            </div>
          }
        />
        <AccordionLayout />
      </TemporaryDrawer>
    </div>
  );
};

export default AccordionDrawer;
