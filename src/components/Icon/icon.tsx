import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { FC, ReactNode, createContext } from 'react';

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IconProps extends FontAwesomeIconProps {
    icon: IconProp;
    theme?: ThemeProps;
    children?: ReactNode;
}

export interface IconShadowContext extends IconProps {
    restProps?: IconProps;
    isUseAlone: boolean;
}

export interface iIconContextProps {
    icon: IconProp;
    size: SizeProp;
}

export const IconContext = createContext<IconShadowContext>({ isUseAlone: true } as IconShadowContext);

export const Icon: FC<IconProps> = (props) => {
    const { className, theme, children, ...restProps } = props;
    const classes = classNames('sd-icon', className, { [`icon-${theme}`]: theme });
    const passedContext: IconShadowContext = {
        icon: props.icon,
        size: props.size,
        restProps,
        isUseAlone: false
    };
    const renderBaseIcon = () => {
        if (!Array.isArray(children)) {
            return typeof children !== 'string' ? (
                <FontAwesomeIcon className={classes} {...restProps} />
            ) : (
                console.error('Warring: Icon has a child which is not a IconShadow component')
            );
        } else {
            console.error('Warring: Icon has more than one child');
        }
    };

    const renderIconShadow = () => {
        if (typeof children === 'object') {
            const childElement = children as React.FunctionComponentElement<IconProps>;
            const { displayName } = childElement?.type;

            return displayName === 'IconShadow' ? (
                <IconContext.Provider value={passedContext}>{children}</IconContext.Provider>
            ) : (
                console.error('Warring: Icon has a child which is not a IconShadow component')
            );
        }
    };

    const renderOverallIcon = () => {
        return (
            <>
                {children ? (
                    <div className="icon-container">
                        <>{renderBaseIcon()}</>
                        <>{renderIconShadow()}</>
                    </div>
                ) : (
                    <>{renderBaseIcon()}</>
                )}
            </>
        );
    };

    return <>{renderOverallIcon()}</>;
};

Icon.defaultProps = {
    size: 'lg'
};

export default Icon;
