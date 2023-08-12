import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const Markdown = dynamic(() => import('./Markdown'), {
  ssr: false,
});

export default ({ str, ...rest }) => (
  <Suspense fallback={<div>...</div>}>
    <Markdown str={str} {...rest} />
  </Suspense>
);
