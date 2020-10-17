# 排序算法

## 冒泡排序

两两比较

```js
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

## 选择排序

遍历自身以后的元素，最小的元素跟自己调换位置

```js
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

## 插入排序

### 直接插入排序

 将待排序的元素按照大小顺序, 依次插入到一个已经排好序的数组之中, 直到所有的元素都插入进去.

```js
function insertSort(arr) {
    for(let i = 1; i < arr.length; i++) {  //外循环从1开始，默认arr[0]是有序段
        for(let j = i; j > 0; j--) {  //j = i,将arr[j]依次插入有序段中
            if(arr[j] < arr[j-1]) {
                [arr[j],arr[j-1]] = [arr[j-1],arr[j]];
            } else {
                break;
            }
        }
    }
    return arr;
}
```

### 折半插入排序

### 希尔排

不定步数的插入排序，插入排序

## 快速排序

- 选择基准值(base)，原数组长度减一(基准值)，使用 splice
- 循环原数组，小的放左边(left数组)，大的放右边(right数组);
- concat(left, base, right)
- 递归继续排序 left 与 right

```js
function quickSort(arr) {
    if(arr.length <= 1) {
        return arr;  //递归出口
    }
    var left = [],
        right = [],
        current = arr.splice(0,1); 
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] < current) {
            left.push(arr[i])  //放在左边
        } else {
            right.push(arr[i]) //放在右边
        }
    }
    return quickSort(left).concat(current,quickSort(right));
}
```



- 口诀: 插冒归基稳定，快选堆希不稳定



![img](https://user-gold-cdn.xitu.io/2019/2/14/168e9d8524a2b947?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



稳定性： 同大小情况下是否可能会被交换位置, 虚拟dom的diff，不稳定性会导致重新渲染；