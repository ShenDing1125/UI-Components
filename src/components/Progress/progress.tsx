import React, { FC } from 'react';
import { ThemeProps } from '../Icon/icon';

type DefInputSize = { width?: string; height?: string; fontSize?: string; fontColor?: string };
export interface ProgressProps {
    percent: number;
    defSize?: DefInputSize;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
}

const Progress: FC<ProgressProps> = (props) => {
    const { percent, defSize, showText, styles, theme } = props;

    const defStyle = {
        width: `${defSize?.width}`,
        height: `${defSize?.height}`,
        ...styles
    };

    const renderProgress = () => {
        return (
            <>
                <div className="sd-progress-bar" style={styles}>
                    <div className="progress-bar-outer" style={defStyle}>
                        <div className={`progress-bar-inner color-${theme}`} style={{ width: `${percent}%` }}>
                            {showText && (
                                <span
                                    className="inner-text"
                                    style={{
                                        fontSize: defSize?.fontSize,
                                        color: defSize?.fontColor
                                    }}>{`${percent}%`}</span>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    };
    return <>{renderProgress()}</>;
};

Progress.defaultProps = {
    defSize: { height: '15px' },
    showText: true,
    theme: 'primary'
};
export default Progress;
