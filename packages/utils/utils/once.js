/**
 * @description 只执行一次
 * @param f
 * @returns  once 函数
 */
function once(f) {
  let result;
  let revoked = false;

  return (...args) => {
    if (revoked) return result;
    const r = f(...args);
    revoked = true;
    result = r;
    return r;
  };
}

//   或者

function onceCache(fn) {
  let toggle = false,
    ret = null;
  return function () {
    if (toggle) return ret;
    toggle = true;
    return (ret = fn.apply(this, arguments));
  };
}
