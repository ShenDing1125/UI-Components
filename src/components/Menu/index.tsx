import { FC } from 'react';
import Menu, { MenuProps } from './menu';
import SubMenu, { SubMenuProps } from './subMenu';
import MenuItem, { MenuItemProps } from './menuItem';

export type IComponent = FC<MenuProps> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuProps>;
};

export const TransMenu = Menu as IComponent;

TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;
