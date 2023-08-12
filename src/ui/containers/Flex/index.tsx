import Box, { BoxProps } from '@mui/material/Box';
import { FC } from 'react';

const Flex: FC<BoxProps> = ({ ...props }) => {
  return (
    <Box
      sx={{
        alignItems:['center', null, 'flex-start' ],
        display:'flex',
        flexDirection:['column', null, 'row' ],
        justifyContent:['center', null, 'flex-start' ],
        textAlign:['center', null, 'left' ],
      }}
      {...props}
    ></Box>
  );
};

export default Flex;
