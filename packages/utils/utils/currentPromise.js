function limitConcurrency(promises, concurrencyLimit) {
  const results = [];
  let index = 0; // 当前处理的 Promise 索引
  let activeCount = 0; // 当前活动的 Promise 数量

  return new Promise((resolve, reject) => {
    const runNext = () => {
      // 如果所有 Promise 都已处理，检查是否完成
      if (index >= promises.length && activeCount === 0) {
        return resolve(results);
      }

      // 如果还可以执行新的 Promise
      while (activeCount < concurrencyLimit && index < promises.length) {
        const currentIndex = index;
        index++;
        activeCount++;

        // 执行 Promise
        promises[currentIndex]()
          .then((result) => {
            results[currentIndex] = result; // 存储结果
          })
          .catch(reject) // 捕获错误并拒绝整个 Promise
          .finally(() => {
            activeCount--; // 完成后减少活动计数
            runNext(); // 尝试运行下一个
          });
      }
    };

    runNext(); // 启动并发处理
  });
}

function promiseLimit(promises, limit) {
  const res = [];
  let index = 0;
  let activeIndex = 0;
  return new Promise((resolve, reject) => {
    const exec = () => {
      if (index >= promises.length && !activeIndex) {
        resolve(res);
        return;
      }
      while (activeIndex < limit && index < promises.length) {
        activeIndex++;
        promises[index++]()
          .then((data) => {
            res[index] = data;
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            activeIndex--;
            exec(); // 继续执行下一个promise
          });
      }
    };

    exec();
  });
}
