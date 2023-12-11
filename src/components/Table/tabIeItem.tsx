import { FC, ReactNode, useContext } from 'react';
import { TableContext } from './table';

export interface TableItemProps {
    label: string | React.ReactElement;
    disabled?: boolean;
    children?: ReactNode;
}

const TableItem: FC<TableItemProps> = ({ children, disabled }) => {
    const context = useContext(TableContext);
    context.disabled ? (disabled = true) : disabled;

    // console.log(context);
    if (!context.isUseAlone) {
        return (
            <>
                <div className="sd-tab-item">{children}</div>
            </>
        );
    } else {
        console.error('Warring: MenuItem can not be used alone');
    }
};

TableItem.displayName = 'TableItem';

export default TableItem;
