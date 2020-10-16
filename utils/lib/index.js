'use strict';

/**
 * 将多次高频操作优化为只在最后一次执行，通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可。
 * @param {Function} fn 高频操作函数
 * @param {Number} wait 等待（间隔）时间
 * @param {Boolean} immediate 是否立即执行
 */
function debounce(fn, wait, immediate) {
  var timeout = null,
      result; // 这里返回的函数是每次用户实际调用的防抖函数
  // 如果已经设定过定时器了就清空上一次的定时器
  // 开始一个新的定时器，延迟执行用户传入的方法

  return function () {
    var context = this,
        args = arguments;

    if (immediate && !timeout) {
      result = fn.apply(context, args);
    }

    clearTimeout(timeout);
    timeout = immediate ? setTimeout(function () {
      timeout = null;
    }, wait) : setTimeout(function () {
      fn.apply(context, args);
    }, wait);
    return result;
  };
}

var index = {
  debounce: debounce
};

module.exports = index;
