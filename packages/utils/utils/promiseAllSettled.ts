function allSettled(promises) {
    return new Promise((resolve) => {
        const results = [];
        let completedCount = 0;

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    results[index] = { status: 'fulfilled', value };
                })
                .catch(reason => {
                    results[index] = { status: 'rejected', reason };
                })
                .finally(() => {
                    completedCount++;
                    // 当所有 Promise 都完成时，解析结果
                    if (completedCount === promises.length) {
                        resolve(results);
                    }
                });
        });
    });
}