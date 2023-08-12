import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const PromptsIndex = dynamic(() => import('.'), {
  ssr: false,
});

export default function Prompts(props) {
  return (
    <Suspense fallback={null}>
      <PromptsIndex {...props} />
    </Suspense>
  );
}
