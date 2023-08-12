import React from 'react';
import PageWidth from '@techytools/uui/components/server/PageWidth';
import Block from '@techytools/uui/components/client/Block';

type Props = React.ComponentPropsWithoutRef<'div'> & {
  ChildrenLeft?: React.ReactNode;
  ChildrenRight?: React.ReactNode;
};

export default function Header({
  ChildrenLeft,
  ChildrenRight,
  ...rest
}: Props) {
  return (
    <div {...rest}>
      <PageWidth
        pageWidth="lg"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '42px',
          lineHeight: '42px',
          '> div': {
            height: '42px',
            lineHeight: '42px',
            display: 'flex',
            alignItems: 'center',
            ':first-child': {
              justifyContent: 'flex-start',
            },
            ':last-child': {
              justifyContent: 'flex-end',
            },
          },
        }}
      >
        <Block>{ChildrenLeft}</Block>
        <Block>{ChildrenRight}</Block>
      </PageWidth>
    </div>
  );
}
