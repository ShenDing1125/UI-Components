import classNames from 'classnames';
import React, {
    FC,
    FunctionComponentElement,
    ReactNode,
    SelectHTMLAttributes,
    createContext,
    useEffect,
    useRef,
    useState
} from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { TransIcon } from '../Icon';
import Input from '../Input';
import Transition from '../Transition';
import { SelectOptionProps } from './option';

type SelectSize = 'lg' | 'md' | 'sm';
type DefInputSize = { width: string; height: string };
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLElement>, 'onChange'> {
    selectSize?: SelectSize;
    defSize?: DefInputSize;
    defOptionValue?: string | string[];
    placeholder?: string;
    disabled?: boolean;
    multiple?: boolean;
    name?: string;
    onChange?: (selectedValue: string, selectedValues: string[]) => void /*參數值需優化*/;
    onVisibleChange?: (visible: boolean) => void;
    children?: ReactNode;
}

export interface ISelectContext {
    selectedValues: string[];
    multiple?: boolean;
    onSelect?: (value: string, isSelected?: boolean) => void;
}

export const SelectContext = createContext<ISelectContext>({ selectedValues: [] });

const Select: FC<SelectProps> = (props) => {
    const {
        selectSize,
        defSize,
        style,
        defOptionValue,
        placeholder,
        disabled,
        multiple,
        name,
        onChange,
        onVisibleChange,
        children,
        autoFocus
    } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLInputElement>(null);
    const [selectedValues, setSelectedValues] = useState<string[]>(Array.isArray(defOptionValue) ? defOptionValue : []);
    const [isOptionOpen, setIsOptionOpen] = useState(false);
    const [value, setValue] = useState(typeof defOptionValue === 'string' ? defOptionValue : '');

    const handleOptionClick = (value: string, isSelected?: boolean) => {
        let updatedValues: string[] = [];
        if (!multiple) {
            setIsOptionOpen(false);
            setValue(value);
            onVisibleChange && onVisibleChange(false);
        } else {
            setValue('');
        }
        if (multiple) {
            // 第二次選中則取消
            updatedValues = isSelected ? selectedValues.filter((v) => v !== value) : [...selectedValues, value];
            setSelectedValues(updatedValues);
        }
        onChange && onChange(value, updatedValues);
    };

    useEffect(() => {
        if (inputRef.current) {
            // 原生的 autoFocus 為第一優先
            !autoFocus && inputRef.current.focus();

            if (multiple && selectedValues.length > 0) {
                inputRef.current.placeholder = '';
            } else {
                placeholder && (inputRef.current.placeholder = placeholder);
            }
        }
    }, [multiple, selectedValues, placeholder]);

    useClickOutside(containerRef, () => {
        setIsOptionOpen(false);
        !isOptionOpen && onVisibleChange && onVisibleChange(false);
    });

    const passedContext: ISelectContext = {
        onSelect: handleOptionClick,
        selectedValues,
        multiple
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!disabled) {
            setIsOptionOpen(!isOptionOpen);
            onVisibleChange && onVisibleChange(!isOptionOpen);
        }
    };

    const cleanValue = (e: React.MouseEvent) => {
        e.preventDefault();
        setValue('');
    };

    const cleanSelectedValues = (e: React.MouseEvent) => {
        e.preventDefault();
        setSelectedValues([]);
    };

    const renderOptions = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<SelectOptionProps>;
            if ((childElement.type.displayName = 'Option')) {
                return React.cloneElement(childElement, {
                    index: `select-${index}`
                });
            } else {
                console.error('Warning: Select has a child which is not a Option component');
            }
        });
    };

    const renderMultipleOption = () => {
        return selectedValues.map((value, index) => {
            return (
                <span className="item-tag" key={`tag-${index}`}>
                    {value}
                    <TransIcon
                        icon="times"
                        onClick={() => {
                            handleOptionClick(value, true);
                        }}
                    />
                </span>
            );
        });
    };

    const renderInput = () => {
        return (
            <>
                <div className="sd-select-input" onClick={handleClick}>
                    <Input
                        ref={inputRef}
                        placeholder={placeholder}
                        value={value}
                        readOnly
                        icon="angle-down"
                        disabled={disabled}
                        name={name}
                    />
                </div>
            </>
        );
    };

    const renderSelect = () => {
        const containerClass = classNames('sd-select', {
            [`select-size-${selectSize}`]: selectSize,
            'is-option-open': isOptionOpen,
            'is-disabled': disabled,
            'is-multiple': multiple
        });
        const defStyle = {
            with: `${defSize?.width}`,
            height: `${defSize?.height}`,
            ...style
        };

        return (
            <>
                <div className={containerClass} ref={containerRef} style={defStyle}>
                    {renderInput()}
                    <SelectContext.Provider value={passedContext}>
                        <Transition in={isOptionOpen} animation="scale-in-top" timeout={300}>
                            <ul className="select-dropdown">{renderOptions()}</ul>
                        </Transition>
                    </SelectContext.Provider>
                    {multiple && (
                        <>
                            <div className="selected-tags">{renderMultipleOption()}</div>
                            {selectedValues.length > 1 && (
                                <TransIcon
                                    className="selected-clean-icon"
                                    icon="trash-can"
                                    onClick={cleanSelectedValues}></TransIcon>
                            )}
                        </>
                    )}
                    {value && <TransIcon className="selected-clean-icon" icon="xmark" onClick={cleanValue}></TransIcon>}
                </div>
            </>
        );
    };

    return <>{renderSelect()}</>;
};

export default Select;
