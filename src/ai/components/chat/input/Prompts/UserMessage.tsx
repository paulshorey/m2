import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import FormTextarea from '@techytools/uui/components/form/Textarea';
import Expandable from '@techytools/uui/components/server/ExpandableHeight';
import Button from '@techytools/uui/components/form/Button';
// import Inline from '@techytools/uui/components/client/Inline';
// import IconSettingsShow from '@techytools/uui/components/server/Icon/CornersOut';
import IconSettingsShow from '@phosphor-icons/react/dist/icons/CornersOut';
import IconSettingsArrow from '@phosphor-icons/react/dist/icons/ArrowLeft';
import IconSettingsHide from '@phosphor-icons/react/dist/icons/CornersIn';
import IconSend from '@phosphor-icons/react/dist/icons/PaperPlaneRight';
import uiState from '#/state/ui';
import { uiStateType } from '#/state/ui';
import IconSearch from '@techytools/uui/components/server/Icon/Search';
import IconAdd from '@phosphor-icons/react/dist/icons/CaretDown';
import DropdownMenu from '../../../ui/DropdownMenu';
import TooltipTextarea from '#/components/ui/TooltipTextarea';

type Props = {
  userPromptRef: React.RefObject<HTMLTextAreaElement>;
  className?: string;
  postData: {
    userMessage: string;
    systemMessage: string;
    temperature: number;
    top_p: number;
    n: number;
    presence_penalty: number;
    frequency_penalty: number;
    max_tokens: number;
    stop: string[];
  };
  handleSubmit: (e: any) => void;
  handleChange: (e?: any, percent?: any) => void;
  showAdvancedOptions: boolean;
  toggleShowAdvancedOptions: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

function UserMessage({
  userPromptRef,
  postData,
  handleSubmit,
  handleChange,
  showAdvancedOptions,
  toggleShowAdvancedOptions,
}: Props) {
  const [domReady, setDomReady] = useState(false);
  const ui = uiState((state) => state as uiStateType);

  useEffect(() => {
    setDomReady(true);
  }, []);

  const handleShowAdvancedOptions = () => {
    toggleShowAdvancedOptions();
    ui.tooltipSystemPromptSettings_false();
  };

  useEffect(() => {
    setDomReady(true);
    userPromptRef?.current?.focus();
    setTimeout(() => {
      userPromptRef?.current?.focus();
    }, 800);
  }, []);

  const dropdownMenuButtonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Expandable
      aria-hidden={!domReady}
      sx={{
        transition: 'grid-template-rows 0.6s linear 0.4s',
        p: '0.55rem 0 0.55rem 0',
        overflow: 'visible',
      }}
    >
      <FormTextarea
        data-component="prompt-input-Prompts-UserMessage"
        ref={userPromptRef}
        className={styles.texts}
        name="userMessage"
        label={showAdvancedOptions ? 'User prompt' : undefined}
        placeholder="Type anything. The AI will write a response."
        onChange={handleChange}
        value={postData.userMessage}
        sx={{
          fieldset: {},
          padding: '0 !important',
          textarea: {
            minHeight: !showAdvancedOptions ? undefined : '3rem',
            pb: '0.67rem !important',
            transition: 'all 0.6s',
          },
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.metaKey) {
            handleSubmit(e);
          }
        }}
        inputProps={{}}
        ButtonsLeft={[
          <Button
            key="one"
            isTiny
            isCompact
            variant="text"
            tabIndex={-1}
            color="primary"
            onClick={handleShowAdvancedOptions}
          >
            {!showAdvancedOptions ? (
              <TooltipTextarea
                open={ui.tooltipSystemPromptSettings}
                placement="right"
                label={<span>prompts and settings</span>}
              >
                <IconSettingsShow
                  width={17}
                  height={17}
                  style={{ paddingTop: '1px' }}
                />
              </TooltipTextarea>
            ) : (
              <IconSettingsHide className="isAccent" width={17} height={17} />
            )}
            {/* {domReady && ui.tooltipSystemPromptSettings && (
              <Inline as="span" className="isAccent isSmall">
                {' '}
                &nbsp;👈 advanced options
              </Inline>

               //  {!!ui.tooltipSystemPromptSettings && (

            )} */}
          </Button>,
          // null,
          // <Button
          //   key="two"
          //   isIcon
          //   isTiny
          //   variant="text"
          //   color="primary"
          //   tabIndex={-1}
          //   onClick={handleShowAdvancedOptions}
          //   sx={{
          //     mt: '-1px',
          //     ml: '1px',
          //   }}
          // >
          //   <IconSearch width={13} height={13} />
          // </Button>,
        ]}
        ButtonsRight={[
          <Button
            key="one"
            ref={dropdownMenuButtonRef}
            isTiny
            isSubtle
            variant="text"
            color="secondary"
            sx={{
              mr: '-0.25rem',
            }}
            aria-haspopup="true"
          >
            <DropdownMenu
              triggerRef={dropdownMenuButtonRef}
              triggerAction="click"
              menuItems={[
                {
                  children: 'prompt engineering',
                  props: {
                    'data-active': true,
                  },
                },
                {
                  children: 'edit code',
                  props: {},
                },
                {
                  children: 'edit text',
                  props: {},
                },
              ]}
            />
            <span className="isSmall" style={{ paddingRight: '0.33rem' }}>
              find
            </span>
            {/* <IconAdd width={15} height={15} /> */}
            <IconSearch width={13} height={13} />
          </Button>,
          null,
          <Button
            key="two"
            variant="text"
            onClick={handleSubmit}
            type="submit"
            color="primary"
            sx={{
              mr: '-0.25rem',
              p: '0 0.66rem 0 0.7rem !important',
            }}
          >
            <span className="isSmall">send&emsp;</span>
            <IconSend width={16} height={16} weight="fill" />
          </Button>,
        ]}
        buttonsRerender={[
          ui.tooltipSystemPromptSettings,
          dropdownMenuButtonRef?.current,
        ]}
      ></FormTextarea>
    </Expandable>
  );
}

export default UserMessage;
