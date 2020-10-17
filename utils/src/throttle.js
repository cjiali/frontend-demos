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
