import { RefObject, useEffect } from 'react';

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            // Node.contains 用於檢查是否為指定節點的後代，即子節點
            if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('click', listener);
        return () => {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
}

export default useClickOutside;
