import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const HtmlToReact = dynamic(() => import('./Html'), {
  ssr: false,
});

export default ({ str, ...rest }) => (
  <Suspense fallback={<div>...</div>}>
    <HtmlToReact str={str} {...rest} />
  </Suspense>
);
