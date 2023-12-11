import React, { FunctionComponentElement, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName = 'scale-in-top' | 'scale-in-left' | 'scale-in-bottom' | 'scale-in-right';

type TransitionProps = CSSTransitionProps & {
    animation?: AnimationName;
    wrapper?: boolean; // 若該節點已有動畫效果，會用div標籤包裹避免動畫無效
    children?: ReactNode;
};

const Transition: React.FC<TransitionProps> = (props) => {
    const { children, animationTime, classNames, animation, wrapper, ...restProps } = props;
    const nodeRef = React.useRef(null);

    return (
        <CSSTransition nodeRef={nodeRef} classNames={classNames ? classNames : animation} {...restProps}>
            {wrapper ? (
                <div ref={nodeRef}>{children}</div>
            ) : (
                React.cloneElement(children as FunctionComponentElement<TransitionProps>, { ref: nodeRef })
            )}
        </CSSTransition>
    );
};

Transition.defaultProps = {
    unmountOnExit: true, // 觸發前創建節點，結束後移除節點，能確保動畫完整執行
    appear: true // 初始執行動畫，必須與"in"一同為true才能啟動
};

export default Transition;
