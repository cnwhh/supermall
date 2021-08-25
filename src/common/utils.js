// 防抖操作
// 传入一个函数func，需要等多久delay
export function debouce(func, delay) {
  let timer = null;

  return function (...args) {
    // 如果有timer这个值，就把它清除掉
    if (timer) clearTimeout(timer);

    // 然后重新计时
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    // fmt = fmt.replace('yy', (19).substr(2))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 2、获取
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};
