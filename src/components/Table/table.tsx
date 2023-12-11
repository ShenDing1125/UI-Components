import classNames from 'classnames';
import React, { FC, FunctionComponentElement, ReactNode, createContext, useState } from 'react';
import reserveChildrenType from '../../utils/reserveChildrenType';
import { TableItemProps } from './tabIeItem';

type TableMode = 'line' | 'card';
export interface TableProps {
    defaultIndex?: number;
    className?: string;
    onSelect?: (selectedIndex: number) => void;
    mode?: TableMode;
    disabled?: boolean;
    children?: ReactNode;
}
interface ITableContext {
    isUseAlone: boolean;
    disabled?: boolean;
}
export const TableContext = createContext<ITableContext>({ isUseAlone: true });

export const Table: FC<TableProps> = (props) => {
    const { defaultIndex, className, onSelect, mode, disabled, children } = props;
    const _children: ReactNode = reserveChildrenType(children, 'object', []);
    const [activeIndex, setActiveIndex] = useState(defaultIndex);

    const handleClick = (index: number, disabled: boolean | undefined) => {
        if (!disabled) {
            setActiveIndex(index);
            onSelect && onSelect(index);
        }
    };

    const tabNavClasses = classNames('sd-tab-nav', {
        'tab-nav-line': mode === 'line',
        'tab-nav-card': mode === 'card'
    });

    const passedContext: ITableContext = {
        disabled,
        isUseAlone: false
    };

    const renderTableNav = () => {
        return React.Children.map(_children, (child, index) => {
            const childElement = child as FunctionComponentElement<TableItemProps>;
            const { label, disabled } = childElement.props;
            const { displayName } = childElement.type;
            const tabItemClasses = classNames('tab-nav-item', {
                'is-active': activeIndex === index,
                disabled: disabled
            });

            if (displayName === 'TableItem') {
                return (
                    <>
                        <li
                            className={tabItemClasses}
                            key={`nav-item-${index}`}
                            onClick={() => {
                                handleClick(index, disabled);
                            }}>
                            {label}
                        </li>
                    </>
                );
            } else {
                console.error('Warring: Table has a child which is not a TableItem component');
            }
        });
    };

    const renderTableContent = () => {
        return React.Children.map(_children, (child, index) => index === activeIndex && child);
    };

    return (
        <>
            <div className={className}>
                <ul className={tabNavClasses}>{renderTableNav()}</ul>
                <div className="sd-tab-content">
                    <TableContext.Provider value={passedContext}>{renderTableContent()}</TableContext.Provider>
                </div>
            </div>
        </>
    );
};

Table.defaultProps = {
    defaultIndex: 0,
    mode: 'line'
};
export default Table;
