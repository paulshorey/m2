'use client';

import React, { memo } from 'react';
import styles from './page.module.scss';
// import Prompts from '#/components/chat/input/Prompts/dynamic';
// import AssistantMessage from '#/components/chat/output/AssistantMessage';
import ThemeProvider from '@techytools/uui/components/client/ThemeProvider';
import AccordionDrawer from '../../components/chat/history/Drawer';
import Header from '../../components/layout/SiteHeader';
import { chatStore, type chatState } from '#/state/chat';

function Layout() {
  return (
    <ThemeProvider>
      <AccordionDrawer />
      <div className={styles.container}>
        <Header pagePath={'chat'} />
      </div>
    </ThemeProvider>
  );
}

export default memo(Layout);
