import Button, { ButtonProps } from '@techytools/uui/components/form/Button';
import IconMenu from '@phosphor-icons/react/dist/icons/List';

import { uiStore, type uiState } from '#/state/ui';

export default function ButtonOpenDrawer(props: Partial<ButtonProps>) {
  const ui = uiStore((state) => state as uiState);
  return (
    <Button
      isIcon
      variant="text"
      color="info"
      sx={{ mr: '-0.125rem' }}
      onClick={() => {
        ui.openSystemDrawer_toggle();
      }}
    >
      <IconMenu width={24} height={24} />
    </Button>
  );
}
