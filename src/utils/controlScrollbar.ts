import { RefObject, useRef } from 'react';

function controlScrollbar(containerRef: RefObject<any>, itemsRefAry: RefObject<any>[]) {
    const itemsRef: any[] = itemsRefAry;
    const itemContainerRef = containerRef;
    const baseItemHight = useRef(null); // 每個 item 的固定高度
    const itemContainerHight = useRef(null); // item 容器的高度
    const showItemMaxNum = useRef(-1); // 容器內總共可以顯示多少的 item
    const storeItemMaxPage = useRef(2); // 以容器內的顯示數量，將 item 分成各組，用於紀錄該 item 位於哪一組
    const itemsHight = useRef(-1); // 所有 item 展開的最大高度
    const maxItemsRefLength = useRef(-1);

    return {
        setScrollbarIndex: (index: number) => {
            // 獲取 scrollbar info
            if (itemContainerRef.current !== null) {
                baseItemHight.current = itemsRef[0].getBoundingClientRect().height;
                itemContainerHight.current = itemContainerRef.current.getBoundingClientRect().height;
            }
            if (baseItemHight.current && itemContainerHight.current) {
                showItemMaxNum.current = Math.floor(itemContainerHight.current / baseItemHight.current);
                itemsHight.current = itemsRef.length * baseItemHight.current;
                maxItemsRefLength.current = itemsRef.length - 1;
            }

            // 控制 scrollbar 位置
            if (baseItemHight.current && itemContainerHight.current) {
                if (itemsHight.current <= itemContainerHight.current) return;

                if (index < 0) index = maxItemsRefLength.current;
                if (index > maxItemsRefLength.current) index = 0;

                if (showItemMaxNum.current !== -1 && index >= showItemMaxNum.current * (storeItemMaxPage.current - 1)) {
                    // 向下滾動
                    if (index >= showItemMaxNum.current * storeItemMaxPage.current) {
                        storeItemMaxPage.current++;
                    }

                    if (index < showItemMaxNum.current * storeItemMaxPage.current) {
                        itemContainerRef.current.scrollTop =
                            showItemMaxNum.current * (storeItemMaxPage.current - 1) * baseItemHight.current;
                    }

                    // 向上滾動
                    if (index === showItemMaxNum.current * (storeItemMaxPage.current - 1)) {
                        storeItemMaxPage.current--;
                        itemContainerRef.current.scrollTop =
                            showItemMaxNum.current * storeItemMaxPage.current * baseItemHight.current;
                    }
                }

                // 回到第一項
                if (index === 0 && storeItemMaxPage.current >= 2) {
                    storeItemMaxPage.current = 2;
                    itemContainerRef.current.scrollTop = 0;
                }

                // 回到最後一項
                if (index === maxItemsRefLength.current) {
                    storeItemMaxPage.current = Math.floor(itemsRef.length / showItemMaxNum.current + 1);
                    itemContainerRef.current.scrollTop =
                        showItemMaxNum.current * storeItemMaxPage.current * baseItemHight.current;
                }
            }
        }
    };
}

export default controlScrollbar;
