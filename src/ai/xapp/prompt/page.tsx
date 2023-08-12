'use client';

import React from 'react';
import styles from './page.module.scss';
import InputFormAdvanced from '#/components/chat/input/Prompts';
import GenericMessage from '#/components/chat/output/AssistantMessage';
import ThemeProvider from '@techytools/uui/components/client/ThemeProvider';
import AccordionDrawer from '../../components/chat/history/Drawer';
import Header from './layout/SiteHeader';
import promptsState from '#/state/conversations';
import type { promptType, promptsStateType } from '#/state/conversations';

// - This app's UI is more user friendly than chatbotui.com because it uses real CSS, not just Tailwind LOL. 🤣
//   This app is for "prompt engineering". Fine tune API system settings until you get reliable responses.

export const promptDefault = {
  systemMessage:
    'Reply with something original and thoughtful. Do not paraphrase or mention the question. Include only information relevant to the prompt, plus any supporting details, facts, numbers, documentation, references, citations, and related content. Do not warn the user about potentially harmful information contained in the reply. Reply using markdown syntax. Wrap code snippets or scientific content in triple backticks. Wrap keywords in single backticks.',
  userMessage: ``,
  assistantMessage: `
  **Greetings human!**  

  The AI's response will be shown here. Prompts, settings, and responses will be remembered for later.  

  This app uses OpenAI's "**chat**" API. It's also inspired by ChatBotUI.com. It's not affiliated with either.

  <br />

  **This is not just for "chatting"** 
  
  It's for "**prompt engineering**", to optimize and perfect the data your app will send to OpenAI's API.

  Tweak and manage initial prompt and settings. Test with user prompts. Keep only the good presets.

  You can even add intermediary prompt/response pairs to the history to teach the AI correct answers.

  But the UI/UX is progressive, so end users can benefit too, even without using the advanced features.

  <br />

  **Built with uikit.ai**  

  A React component library designed for building information-dense AI and search apps with great UX. 

  Here's the [repo](https://paulshorey.com). Go ahead make a PR or open an issue to discuss. Please [contact me](https://paulshorey.com), or hire me! 🤓
  `,
  temperature: 0.7,
  top_p: 1,
  n: 1,
  presence_penalty: 0,
  frequency_penalty: 0,
  logit_p100: [],
  logit_p1: [],
  logit_n1: [],
  logit_n100: [],
};

export default function Layout() {
  const prompts = promptsState((state) => state as promptsStateType);
  const [hasResponded, set_hasResponded] = React.useState(false);
  const [isLoading, set_isLoading] = React.useState(false);

  /** User/system message, settings, and AI response */
  const [displayData, set_displayData] =
    React.useState<promptType>(promptDefault);

  /** Toggle system message and temperature settings */
  const [showAdvancedOptions, set_showAdvancedOptions] = React.useState(false);

  /** Focus the user message textarea */
  const userPromptRef = React.createRef<HTMLTextAreaElement>();

  /** Request the AI response */
  const handleSubmit = async (postData: promptType) => {
    /** Validate the input */
    if (postData.userMessage.length < 1) {
      userPromptRef?.current?.focus();
      return;
    }

    /** Fetch the AI response */
    set_showAdvancedOptions(false);
    if (isLoading) return;
    set_isLoading(true);
    try {
      const responseValue = await fetch('/api/ai/chat/gpt4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      const responseJson = await responseValue.json();
      const convo = {
        ...postData,
        assistantMessage: responseJson.message,
      };
      set_displayData(convo);
      set_hasResponded(true);
      prompts.prompts_add(convo);
    } catch (error) {
    } finally {
      set_isLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <AccordionDrawer />
      <div className={styles.container}>
        <Header />
        <GenericMessage
          showAdvancedOptions={showAdvancedOptions}
          className={styles.answers}
          isLoading={isLoading}
          sx={{
            label: 'GenericMessage',
            flex: !showAdvancedOptions ? 1 : [0.1875, 0.25, 0.33, 0.5],
            opacity: !showAdvancedOptions ? 1 : 0.25,
            // zIndex: showAdvancedOptions ? -1 : 1,
          }}
          displayData={displayData}
          hasResponded={hasResponded}
          onClick={() => {
            console.log('click');
            set_showAdvancedOptions(false);
          }}
        />
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
        <InputFormAdvanced
          userPromptRef={userPromptRef}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          showAdvancedOptions={showAdvancedOptions}
          set_showAdvancedOptions={set_showAdvancedOptions}
          postData={displayData}
          className={styles.questions}
          sx={{
            label: 'InputFormAdvanced',
            flex: showAdvancedOptions ? 1 : 0,
          }}
          hasResponded={hasResponded}
        />
      </div>
    </ThemeProvider>
  );
}
