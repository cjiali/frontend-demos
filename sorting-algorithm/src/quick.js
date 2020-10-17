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
