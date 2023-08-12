import React from 'react';
import { CreatableProps } from 'react-select/creatable';

export type value = string;
export type option = {
  value: value;
  label: React.ReactNode | string | number;
  color?: string;
  isDisabled?: boolean;
};

export type Props = React.HTMLAttributes<HTMLDivElement> &
  CreatableProps<any, any, any> & {
    options?: option[];
    values?: value[];
    size?: 'small' | 'medium' | 'large';
    onChange?: (value: value) => void;
  };
