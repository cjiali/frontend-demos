# Util Library



## 防抖 (debounce)

将多次高频操作优化为只在最后一次执行，通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可。

```js
/**
 * 将多次高频操作优化为只在最后一次执行，通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可。
 * @param {Function} fn 高频操作函数
 * @param {Number} wait 等待（间隔）时间
 * @param {Boolean} immediate 是否立即执行
 */
export default function debounce(fn, wait, immediate) {
    let timeout = null,
        result;
    // 这里返回的函数是每次用户实际调用的防抖函数
    // 如果已经设定过定时器了就清空上一次的定时器
    // 开始一个新的定时器，延迟执行用户传入的方法
    return function () {
        let context = this, args = arguments;
        if (immediate && !timeout) {
            result = fn.apply(context, args);
        }
        clearTimeout(timeout);
        timeout = immediate
            ? setTimeout(() => {
                  timeout = null;
              }, wait)
            : setTimeout(() => {
                  fn.apply(context, args);
              }, wait);

        return result;
    };
}
```



## 节流 (throttle)

每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作，通常使用场景: 滚动条事件 或者 resize 事件，通常每隔 100~500 ms执行一次即可。

```js
function throttle(fn, wait, immediate) {
    let timer = null;
    let callNow = immediate;
    
    return function() {
        let context = this,
            args = arguments;

        if (callNow) {
            fn.apply(context, args);
            callNow = false;
        }

        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args);
                timer = null;
            }, wait);
        }
    }
}
```

