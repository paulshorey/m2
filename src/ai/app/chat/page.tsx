'use client';

import React, { memo } from 'react';
import styles from './page.module.scss';
// import Prompts from '#/components/chat/input/Prompts/dynamic';
// import AssistantMessage from '#/components/chat/output/AssistantMessage';
import ThemeProvider from '@techytools/ui/v1/utilities/ThemeProvider';
import AccordionDrawer from '@techytools/ai/components/chat/history/Drawer';
import Header from '@techytools/ai/components/layout/SiteHeader';
import { chatStore, type chatState } from '#/state/chat';

function Layout() {
  const chat = chatStore((state) => state as chatState);

  /** Toggle system message and temperature settings */
  const [showAdvancedOptions, set_showAdvancedOptions] = React.useState(false);

  /** Focus the user message textarea */
  const userPromptRef = React.createRef<HTMLTextAreaElement>();

  /** Submit */
  const handleSubmit = async (postData: any) => {
    /** Validate */
    if (postData.userMessage.length < 1) {
      userPromptRef?.current?.focus();
      return;
    }
    /** Submit results */
    // chat.submit_message({})
    /** Cleanup after submit */
    set_showAdvancedOptions(false);
  };

  return (
    <ThemeProvider>
      <AccordionDrawer />
      <div className={styles.container}>
        <Header pagePath={'chat'} />
        {/* <AssistantMessage
          showAdvancedOptions={showAdvancedOptions}
          isLoading={isLoading}
          hasResponded={hasResponded}
          onClick={() => {
            set_showAdvancedOptions(false);
          }}
        /> */}
        {/* <div
          className={styles.overlay}
          style={{
            // opacity: showAdvancedOptions ? 1 : 0,
            pointerEvents: showAdvancedOptions ? 'auto' : 'none',
          }}
          onClick={() => {
            set_showAdvancedOptions(false);
          }}
        /> */}
        {/* <Prompts
          userPromptRef={userPromptRef}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          showAdvancedOptions={showAdvancedOptions}
          set_showAdvancedOptions={set_showAdvancedOptions}
          hasResponded={hasResponded}
        /> */}
      </div>
    </ThemeProvider>
  );
}

export default memo(Layout);
