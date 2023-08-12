import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { type Props } from './types';
const ClientSelectAdd = dynamic(() => import('.'), {
  ssr: false,
});

export default function SelectAdd(props: Props) {
  return (
    <Suspense
      fallback={
        <span className={props.className} style={props.style}>
          ...
        </span>
      }
    >
      <ClientSelectAdd {...props} />
    </Suspense>
  );
}
