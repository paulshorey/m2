import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconArrow from '@phosphor-icons/react/dist/icons/ArrowRight';

type Props = {
  /**
   * Required: Array of children to render - one for each MenuItem
   */
  menuItems: {
    children: string | React.ReactNode;
    props?: React.ComponentProps<typeof MenuItem> & {
      'data-active'?: boolean;
    };
  }[];
  triggerRef: React.RefObject<HTMLElement>;
  triggerAction?: 'click' | 'hover';
};

export default function DropdownMenu({
  menuItems,
  triggerRef,
  triggerAction = 'click',
}: Props) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  React.useEffect(() => {
    if (triggerRef?.current) {
      if (triggerAction === 'click') {
        triggerRef?.current?.addEventListener('click', handleOpen);
      } else if (triggerAction === 'hover') {
        triggerRef?.current?.addEventListener('mouseover', handleOpen);
      }
      return () => {
        if (triggerAction === 'click') {
          triggerRef?.current?.removeEventListener('click', handleOpen);
        } else if (triggerAction === 'hover') {
          triggerRef?.current?.removeEventListener('mouseover', handleOpen);
        }
      };
    }
  }, [typeof window, triggerRef?.current]);

  if (!menuItems) {
    return null;
  }
  return (
    <Menu
      variant="selectedMenu"
      id="basic-menu"
      anchorEl={triggerRef?.current}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      data-component="prompt-input-DropdownMenu"
      sx={{
        '.MuiPopover-paper': {
          backgroundColor: 'transparent !important',
          backdropFilter: 'blur(10px) brightness(0.5)',
          p: '0.125rem 0 0',
          my: '-0.25rem',
        },
        '.MuiMenuItem-root': {
          svg: {
            opacity: 0,
            mr: '0.525rem',
          },
          '&[data-active]': {
            color: 'primary.main',
          },
          '&:focus,&:hover,&[data-active]': {
            svg: {
              opacity: 1,
            },
          },
        },
      }}
      onClick={handleClose}
    >
      {menuItems.map((item, i) => (
        <MenuItem dense {...item.props} key={i}>
          <IconArrow /> {item.children}
        </MenuItem>
      ))}
    </Menu>
  );
}
