import React, { FC, useRef, ChangeEvent, useState, createContext } from 'react';
import axios, { AxiosProgressEvent } from 'axios';
import UploadList from './uploadList';
import Dragger from './dragger';

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    fileId: string;
    size: number;
    name: string;
    percent: number;
    status?: UploadFileStatus;
    response?: any;
    error?: any;
    raw?: File;
}

export interface UploadProps {
    action: string; // 上傳地址
    defaultFileList?: UploadFile[]; // 默認附件的資訊
    beforeUpload?: (file: File) => boolean | Promise<File>; // 上傳前
    onProgress?: (percentage: number, file: UploadFile) => void; // 上傳中
    onSuccess?: (data: any, file: UploadFile) => void; // 傳送完成
    onError?: (err: any, file: UploadFile) => void; // 傳送失敗
    onChange?: (file: UploadFile) => void; // 上傳 成功 or 失敗 "後"被調用
    onRemove?: (file: UploadFile) => void; // 文件移除調用
    headers?: { [key: string]: any }; // 額外頭訊息
    fileName?: string;
    data?: { [key: string]: any }; // 文件的額外參數
    withCredentials?: boolean; // 是否挾帶 cookie
    accept?: string; // 選擇上傳類型
    multiple?: boolean;
    drag?: boolean; // 是否使用拖動方式上傳
    children?: React.ReactNode;
}

export const uploadContext = createContext<{ isUseAlone: boolean }>({ isUseAlone: true });

export const Upload: FC<UploadProps> = (props) => {
    const {
        action,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        fileName,
        headers,
        data,
        withCredentials,
        accept,
        multiple,
        children,
        drag
    } = props;
    const fileInput = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList((prevList) => {
            return prevList.map((file) => {
                if (file.fileId === updateFile.fileId) {
                    return { ...file, ...updateObj };
                } else {
                    return file;
                }
            });
        });
    };
    const handleClick = () => {
        fileInput.current && fileInput.current.click();
    };
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        uploadFiles(files);
        fileInput.current && (fileInput.current.value = ''); // 清空
    };
    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => {
            return prevList.filter((item) => item.fileId !== file.fileId);
        });

        onRemove && onRemove(file);
    };
    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files);

        postFiles.forEach((file) => {
            if (!beforeUpload) {
                post(file);
            } else {
                const result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then((processedFile) => {
                        post(processedFile);
                    });
                } else if (result) {
                    post(file);
                }
            }
        });
    };
    const post = (file: File) => {
        let _file: UploadFile = {
            fileId: Date.now() + '',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        setFileList((prevList) => {
            return [_file, ...prevList];
        });
        const formData = new FormData();
        formData.append(fileName || 'file', file);
        if (data) {
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
        }
        axios
            .post(action, formData, {
                headers: {
                    ...headers,
                    'Content-Type': 'multipart/form-data' // 以二進制方式傳送
                },
                withCredentials, // 允許 cookie
                onUploadProgress: (e: AxiosProgressEvent) => {
                    let percentage = (e.total && Math.round((e.loaded * 100) / e.total)) || 0;
                    if (percentage < 100) {
                        updateFileList(_file, { percent: percentage, status: 'uploading' });
                        onProgress && onProgress(percentage, _file);
                    }
                }
            })
            .then((resp) => {
                updateFileList(_file, { status: 'success', response: resp.data });
                onSuccess && onSuccess(resp.data, _file);
                onChange && onChange(_file);
            })
            .catch((err) => {
                updateFileList(_file, { status: 'error', error: err });
                onError && onError(err, _file);
                onChange && onChange(_file);
            });
    };

    const renderUpload = () => {
        return (
            <>
                <div className="sd-upload">
                    <div className="upload-input" onClick={handleClick}>
                        {drag ? (
                            <uploadContext.Provider value={{ isUseAlone: false }}>
                                <Dragger
                                    onFile={(files) => {
                                        uploadFiles(files);
                                    }}>
                                    {children}
                                </Dragger>
                            </uploadContext.Provider>
                        ) : (
                            <>{children}</>
                        )}
                        <input
                            className="file-input"
                            ref={fileInput}
                            onChange={handleFileChange}
                            type="file"
                            accept={accept}
                            multiple={multiple}
                        />
                    </div>
                    <uploadContext.Provider value={{ isUseAlone: false }}>
                        <UploadList fileList={fileList} onRemove={handleRemove} />
                    </uploadContext.Provider>
                </div>
            </>
        );
    };

    return <>{renderUpload()}</>;
};

Upload.defaultProps = {
    fileName: 'file'
};
export default Upload;
