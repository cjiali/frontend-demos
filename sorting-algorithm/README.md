# 排序算法

## 冒泡排序

基本思想：两两交换。

```js
/**
 * 冒泡排序需要两个嵌套的循环：`外层循环`移动游标; `内层循环`遍历游标及之后(或之前)的元素, 通过两两交换的方式, 每次只确保该内循环结束位置排序正确,
 *     然后`内层循环`周期结束, 交由`外层循环`往后(或前)移动游标, 随即开始下一轮`内层循环`, 以此类推, 直至循环结束。
 * @param {Array} arr 待排序数组
 */
export default function buble(arr) {
    let l = arr.length;
    for (let i = l - 1; i > 1; i--) {
        for (let j = 0; j <= i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
```

> **Tips**: 由于冒泡排序只在相邻元素大小不符合要求时才调换他们的位置，它并不改变相同元素之间的相对顺序，因此它是稳定的排序算法。

## 选择排序

基本思想：遍历自身以后的元素，最小的元素跟自己调换位置。

```js
/**
 * 选择排序需要两个嵌套的循环：`内层循环`就像工人一样, 它是真正做事情的, `内层循环`每执行一遍, 将选出本次待排序的元素中最小(或最大)的一个, 存放在数组的起始位置；
 *    而 `外层循环`则像老板一样, 它告诉`内层循环`你需要不停的工作, 直到工作完成(也就是全部的元素排序完成)。
 * @param {Array} arr 待排序的数组
 */
export default function(arr){
    let l=arr.length;
    for(let i=0; i<l-1; i++){
        for(let j=i; j<l; j++){
            if(arr[i]>arr[j]){
                [arr[i], arr[j]]=[arr[j], arr[i]]
            }
        }
    }
    return arr;
}
```

> **Tips**: 选择排序每次交换的元素都有可能不是相邻的，因此它有可能打破原来值为相同的元素之间的顺序。 比如数组`[2,2,1,3]`， 正向排序时，第一个数字2将与数字1交换，那么两个数字2之间的顺序将和原来的顺序不一致， **虽然它们的值相同, 但它们相对的顺序却发生了变化**，即产生了 `不稳定性` 。

## 插入排序

### 直接插入排序

基本思想：将元素插入到已排序好的数组中。

```js
/**
 * 将待排序的元素按照大小顺序, 依次插入到一个已经排好序的数组之中, 直到所有的元素都插入进去。
 * @param {Array} arr 待排序数组
 */
export default function(arr){
    let l=arr.length;
    for(let i=1; i<l; i++){// 外循环从1开始，默认arr[0]是有序段
        for(let j=i; j>0; j--){ // j = i,将arr[j]依次插入有序段中
            if(arr[j-1]>arr[j]){
                [arr[j-1], arr[j]]=[arr[j], arr[j-1]]
            }
        }
    }
    return arr;
}
```

> **Tips**: 由于直接插入排序每次只移动一个元素的位置，并不会改变值相同的元素之间的排序，因此它是一种稳定排序。

### 折半插入排序

基本思想：鉴于插入排序第一部分为已排好序的数组，我们不必按顺序依次寻找插入点，只需比较它们的中间值与待插入元素的大小即可。

```js
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
```

> **Tips**: 同直接插入排序类似，折半插入排序每次交换的是相邻的且值为不同的元素，它并不会改变值相同的元素之间的顺序，因此它是稳定的。

### 希尔排序

不定步数的插入排序，插入排序

## 快速排序

基本思想：借用分治的思想，将数组拆分为两个子数组，其中一个子数组的所有元素都比另一个子数组的元素小，然后对这两个子数组再重复进行上述操作，直到数组不可拆分，排序完成。

```js
function partition(array, left, right) {
    // 分区操作
    let cursor = left;
    for (let i = left + 1; i <= right; i++) {
        // cursor 是较小值存储位置的游标
        if (array[i] < array[left] /* 以第一个元素为基准 */) {
            ++cursor;
            [array[i], array[cursor]] = [array[cursor], array[i]];
        }
    }
    [array[left], array[cursor]] = [array[cursor], array[left]]; // 将第一个元素移至中间
    return cursor;
}

/**
 * 将数组拆分为两个子数组，其中一个子数组的所有元素都比另一个子数组的元素小，然后对这两个子数组再重复进行上述操作，直到数组不可拆分，排序完成。
 * @param {Array} array 待排序的数组
 * @param {Number|undefined} left 左索引
 * @param {Number|undefined} right 右索引
 */
function quickSort(array, left, right) {
    left = typeof left == "number" ? left : 0;
    right = typeof right == "number" ? right : array.length - 1;
    if (left < right) {
        let partitionIndex = partition(array, left, right); // 切分的基准值
        quickSort(array, left, partitionIndex - 1);
        quickSort(array, partitionIndex + 1, right);
    }
    return array;
}

export default quickSort;
```

> **Tips**: 同选择排序相似，快速排序每次交换的元素都有可能不是相邻的，因此它有可能打破原来值为相同的元素之间的顺序， 因而快速排序并不稳定。

## 排序算法性能比较

稳定性：元素相同大小情况下是否可能会被交换位置。

- 记忆口诀: 插冒归基稳定，快选堆希不稳定；
- 对于虚拟dom的diff算法而言，不稳定性会导致重新渲染；

复杂度：

![img](https://user-gold-cdn.xitu.io/2019/2/14/168e9d8524a2b947?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



