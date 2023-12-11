import { FC } from 'react';

import Select, { SelectProps } from './select';
import Option, { SelectOptionProps } from './option';

export type IComponent = FC<SelectProps> & {
    Option: FC<SelectOptionProps>;
};

export const TransSelect = Select as IComponent;
TransSelect.Option = Option;
