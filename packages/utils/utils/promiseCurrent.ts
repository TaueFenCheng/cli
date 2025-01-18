async function promiseWithConcurrencyLimit(tasks, limit) {
  const results = [];
  const executing = [];
  for (const task of tasks) {
    const promise = task();
    results.push(promise);
    executing.push(promise);
    if (executing.length >= limit) {
      await Promise.race(executing);
      executing.splice(
        executing.findIndex((p) => p === promise),
        1,
      );
    }
  }
  await Promise.all(executing);
  return Promise.all(results);
}

export default promiseWithConcurrencyLimit;
