import { Props } from '.';
import objects_merge from '@techytools/fn/io/objects/objects_merge';

export default function (props: Props): Props {
  let sx = {};
  let slotProps = {};

  // tiny
  if (props.size === 'tiny') {
    objects_merge(
      slotProps,
      {
        rail: {
          sx: {
            height: '1px',
            opacity: '0.5',
          },
        },
        thumb: {
          sx: {
            height: '0.44rem',
            width: '0.44rem',
          },
        },
      },
      true
    );
  }

  return objects_merge(props, { slotProps, sx }) as Props;
}
