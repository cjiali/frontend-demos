# Util Library



## 防抖与节流

一个经典比喻：

> 想象每天上班大厦底下的电梯。把电梯完成一次运送，类比为一次函数的执行和响应。假设电梯有两种运行策略 debounce 和 throttle，超时设定为15秒，不考虑容量限制。
> 函数防抖（debounce） 策略的电梯：如果电梯里有人进来，等待15秒。如果又人进来，15秒等待重新计时，直到15秒超时，开始运送。
> 函数节流（throttle） 策略的电梯：保证如果电梯第一个人进来后，15秒后准时运送一次，不等待。如果没有人，则待机。

即：

> 函数防抖： 在调用操作一定时间后，才会执行该方法，如果在该段时间内，再次调用该方法，则重新计算该执行时间间隔。
> 函数节流： 调用方法之前，预先设定一个执行周期，当调用动作的时间节点大于等于这个执行周期，才执行该方法，然后进入下一个新的执行周期。

简而言之，函数防抖和函数节流都是为了降低方法的执行频率，防止函数触发频率过高，导致浏览器响应速度跟不上触发频率，而出现浏览器假死、卡顿等现象，优化用户体验。

### 防抖 (debounce)

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



### 节流 (throttle)

每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作，通常使用场景: 滚动条事件 或者 resize 事件，通常每隔 100~500 ms执行一次即可。

```js
/**
 * 每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作，通常使用场景: 滚动条事件 或者 resize 事件，通常每隔 100~500 ms执行一次即可。
 * @param {Function} fn 高频操作函数
 * @param {Number} delay 下一次执行需延迟时间
 * @param {Number} must 多少时间内必须执行一次
 */
export default function throttle(fn, delay) {
    let timeout = null;
    return function () {
        let context = this,
            args = arguments;

        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                fn.apply(context, args);
            }, delay);
        }
    };
}
```

