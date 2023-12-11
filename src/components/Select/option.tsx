import classNames from 'classnames';
import React, { FC, ReactNode, useContext } from 'react';
import { TransIcon } from '../Icon';
import { SelectContext } from './select';
export interface SelectOptionProps {
    index?: string;
    value: string;
    label?: string;
    disabled?: boolean;
    children?: ReactNode;
}

export const Option: FC<SelectOptionProps> = (props) => {
    const { value, label, disabled, children, index, ...restProps } = props;
    const { onSelect, selectedValues, multiple } = useContext(SelectContext);
    const isSelected = selectedValues.includes(value);
    const classes = classNames('sd-select-item', {
        'is-disabled': disabled,
        'is-selected': isSelected
    });
    const handleClick = (e: React.MouseEvent, value: string, isSelected: boolean) => {
        e.preventDefault();
        onSelect && !disabled && onSelect(value, isSelected);
    };

    const renderOption = () => {
        return (
            <>
                <li
                    key={index}
                    className={classes}
                    onClick={(e) => {
                        handleClick(e, value, isSelected);
                    }}
                    {...restProps}>
                    {!disabled ? children || (label ? label : value) : <del>{label ? label : value}</del>}
                    {multiple && isSelected && <TransIcon className="is-selected-icon" icon="check" />}
                </li>
            </>
        );
    };

    return <>{renderOption()}</>;
};

Option.displayName = 'Option';

export default Option;
