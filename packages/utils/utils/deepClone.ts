/**
 *
 * @param obj 原始对象
 * @param hash WeakMap 避免循环引用
 * @returns
 */

export function deepClone(obj, hash = new WeakMap()) {
  if (!obj) return null;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  if (typeof obj !== "object") return obj;
  if (hash.has(obj)) return hash.get(obj);
  const cloneObj = new obj.constructor(); // 负责拷贝的类型

  hash.set(obj, cloneObj);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
