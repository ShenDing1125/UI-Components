import classNames from 'classnames';
import React, { CSSProperties, FC, ReactNode, useContext } from 'react';
import { MenuContext } from './menu';

export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}

const MenuItem: FC<MenuItemProps> = (props) => {
    const { index, disabled, className, style, children } = props;
    const context = useContext(MenuContext);
    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });
    const renderChildren = () => {
        return React.Children.map(children, (child) => {
            if (typeof child === 'string') {
                return (
                    <>
                        {classes.includes('is-disabled') ? (
                            <div className="cursor-default">
                                <li className={classes} style={style} onClick={handleClick}>
                                    {child}
                                </li>
                            </div>
                        ) : (
                            <li className={classes} style={style} onClick={handleClick}>
                                {child}
                            </li>
                        )}
                    </>
                );
            } else {
                console.error('Warring: The type of MenuItem is not string');
            }
        });
    };

    const handleClick = () => {
        if (context.onSelect && !disabled && typeof index === 'string') {
            context.onSelect(index);
        }
    };

    const renderMenuItem = () => {
        if (!context.isUseAlone) {
            return <>{renderChildren()}</>;
        } else {
            console.error('Warring: MenuItem can not be used alone');
        }
    };
    return <>{renderMenuItem()}</>;
};

MenuItem.displayName = 'MenuItem';
export default MenuItem;
