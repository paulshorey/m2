import * as types from '../SelectAdd/types';
export type value = types.value;
export type option = types.option;

export type Props = types.Props & {
  onChange?: (value: value[]) => void;
};
