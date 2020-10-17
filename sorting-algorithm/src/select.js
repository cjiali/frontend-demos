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