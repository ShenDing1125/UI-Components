import { FC } from 'react';
import Table, { TableProps } from './table';
import TableItem, { TableItemProps } from './tabIeItem';

export type IComponent = FC<TableProps> & {
    Item: FC<TableItemProps>;
};

export const TransTable = Table as IComponent;
TransTable.Item = TableItem;
