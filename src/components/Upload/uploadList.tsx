import { FC, useContext } from 'react';
import { UploadFile, uploadContext } from './upload';
import { TransIcon } from '../Icon';
import Progress from '../Progress/progress';

interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = ({ fileList, onRemove }) => {
    const context = useContext(uploadContext);

    const renderAcceptTypeIcon = (fileName: string) => {
        if (fileName.includes('.')) {
            const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();

            switch (fileExtension) {
                // 圖片
                case 'jpg':
                case 'png':
                case 'gif':
                case 'svg':
                    return (
                        <>
                            <TransIcon icon="file-image" theme="secondary" />
                        </>
                    );
                // 文件
                case 'pdf':
                    return (
                        <>
                            <TransIcon icon="file-pdf" theme="secondary" />
                        </>
                    );
                case 'doc':
                case 'docx':
                    return (
                        <>
                            <TransIcon icon="file-doc" theme="secondary" />
                        </>
                    );

                case 'ppt':
                case 'pptx':
                    return (
                        <>
                            <TransIcon icon="file-powerpoint" theme="secondary" />
                        </>
                    );
                case 'xls':
                case 'xlsx':
                    return (
                        <>
                            <TransIcon icon="file-lines" theme="secondary" />
                        </>
                    );
                // 壓縮檔
                case 'rar':
                case 'zip':
                case '7z':
                    return (
                        <>
                            <TransIcon icon="file-zipper" theme="secondary" />
                        </>
                    );
                // 影音
                case 'mp3':
                case 'wav':
                case 'flac':
                    return (
                        <>
                            <TransIcon icon="music" theme="secondary" />
                        </>
                    );
                case 'mp4':
                case 'wmv':
                case 'avi':
                case 'ts':
                case 'flv':
                    return (
                        <>
                            <TransIcon icon="film" theme="secondary" />
                        </>
                    );
                default:
                    return (
                        <>
                            <TransIcon icon="file" theme="secondary" />
                        </>
                    );
            }
        } else {
            return (
                <>
                    <TransIcon icon="file-arrow-up" theme="secondary" />
                </>
            );
        }
    };

    const renderUploadList = () => {
        return (
            <>
                <ul className="sd-upload-list">
                    {fileList.map((item) => {
                        return (
                            <li className="upload-list-item" key={item.fileId}>
                                <span className={`file-name file-name-${item.status}`}>
                                    {renderAcceptTypeIcon(item.name)}

                                    {item.name}
                                </span>
                                <span className="file-status">
                                    {(item.status === 'uploading' || item.status === 'ready') && (
                                        <TransIcon icon="spinner" spin theme="primary" />
                                    )}
                                    {item.status === 'success' && <TransIcon icon="check-circle" theme="success" />}
                                    {item.status === 'error' && <TransIcon icon="times-circle" theme="danger" />}
                                </span>
                                <span className="file-actions">
                                    <TransIcon
                                        icon="times"
                                        onClick={() => {
                                            onRemove(item);
                                        }}
                                    />
                                </span>
                                {item.status === 'uploading' && <Progress percent={item.percent || 0} />}
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    };
    return <>{!context.isUseAlone ? renderUploadList() : console.error('Warring: UploadList can not be used alone')}</>;
};

export default UploadList;
