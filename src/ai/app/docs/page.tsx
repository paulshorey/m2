'use client';

import React, { memo } from 'react';
import ThemeProvider from '@techytools/uui/components/client/ThemeProvider';
// import ListButtons from '#/components/ui/ListButtons';
import SidebarTreeMenu from '@techytools/uui/components/client/SidebarTreeMenu';

function Page() {
  return (
    <ThemeProvider>
      <SidebarTreeMenu />
    </ThemeProvider>
  );
}

export default memo(Page);
