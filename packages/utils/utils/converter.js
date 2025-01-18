/**
 * @description 驼峰转换
 * @description 下划线 转大写
 */

function converter(obj = {}) {
  const newObj = {};
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

const arr = [
  {
    id: 1,
    name: "JJ1",
  },
  {
    id: 2,
    name: "JJ2",
  },
  {
    id: 1,
    name: "JJ1",
  },
  {
    id: 4,
    name: "JJ4",
  },
  {
    id: 2,
    name: "JJ2",
  },
];

/**
 *
 * @description 数组合并 重复的key值 不合并
 * @param {*} arr
 * @returns
 */
const unique = (arr) => {
  const map = new Map();
  return arr.reduce((prev, cur) => {
    // 当前map中没有，说明可以和上一个合并
    if (!map.has(cur.id)) {
      map.set(cur.id, true);
      return [...prev, cur];
    } else {
      // 已经被标记的就不用合并了
      return prev;
    }
  }, []);
};

console.log(unique(arr), "unique");

const a = converter({
  a_e_f: {
    s_s_g: 2634834,
  },
});
// console.log(a);

//! demo
// _e e kkkkkkkkkkkkkk
// _f f kkkkkkkkkkkkkk
// { aEF: { s_s_g: 2634834 } }

export default converter;
