import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const Box = dynamic(() => import('.'), {
  ssr: false,
});

export default Inline (props) => (
  <Suspense fallback={<>...</>}>
    <Box {...props} />
  </Suspense>
);
