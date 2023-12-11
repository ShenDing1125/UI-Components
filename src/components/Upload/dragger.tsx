import { FC, useState, DragEvent, ReactNode, useContext } from 'react';
import classNames from 'classnames';
import { uploadContext } from './upload';
import { TransIcon } from '../Icon';

interface DraggerProps {
    onFile: (files: FileList) => void;
    children?: ReactNode;
}

export const Dragger: FC<DraggerProps> = ({ onFile, children }) => {
    const [dragOver, setDragOver] = useState(false);

    const context = useContext(uploadContext);
    const classes = classNames('sd-uploader-dragger', {
        'is-drag-over': dragOver
    });
    const handleDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault();
        setDragOver(false);
        onFile(e.dataTransfer.files);
    };
    const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault();
        setDragOver(over);
    };
    const renderDragger = () => {
        return (
            <>
                <div
                    className={classes}
                    onDragOver={(e) => {
                        handleDrag(e, true);
                    }}
                    onDragLeave={(e) => {
                        handleDrag(e, false);
                    }}
                    onDrop={handleDrop}>
                    {children ? children : <TransIcon icon="cloud-arrow-up" theme="secondary" size="2x"></TransIcon>}
                </div>
            </>
        );
    };
    return <>{!context.isUseAlone ? renderDragger() : console.error('Warring: Dragger can not be used alone')}</>;
};

export default Dragger;
