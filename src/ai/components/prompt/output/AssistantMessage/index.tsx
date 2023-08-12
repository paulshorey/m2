'use client';
import styles from './index.module.scss';
import Markdown from '@techytools/uui/components/client/Markdown';
import Block, { BlockProps } from '@techytools/uui/components/client/Block';
import PageWidth from '@techytools/uui/components/server/PageWidth';
import IconRobot from '@techytools/uui/components/server/Icon/Robot';
import { memo } from 'react';

type Props = BlockProps & {
  hasResponded: boolean;
  displayData: any;
  showAdvancedOptions: boolean;
  isLoading: boolean;
  className?: string;
  sx?: any;
};

function AssistantMessage({
  hasResponded,
  displayData,
  showAdvancedOptions,
  isLoading,
  className = '',
  sx,
  ...rest
}: Props) {
  return (
    <Block
      {...rest}
      className={styles.outputGenericMarkdown}
      sx={{
        opacity: !showAdvancedOptions ? 1 : 0.25,
      }}
    >
      <PageWidth
        pageWidth="lg"
        sx={{
          flex: 1,
          mx: 'auto',
          pb: '5rem',
        }}
      >
        <Block
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: '4px',
          }}
        >
          <IconRobot
            sx={{
              margin: hasResponded
                ? ['2.25rem 0 1.75rem 3px', null, '1.75rem 0 1rem 2.75px']
                : ['2.25rem 0 1.75rem 3px', null, '3rem 0 1.75rem 2.75px'],
              width: '67px',
              height: '67px',
              transform: hasResponded ? 'scale(0.5)' : '',
              transformOrigin: 'left center',
              padding: 0,
              transition: 'transform 5s ease-in',
            }}
          />
          {hasResponded && <Block>temp: {displayData?.temperature}</Block>}
        </Block>
        <Markdown
          className={styles.Markdown}
          str={
            isLoading
              ? 'Loading...'
              : displayData?.assistantMessage ||
                'AI response will be shown here...'
          }
        />
      </PageWidth>
    </Block>
  );
}

export default memo(AssistantMessage);
