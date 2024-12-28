/**
 * @description 驼峰转换
 * @description 下划线 转大写
 */

function converter(obj = {}) {
  let newObj = {};
  for (const key in obj) {
    // if (Object.prototype.hasOwnProperty.call(obj, key)) {
    if (Object.hasOwn(obj, key)) {
      const newKey = key.replace(/_([a-z])/g, (match, p1) => {
        console.log(match, p1, "kkkkkkkkkkkkkk");
        return p1.toUpperCase();
      });
      newObj[newKey] = obj[key];
    }
  }
  return newObj;
}

const a = converter({
  a_e_f: {
    s_s_g: 2634834,
  },
});
console.log(a);

//! demo
// _e e kkkkkkkkkkkkkk
// _f f kkkkkkkkkkkkkk
// { aEF: { s_s_g: 2634834 } }


export default converter