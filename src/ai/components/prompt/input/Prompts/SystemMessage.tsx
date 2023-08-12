import React from 'react';
import styles from '#/components/prompt/input/Prompts/index.module.scss';
import FormTextarea from '@techytools/uui/components/form/Textarea';
import Expandable from '@techytools/uui/components/server/ExpandableHeight';
import Block from '@techytools/uui/components/client/Block';
import Button from '@techytools/uui/components/form/Button';
import { useState, useEffect } from 'react';
import uiState from '#/state/ui';
import { uiStateType } from '#/state/ui';
import IconSettingsHide from '@phosphor-icons/react/dist/icons/CaretUp';
import IconSearch from '@techytools/uui/components/server/Icon/Search';
import IconSend from '@phosphor-icons/react/dist/icons/PaperPlaneRight';
import IconDown from '@phosphor-icons/react/dist/icons/CaretDown';
import IconSaveAs from '@phosphor-icons/react/dist/icons/Plus';
import IconSave from '@phosphor-icons/react/dist/icons/Check';
import DropdownMenu from '#/components/ui/DropdownMenu';

type Props = {
  postData: {
    systemMessage: string;
    temperature: number;
    top_p: number;
    n: number;
    presence_penalty: number;
    frequency_penalty: number;
    max_tokens: number;
    stop: string[];
  };
  handleChange: (e?: any, percent?: any) => void;
  showAdvancedOptions: boolean;
};

export default function SystemMessage({
  postData,
  handleChange,
  showAdvancedOptions,
}: Props) {
  const [domReady, setDomReady] = useState(false);
  const ui = uiState((state) => state as uiStateType);

  const dropdownMenuButton = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDomReady(true);
  }, []);

  const handleShowAdvancedOptions = () => {
    ui.openSystemDrawer_toggle();
    ui.tooltipFindPrompts_false();
  };

  return (
    <Expandable aria-hidden={!showAdvancedOptions}>
      <Block
        sx={{
          flex: '0.67',
          height: '100%',
          margin: '0',
          padding: '0.5rem 0 0 0',
          textarea: {
            minHeight: !showAdvancedOptions ? undefined : '2rem',
            pb: '0.67rem !important',
            transition:
              'height 0.4s ease-in, min-height 0.4s ease-in, max-height 0.4s ease-in',
          },
        }}
      >
        <FormTextarea
          sx={{
            marginBottom: '1rem !important',
            textarea: {
              pb: '0 !important',
            },
          }}
          className={styles.texts}
          name="systemMessage"
          label="System prompt"
          placeholder="The system message will be used to train the AI. Tell it how to format the output, how to think, and how to write."
          onChange={handleChange}
          value={postData.systemMessage}
          info="Idk..."
          infoAbove
          // ButtonsLeft={[
          //   <Button
          //     key="one"
          //     isIcon
          //     isTiny
          //     variant="text"
          //     color="primary"
          //     tabIndex={-1}
          //     onClick={handleShowAdvancedOptions}
          //   >
          //     {showAdvancedOptions ? (
          //       <IconSearch width={12} height={12} />
          //     ) : (
          //       <IconSettingsHide />
          //     )}
          //     {/* {(domReady && ui.openSearchSystemPrompts) ||
          //       (true && (
          //         <LazyBox as="span" className="isAccent isExtraSmall">
          //           {' '}
          //           &nbsp;search system prompts
          //         </LazyBox>
          //       ))} */}
          //   </Button>,
          // ]}
          ButtonsRight={[
            <Button
              key="one"
              ref={dropdownMenuButton}
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
                triggerRef={dropdownMenuButton}
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
              disabled
              key="two"
              variant="text"
              // onClick={handleSubmit}
              color="primary"
              type="submit"
              sx={{
                mr: '-0.125rem',
                p: '0 0.66rem 0 0.7rem !important',
              }}
            >
              <span className="isSmall">save&emsp;</span>
              <IconSave width={16} height={16} weight="bold" />
            </Button>,
            null,
            <Button
              disabled
              key="two"
              variant="text"
              // onClick={handleSubmit}
              type="submit"
              color="primary"
              sx={{
                mx: '-0.125rem',
                p: '0 0.66rem 0 0.7rem !important',
              }}
            >
              <span className="isSmall">save as&emsp;</span>
              <IconSaveAs width={16} height={16} weight="fill" />
            </Button>,
          ]}
          buttonsRerender={[domReady, ui.openSearchSystemPrompts]}
        ></FormTextarea>
      </Block>
    </Expandable>
  );
}
