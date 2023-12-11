import { ReactNode } from 'react';

type ChildrenType = 'string' | 'object';
type DefNode = ReactNode | Array<ReactNode>;

const reserveChildrenType = (children: ReactNode, type: ChildrenType, defNode?: DefNode) => {
    if (Array.isArray(children)) return children.filter((item) => typeof item === type);
    if (typeof children === type) return children;
    if (defNode) return defNode;
    return;
};

export default reserveChildrenType;
