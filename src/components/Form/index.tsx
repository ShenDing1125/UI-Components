import { FC } from 'react';
import Form from './form';
import Item, { FormItemProps } from './formItem';

export type IComponent = typeof Form & {
    Item: FC<FormItemProps>;
};
export const TransForm: IComponent = Form as IComponent;
TransForm.Item = Item;
