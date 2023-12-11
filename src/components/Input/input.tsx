import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import { InputHTMLAttributes, ReactElement, forwardRef } from 'react';
import { TransIcon } from '../Icon';

type InputSize = 'lg' | 'md' | 'sm';
type DefInputSize = { width: string; height: string };

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean;
    inputSize?: InputSize;
    icon?: IconProp;
    prepend?: string | ReactElement;
    append?: string | ReactElement;
    defSize?: DefInputSize;
    // onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

// forwardRef<RefType, PropsType>((props, ref) => {})
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { disabled, inputSize, icon, prepend, append, style, defSize, ...restProps } = props;
    const classes = classNames('sd-input-wrapper', {
        [`input-size-${inputSize}`]: inputSize,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': append,
        'input-group-prepend': prepend
    });
    const fixControlledValue = (value: any) => {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    // 將"非受控組件"轉為"受控組件""
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(restProps.value);
    }
    const defStyle = {
        width: `${defSize?.width}`,
        height: `${defSize?.height}`,
        ...style
    };

    const renderBaseInput = () => {
        return (
            <>
                {prepend && <div className="sd-input-group-prepend">{prepend}</div>}
                <input ref={ref} className="sd-input-inner" disabled={disabled} {...restProps} />
                {append && <div className="sd-input-group-append">{append}</div>}
            </>
        );
    };

    const renderIcon = () => {
        return (
            <>
                {icon && (
                    <div className="icon-wrapper">
                        <span className="blur-layout" />
                        <TransIcon icon={icon} title={`${icon}`} />
                    </div>
                )}
            </>
        );
    };

    const renderOverallInput = () => {
        return (
            <>
                <div className={classes} style={defStyle}>
                    {renderIcon()}
                    {renderBaseInput()}
                </div>
            </>
        );
    };

    return <>{renderOverallInput()}</>;
});

export default Input;
