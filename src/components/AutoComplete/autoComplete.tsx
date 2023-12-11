import classNames from 'classnames';
import { ChangeEvent, FC, KeyboardEvent, ReactElement, useEffect, useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import useDebounce from '../../hooks/useDebounce';
import controlScrollbar from '../../utils/controlScrollbar';
import { TransIcon } from '../Icon';
import Input, { InputProps } from '../Input/input';
import Transition from '../Transition';

type InputSize = 'lg' | 'md' | 'sm';
type DefInputSize = { width: string; height: string };
interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = (T & DataSourceObject) | string;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect' | 'onChange'> {
    inputSize?: InputSize;
    defSize?: DefInputSize;
    remind?: string;
    disabled?: boolean;
    debounceTime?: number;
    onSelect?: (item: DataSourceType) => void;
    onChange?: (value: string) => void;
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>; // 提供用戶自訂義過濾值類型
    renderOption?: (item: DataSourceType) => ReactElement; // 提供用戶自訂義渲染方式
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        inputSize,
        defSize,
        remind,
        onSelect,
        onChange,
        fetchSuggestions,
        renderOption,
        style,
        value,
        disabled,
        debounceTime,
        ...restProps
    } = props;
    const [inputValue, setInputValue] = useState(value);
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowDropdown, setIsShowDropdown] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(0);
    const [isRemind, setIsRemind] = useState(false);
    const isTriggerSearch = useRef(false); // 防止從標籤<li>獲取input值後再度觸發搜尋
    const componentRef = useRef<HTMLDivElement>(null);
    const debouncedValue = useDebounce(inputValue, debounceTime);
    // control scrollbar by keyboard
    const itemsRefAry: any[] = [];
    const itemContainerRef = useRef<any>(null);
    const { setScrollbarIndex } = controlScrollbar(itemContainerRef, itemsRefAry);

    function cleanSuggestions() {
        setSuggestions([]);
    }

    useClickOutside(componentRef, () => {
        cleanSuggestions();
        remind && setIsRemind(false);
    });

    useEffect(() => {
        if (debouncedValue && isTriggerSearch.current) {
            cleanSuggestions();
            const results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                setIsLoading(true);
                results.then((data) => {
                    setIsLoading(false);
                    setSuggestions(data);
                    data.length > 0 && setIsShowDropdown(true);

                    remind && data.length !== 0 ? setIsRemind(false) : setIsRemind(true);
                });
            } else {
                setSuggestions(results);
                results.length > 0 && setIsShowDropdown(true);

                remind && results.length !== 0 ? setIsRemind(false) : setIsRemind(true);
            }
        } else {
            setIsShowDropdown(false);
        }
        setHighlightIndex(0);
    }, [debouncedValue, fetchSuggestions]);

    const highlightIndexFn = (index: number) => {
        const maxLength = suggestions.length - 1;
        if (index < 0) index = maxLength;
        if (index > maxLength) index = 0;
        setHighlightIndex(index);
    };

    // for label <input>
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        onChange && onChange(value);
        setInputValue(value);

        isTriggerSearch.current = true; // 從<input>獲取值後，允許搜尋
    };

    // for label <li>
    const handleItemClick = (item: DataSourceType) => {
        onSelect && onSelect(item);
        if (typeof item === 'string') setInputValue(item);
        if (typeof item === 'object') setInputValue(item.value);
        setIsShowDropdown(false);

        isTriggerSearch.current = false; // 從<li>獲取值後，不需重新搜尋
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'ArrowUp':
                highlightIndexFn(highlightIndex - 1);

                setScrollbarIndex(highlightIndex - 1);
                break;
            case 'ArrowDown':
                highlightIndexFn(highlightIndex + 1);

                setScrollbarIndex(highlightIndex + 1);
                break;
            case 'Enter':
                suggestions[highlightIndex] && handleItemClick(suggestions[highlightIndex]);
                break;
            case 'Escape':
                cleanSuggestions();
                break;
            default:
                break;
        }
    };

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : typeof item === 'string' ? item : item.value;
    };

    const renderDropdownItem = () => {
        return suggestions.map((item, index) => {
            const classes = classNames('suggestion-item', {
                'is-active': index === highlightIndex
            });
            return (
                <>
                    <li
                        key={index}
                        className={classes}
                        onClick={handleItemClick.bind(null, item)}
                        ref={(r) => {
                            r && itemsRefAry.push(r);
                        }}>
                        {renderTemplate(item)}
                    </li>
                </>
            );
        });
    };

    const renderDropdown = () => {
        return (
            <>
                <Transition
                    in={isShowDropdown || isLoading}
                    animation="scale-in-top"
                    timeout={300}
                    onExited={() => {
                        cleanSuggestions();
                    }}>
                    <ul className="sd-suggestion-list" ref={itemContainerRef}>
                        {isLoading && (
                            <div className="icon-loading">
                                <TransIcon icon="spinner" spin />
                            </div>
                        )}
                        {renderDropdownItem()}
                    </ul>
                </Transition>
            </>
        );
    };

    const renderRemind = () => {
        return (
            <>
                <Transition
                    in={isRemind && isTriggerSearch.current && !isLoading}
                    animation="scale-in-top"
                    timeout={300}
                    onExited={() => {
                        remind && setIsRemind(false);
                    }}>
                    {remind && inputValue ? (
                        <ul className="sd-suggestion-list">
                            {remind ? <li className="suggestion-remind">{remind}</li> : <></>}
                        </ul>
                    ) : (
                        <></>
                    )}
                </Transition>
            </>
        );
    };

    const renderAutoComplete = () => {
        const classes = classNames('sd-auto-complete', {
            [`auto-complete-size-${inputSize}`]: inputSize
        });
        const defStyle = {
            width: `${defSize?.width}`,
            height: `${defSize?.height}`,
            ...style
        };
        return (
            <>
                <div className={classes} ref={componentRef} style={defSize}>
                    <Input
                        value={inputValue}
                        style={defStyle}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                        {...restProps}
                    />
                    {suggestions.length !== 0 ? renderDropdown() : renderRemind()}
                </div>
            </>
        );
    };

    return <>{renderAutoComplete()}</>;
};

export default AutoComplete;
