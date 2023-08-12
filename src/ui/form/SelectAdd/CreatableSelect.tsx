'use client';

import CreatableSelect from 'react-select/creatable';
// @ts-ignore
import styles from './index.module.scss';
// @ts-ignore
import formStyles from '../../../styles/form.module.scss';
import type { value, option, Props } from './types';

const cn = (name: string) => (name ? ' ' + name : '');

export default function SelectAddDynamic({ values, options, ...props }: Props) {
  let passOptions: option[] = options || [];
  if (!passOptions.length && values?.length) {
    passOptions = values.map((value: value) => {
      return { value, label: value };
    });
  }
  return (
    <CreatableSelect
      classNames={{
        clearIndicator: (state) => cn(styles.clearIndicator),
        container: (state) => cn(styles.container),
        control: (state) =>
          cn(styles.default) +
          cn(formStyles.inputEdges) +
          cn(formStyles[props.size || 'small']),
        dropdownIndicator: (state) => cn(styles.dropdownIndicator),
        group: (state) => cn(styles.group),
        groupHeading: (state) => cn(styles.groupHeading),
        indicatorsContainer: (state) => cn(styles.indicatorsContainer),
        indicatorSeparator: (state) => cn(styles.indicatorSeparator),
        input: (state) => cn(styles.input) + ' ' + cn(formStyles.inputInside),
        loadingIndicator: (state) => cn(styles.loadingIndicator),
        loadingMessage: (state) => cn(styles.loadingMessage),
        menu: (state) => cn(styles.menu) + ' ' + cn(formStyles.dropdown),
        menuList: (state) => cn(styles.menuList) + ' ' + cn(formStyles.options),
        menuPortal: (state) => cn(styles.menuPortal),
        multiValue: (state) => cn(styles.multiValue),
        multiValueLabel: (state) => cn(styles.multiValueLabel),
        multiValueRemove: (state) => cn(styles.multiValueRemove),
        noOptionsMessage: (state) => cn(styles.noOptionsMessage),
        option: (state) => cn(styles.option) + ' ' + cn(formStyles.option),
        placeholder: (state) => cn(styles.placeholder),
        singleValue: (state) => cn(styles.singleValue),
        valueContainer: (state) => cn(styles.valueContainer),
      }}
      unstyled={true}
      isClearable
      options={passOptions}
      onMouseOver={() => {
        setTimeout(() => {
          throw 'asdffd';
        }, 1000);
      }}
      {...props}
    />
  );
}
