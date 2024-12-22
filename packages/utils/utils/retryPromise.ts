/**
 * 
 * @param fn 
 * @param retries 
 * @param delay
 * @description 實現promise的重試機制 
 * @returns 
 */
function retryPromise(fn, retries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    const attempt = (attemptNumber) => {
      fn()
        .then(resolve) // 如果成功，调用 resolve
        .catch((error) => {
          if (attemptNumber <= retries) {
            console.log(
              `Attempt ${attemptNumber} failed. Retrying in ${delay}ms...`
            );
            setTimeout(() => attempt(attemptNumber + 1), delay); // 延迟后重试
          } else {
            reject(error); // 超过重试次数，调用 reject
          }
        });
    };

    attempt(1); // 开始第一次尝试
  });
}
