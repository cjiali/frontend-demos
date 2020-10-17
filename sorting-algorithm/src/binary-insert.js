/**
 * 算法逻辑:
 * 1. 取`0 ~ i-1`的中间点（ `m = (i-1)>>1` ）， `array[i]` 与 `array[m]` 进行比较，
 *          若`array[i] < array[m]` ，则待插入的元素`array[i]` 应处于数组索引的 `0 ~ m` 之间；
 *          反之，则说明它应该处于数组的 `m ~ i-1` 索引之间；
 * 2. 重复步骤1，每次缩小一半的查找范围，直至找到插入的位置；
 * 3. 将数组中插入位置之后的元素全部后移一位；
 * 4. 在指定位置插入第 i 个元素。
 * @param {Array} arr 待排序的数组
 */
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
