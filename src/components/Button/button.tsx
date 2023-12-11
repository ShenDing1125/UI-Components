import classNames from 'classnames';
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties } from 'react';

export type ButtonSize = 'lg' | 'md' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    style?: CSSProperties;
    btnType?: ButtonType;
    label?: string;
    children?: React.ReactNode;
    href?: string;
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
export const pseudoURL: string = '#';

export const Button: React.FC<ButtonProps> = (props) => {
    const { btnType, className, disabled, size, style, label, children, href, ...restProps } = props;
    // ex: btn-default btn-lg
    const classes = classNames('sd-btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        // 專為 link 做的 disabled 判斷
        [`disabled`]: btnType === 'link' && disabled
    });

    const renderLinkBtn = () => {
        if (href) {
            const _href: string = disabled ? pseudoURL : href;
            return (
                <>
                    <a
                        className={classes}
                        href={_href}
                        style={style}
                        onClick={(e) => {
                            disabled && e.preventDefault();
                        }}
                        {...restProps}>
                        {label}
                        {children}
                    </a>
                </>
            );
        } else {
            console.error('Warring: href can not be empty!');
        }
    };

    const renderBaseBtn = () => {
        return (
            <>
                <button className={classes} style={style} disabled={disabled} {...restProps}>
                    {label}
                    {children}
                </button>
            </>
        );
        // if (typeof children === 'string' || typeof children === 'number') {
        //     return (
        //         <>
        //             <button className={classes} style={style} disabled={disabled} {...restProps}>
        //                 {children}
        //             </button>
        //         </>
        //     );
        // } else {
        //     console.error('Warring: Button has more than one child');
        // }
    };

    const renderTypeBtn = () => {
        return btnType === 'link' ? renderLinkBtn() : renderBaseBtn();
    };

    return <>{renderTypeBtn()}</>;
};

Button.defaultProps = {
    disabled: false,
    btnType: 'default',
    size: 'sm'
    // label: 'Button'
    // href: '#'
};

export default Button;
