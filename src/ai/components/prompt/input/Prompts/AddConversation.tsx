import React from 'react';
import Expandable from '@techytools/uui/components/server/ExpandableHeight';
import Button from '@techytools/uui/components/form/Button';
import { useState, useEffect } from 'react';
import uiState from '#/state/ui';
import { uiStateType } from '#/state/ui';
import IconAdd from '@phosphor-icons/react/dist/icons/Plus';

type Props = {
  showAdvancedOptions: boolean;
};

export default function AddConversation({ showAdvancedOptions }: Props) {
  const [domReady, setDomReady] = useState(false);
  const ui = uiState((state) => state as uiStateType);

  useEffect(() => {
    setDomReady(true);
  }, []);

  const handleShowAdvancedOptions = () => {
    ui.openSystemDrawer_toggle();
    ui.tooltipFindPrompts_false();
  };

  return (
    <Expandable
      aria-hidden={!showAdvancedOptions}
      sx={{
        justifyContent: 'center',
      }}
    >
      <Button
        isTiny
        isSubtle
        variant="text"
        sx={{
          padding: '0',
          margin: '-0.5rem 0 0 0',
        }}
      >
        <IconAdd />
      </Button>
    </Expandable>
  );
}
