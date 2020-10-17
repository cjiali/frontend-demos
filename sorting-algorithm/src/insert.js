/**
 * 将待排序的元素按照大小顺序, 依次插入到一个已经排好序的数组之中, 直到所有的元素都插入进去
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