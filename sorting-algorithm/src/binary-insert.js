export default function (arr) {
    let l = arr.length;

    for (let i = 1; i < l; i++) {
        let low = 0,
            high = i - 1,
            curr = arr[i];
        while (low <= high) {
            let m = (low + high) >> 1; // x>>1 是位运算中的右移运算, 表示右移一位, 等同于x除以2再取整, 即 x>>1 == Math.floor(x/2)
            if (arr[m] <= arr[i] /* 值相同时, 切换到高半区，保证稳定性 */) {
                low = m + 1; // 插入点在高半区
            } else {
                high = m - 1; // 插入点在低半区
            }
        }
        for (let j = i; j > low; j--) {
            // 插入位置之后的元素全部后移一位
            arr[j] = arr[j - 1];
        }
        arr[low] = curr;
    }
    return arr;
}
