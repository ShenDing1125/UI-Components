import classNames from 'classnames';
import React, { FC, useState } from 'react';
import { TransIcon } from '../Icon';
import Transition from '../Transition';

export type AlertTheme = 'default' | 'success' | 'warning' | 'danger';
export type AlertSize = 'lg' | 'md' | 'sm' | 'full';

export interface AlertProps {
    title?: string;
    size?: AlertSize;
    description?: string;
    theme?: AlertTheme;
    closeable?: boolean;
    onClick?: () => void;
}

export const Alert: FC<AlertProps> = (props) => {
    const [isHide, setIsHide] = useState(false);
    const { title, size, description, theme, onClick, closeable } = props;
    const classes = classNames(
        'sd-alert',
        {
            [`alert-${theme}`]: theme
        },
        {
            [`alert-size-${size}`]: size
        }
    );
    const titleClass = classNames('sd-alert-title', {
        'bold-title': description
    });
    const handleClick = () => {
        if (onClick) {
            setIsHide(true);
            onClick();
        }
    };
    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsHide(true);
    };

    const renderDescription = () => {
        return <>{description && <p className="alert-desc">{description}</p>}</>;
    };

    const renderIcon = () => {
        return (
            <>
                {closeable && (
                    <span className="alert-close" onClick={handleClose}>
                        <TransIcon icon="times" size="lg" />
                    </span>
                )}
            </>
        );
    };

    const renderAlert = () => {
        return (
            <>
                <Transition in={!isHide} timeout={300} animation="scale-in-top">
                    <div className={classes} onClick={handleClick}>
                        <span className={titleClass}>{title}</span>
                        {renderDescription()}
                        {renderIcon()}
                    </div>
                </Transition>
            </>
        );
    };

    return <>{renderAlert()}</>;
};

Alert.defaultProps = {
    theme: 'default',
    closeable: true
};
export default Alert;
