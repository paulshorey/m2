import styles from './index.module.scss';
import Block from '@techytools/uui/components/client/Block';
import React from 'react';
import SystemSettings from './SystemSettings';
import SystemMessage from './SystemMessage';
import UserMessage from './UserMessage';
import PageWidth from '@techytools/uui/components/server/PageWidth';
// import AddConversation from './AddConversation';

export default function Prompts({
  userPromptRef,
  postData: presets,
  isLoading,
  showAdvancedOptions,
  set_showAdvancedOptions,
  onSubmit,
  ...rest
}) {
  const [postData, set_postData] = React.useState(presets);
  const handleSubmit = (e: any) => {
    e?.preventDefault();
    onSubmit(postData);
  };
  /** Keep track of all form fields in one object */
  const handleChange = (
    e: any,
    percent?: { min: number; max: number; step: number },
  ) => {
    let { name, value } = e.target;
    // if using slider instead of typing into the field
    if (percent) {
      // convert percentage 0-100 to the correct value
      value = (percent.max - percent.min) * (value / 100) + percent.min;
      // round to nearest step
      const stepDecimalPoints = percent.step.toString().split('.')[1]?.length;
      value = Number(
        (Math.round(value / percent.step) * percent.step).toFixed(
          stepDecimalPoints,
        ),
      );
    }
    // console.log('change', [name, value]);
    set_postData({ ...postData, [name]: value });
  };
  /** Toggle advanced options */
  const toggleShowAdvancedOptions = () => {
    set_showAdvancedOptions(!showAdvancedOptions);
  };
  return (
    <Block
      {...rest}
      data-component="prompt-input-Prompts"
      className={styles.container}
      sx={{
        flex: showAdvancedOptions ? 1 : 0,
        transition: 'padding-top 0.6s ease-in, padding-bottom 0.6s ease-in',
      }}
    >
      <div
        className={styles.rainbowGradient}
        style={{
          display: isLoading ? 'block' : 'none',
          position: 'absolute',
          top: '-1px',
          height: '2px',
          width: '100%',
        }}
      />
      <PageWidth
        pageWidth="lg"
        sx={{
          position: 'relative',
          height: '100%',
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <SystemSettings
          showAdvancedOptions={showAdvancedOptions}
          postData={postData}
          handleChange={handleChange}
        />
        <SystemMessage
          showAdvancedOptions={showAdvancedOptions}
          postData={postData}
          handleChange={handleChange}
        />
        <UserMessage
          userPromptRef={userPromptRef}
          showAdvancedOptions={showAdvancedOptions}
          postData={postData}
          handleChange={handleChange}
          className={styles.systemSettings}
          handleSubmit={handleSubmit}
          toggleShowAdvancedOptions={toggleShowAdvancedOptions}
        />
      </PageWidth>
    </Block>
  );
}
