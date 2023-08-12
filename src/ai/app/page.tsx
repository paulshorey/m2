'use client';

import React, { memo } from 'react';
import styles from './prompt/page.module.scss';
import ThemeProvider from '@techytools/uui/components/client/ThemeProvider';
import Header from '../components/layout/SiteHeader';
// import ListButtons from '#/components/ui/ListButtons';
import SidebarTreeMenu from '@techytools/uui/components/client/SidebarTreeMenu';

function Page() {
  return (
    <ThemeProvider>
      <div className={styles.container}>
        <Header pagePath={'test'} />
        <SidebarTreeMenu />
      </div>
    </ThemeProvider>
  );
}

export default memo(Page);
