import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer({
  anchor,
  open,
  onClose,
  children,
}: {
  children: React.ReactNode;
  anchor: Anchor;
  open: boolean;
  onClose: () => void;
}) {
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 360 }}
      role="presentation"
    >
      {children}
    </Box>
  );

  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      {list(anchor)}
    </Drawer>
  );
}
