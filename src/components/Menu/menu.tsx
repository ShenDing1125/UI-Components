import classNames from 'classnames';
import React, { CSSProperties, FC, ReactNode, createContext, useState } from 'react';
import reserveChildrenType from '../../utils/reserveChildrenType';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: CSSProperties;
    onSelect?: SelectCallback;
    defaultOpenSubMenus?: string[];
    children?: ReactNode;
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
    isUseAlone: boolean;
}

export const MenuContext = createContext<IMenuContext>({ index: '0', isUseAlone: true });

export const Menu: FC<MenuProps> = (props) => {
    const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props;
    const _children: ReactNode = reserveChildrenType(children, 'object', []);
    const [currentActive, setActive] = useState(defaultIndex);
    const classes = classNames('sd-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    });
    const handleClick = (index: string) => {
        setActive(index);
        onSelect && onSelect(index);
    };
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus,
        isUseAlone: false
    };
    const renderChildren = () => {
        return React.Children.map(_children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            } else {
                console.error('Warring: Menu has a child which is not a MenuItem or SubMenu component');
            }
        });
    };
    return (
        <>
            <ul className={classes} style={style}>
                <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
            </ul>
        </>
        // <ul className={classes} style={style} data-testId="test-menu">
        //     <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
        // </ul>
    );
};

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
};

export default Menu;
