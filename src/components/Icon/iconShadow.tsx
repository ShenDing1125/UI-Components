import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { FC, ReactNode, useContext } from 'react';
import { IconContext } from './icon';

type ShadowMove = 'near' | 'mid' | 'far';
type ShadowBlur = 'less' | 'mid' | 'more';
type ShadowColor = 'light' | 'mid' | 'dark';
export interface IconShadowProps {
    blur?: ShadowBlur;
    position?: ShadowMove;
    color?: ShadowColor;
    defBlur?: string;
    defPosition?: { x: string; y: string };
    defColor?: string;
    children?: ReactNode;
}

const IconShadow: FC<IconShadowProps> = (props) => {
    const context = useContext(IconContext);
    const { icon, size, isUseAlone, restProps } = context;
    const { blur, position, color, defBlur, defPosition, defColor, children } = props;
    const shadowDefPosition = {
        transform: `translate(${defPosition?.x}, ${defPosition?.y})`
    };
    const shadowDefOverall = {
        transform: `translate(${defPosition?.x}, ${defPosition?.y})`,
        backdropFilter: `blur(${defBlur})`
    };
    const shadowClasses = classNames(
        'icon-shadow',
        { [`shadow-position-${position}`]: position },
        { [`shadow-color-${color}`]: color }
    );
    const layerClasses = classNames(
        'shadow-layer',
        { [`shadow-position-${position}`]: position },
        { [`shadow-blur-${blur}`]: blur }
    );
    // 檢查 <Icon> 是否有使用其它的功能Props，例如: spin(旋轉)
    function isOtherIconFnProps(restProps: FontAwesomeIconProps | undefined) {
        return restProps && Object.values(restProps).find((value) => typeof value === 'boolean');
    }
    const renderIconShadow = () => {
        if (typeof children === 'undefined' && !isUseAlone && !isOtherIconFnProps(restProps)) {
            return (
                <>
                    <FontAwesomeIcon
                        className={shadowClasses}
                        icon={icon}
                        size={size}
                        color={defColor}
                        style={shadowDefPosition}
                    />
                    <div className={layerClasses} style={shadowDefOverall}></div>
                </>
            );
        } else if (children) {
            console.error('Warring: IconShadow can not contain other DOM or text');
        } else if (isUseAlone) {
            console.error('Warring: IconShadow can not be used alone');
        } else {
            console.error('Warring: IconShadow can not support other Icon function props');
        }
    };
    return <>{renderIconShadow()}</>;
};
IconShadow.displayName = 'IconShadow';

export default IconShadow;
