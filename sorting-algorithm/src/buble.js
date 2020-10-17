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
