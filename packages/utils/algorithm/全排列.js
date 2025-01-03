var permute = (nums) => {
  const ret = []; // 存储结果的数组

  function dfs(arr, getIndex) {
    // 跳出的标志
    if (arr.length === nums.length) {
      ret.push(arr);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      if (!!getIndex[i]) {
        // 已经为1
        continue; // 跳出本次循环
      }
      getIndex[i] = 1; // 标记已访问
      dfs([...arr, num], getIndex); // 递归 将当前num 合并入数组
      getIndex[i] = 0;
    }
  }
  // 标志每个值是否被访问
  const flagArr = new Array(nums.length);
  dfs([], flagArr);
  return ret;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute2 = (nums) => {
  const res = [];
  const visited = Array(nums.length).fill(false);
  // let visited = {}
  function brack(permis) {
    if (permis.length === nums.length) {
      res.push([...permis]);
    }
    for (let i = 0; i < nums.length; i++) {
      // 如果之前选择过 直接跳过
      if (visited[i]) {
        continue;
      }
      // 选择
      visited[i] = true;
      permis.push(nums[i]);
      // 递归
      brack(permis);

      // 回溯之后撤销选择
      visited[i] = false;
      permis.pop();
    }
  }
  brack([]);
  return res;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute3 = (nums) => {
  const resd = [];
  const map = new Map();
  function per(res) {
    if (res.length === nums.length) {
      resd.push([...res]);
      return resd;
    }
    for (let i = 0; i < nums.length; i++) {
      if (map.get(nums[i])) {
        continue;
      }
      res.push(nums[i]);
      map.set(nums[i], true);
      per(res);
      // map.set(i,false)
      map.delete(nums[i]);
      res.pop();
    }
  }
  per([]);
  return resd;
};
