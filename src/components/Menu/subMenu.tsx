import classNames from 'classnames';
import React, { FC, FunctionComponentElement, ReactNode, useContext, useState } from 'react';
import reserveChildrenType from '../../utils/reserveChildrenType';
import { TransIcon } from '../Icon';
import Transition from '../Transition';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
    index?: string;
    title?: string;
    className?: string;
    children?: ReactNode;
}

export const SubMenu: FC<SubMenuProps> = (props) => {
    const { index, title, className, children } = props;
    const _children: ReactNode = reserveChildrenType(children, 'object', []);
    const context = useContext(MenuContext);
    const openSubMenus = context.defaultOpenSubMenus as Array<String>;
    const isOpen = index && context.mode === 'vertical' ? openSubMenus.includes(index) : false;
    const [menuOpen, setOpen] = useState(isOpen);
    const classes = classNames('menu-item sub-menu', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    });
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => {
            setOpen(toggle);
        }, 300);
    };
    const clickEvents =
        context.mode === 'vertical'
            ? {
                  onClick: handleClick
              }
            : {};
    const hoverEvents =
        context.mode !== 'vertical'
            ? {
                  onMouseEnter: (e: React.MouseEvent) => {
                      handleMouse(e, true);
                  },
                  onMouseLeave: (e: React.MouseEvent) => {
                      handleMouse(e, false);
                  }
              }
            : {};
    const renderChildren = () => {
        const childrenComponent = React.Children.map(_children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                });
            } else {
                console.error('Warning: SubMenu has a child which is not a MenuItem component');
            }
        });
        return (
            <>
                <Transition in={menuOpen} timeout={300} animation="scale-in-top">
                    <ul className={'sub-menu-container'}>{childrenComponent}</ul>
                </Transition>
            </>
        );
    };

    const renderSubMenu = () => {
        if (!context.isUseAlone) {
            return (
                <>
                    <li key={index} className={classes} {...hoverEvents}>
                        <div className="sub-menu-title" {...clickEvents}>
                            {title}
                            <TransIcon icon="angle-down" className="arrow-icon" size="sm" />
                        </div>
                        {renderChildren()}
                    </li>
                </>
            );
        } else {
            console.error('Warring: SubMenu can not be used alone');
        }
    };
    return <>{renderSubMenu()}</>;
};

SubMenu.defaultProps = {
    title: 'Title'
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
