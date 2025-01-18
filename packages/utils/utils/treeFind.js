// 查询id为10的节点，输出节点路径如[1, 3, 10]
const treeData = [
  {
    id: 1,
    name: "jj1",
    children: [
      { id: 2, name: "jj2", children: [{ id: 4, name: "jj4" }] },
      {
        id: 3,
        name: "jj3",
        children: [
          { id: 8, name: "jj8", children: [{ id: 5, name: "jj5" }] },
          { id: 9, name: "jj9", children: [] },
          { id: 10, name: "jj10", children: [] },
        ],
      },
    ],
  },
];
const path = findNum(10, treeData);
console.log("path", path);

/**
 * @description 树路径查找
 * @description dfs  入栈  回溯  出栈
 * @param {} target
 * @param {*} data
 * @returns
 */
// 实现
const findNum = (target, data) => {
  let result = [];
  const DG = (path, data) => {
    if (!data.length) return;
    data.forEach((item) => {
      path.push(item.id); // 入栈
      if (item.id === target) {
        // 找到
        result = JSON.parse(JSON.stringify(path));
      } else {
        const children = item.children || [];
        // DFS 带着路径和  children 继续dfs 查找
        DG(path, children);
        //! 没找到 回溯
        path.pop();
      }
    });
  };
  DG([], data);
  return result;
};
