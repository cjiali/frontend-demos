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

    timeout && clearTimeout(timeout);
    timeout = immediate ? setTimeout(function () {
      timeout = null;
    }, wait) : setTimeout(function () {
      fn.apply(context, args);
    }, wait);
    return result;
  };
}

/**
 * 每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作，通常使用场景: 滚动条事件 或者 resize 事件，通常每隔 100~500 ms执行一次即可。
 * @param {Function} fn 高频操作函数
 * @param {Number} delay 下一次执行需延迟时间
 * @param {Number} must 多少时间内必须执行一次
 */
function throttle(fn, delay) {
  var timeout = null;
  return function () {
    var context = this,
        args = arguments;

    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        fn.apply(context, args);
      }, delay);
    }
  };
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var class2type = "Boolean Number String Function Array Date RegExp Object Error".split(" ").reduce(function (acc, cur) {
  acc["[object ".concat(cur, "]")] = cur.toLocaleLowerCase();
  return acc;
}, {});
function type (obj) {
  // if (obj === null) return obj + "";
  if (obj == null) return String(obj); // Support: Android <=2.3 only (functionish RegExp)

  return _typeof(obj) === "object" ? class2type[{}.toString.call(obj)] || "object" // class2type[Object.prototype.toString.call(obj)] || "object"
  : _typeof(obj);
}

var index = {
  debounce: debounce,
  throttle: throttle,
  type: type
};

export default index;
