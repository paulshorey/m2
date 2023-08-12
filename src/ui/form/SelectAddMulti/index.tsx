'use client';

import { type Props } from './types';
import SelectAdd from '../SelectAdd/CreatableSelect';

export default function SelectAddMulti({ onChange, ...props }: Props) {
  const handleChange = (items: any) => {
    if (onChange) {
      let values: string[] = [];
      for (let item of items) {
        if (!item.value) {
          continue;
        }
        values.push(item.value);
      }
      onChange(values);
    }
  };
  return <SelectAdd onChange={handleChange} {...props} isMulti />;
}
