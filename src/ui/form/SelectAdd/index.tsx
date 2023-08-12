import type { Props } from './types';
import ClientSelect from './CreatableSelect';

type changeValue = string | number | React.FormEvent<HTMLDivElement>;

export default function SelectAdd({ onChange, ...props }: Props) {
  const handleChange = (item: changeValue) => {
    if (onChange && item !== null) {
      // @ts-ignore
      onChange(item.value);
    }
  };
  return <ClientSelect onChange={handleChange} {...props} isMulti={false} />;
}
