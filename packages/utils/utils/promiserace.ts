export function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    // 遍历所有传入的 Promise
    for (const promise of promises) {
      // 将每个 Promise 转换为 Promise 对象
      Promise.resolve(promise)
        .then(resolve) // 第一个成功则调用 resolve
        .catch(reject); // 第一个失败则调用 reject
    }
  });
}
