var levelOrder = (root) => {
  if (!root) {
    return [];
  }
  const res = [];
  const quene = [];
  quene.push(root); // 队列入队
  while (quene.length !== 0) {
    const subTemp = [];
    let len = quene.length;
    while (len) {
      const node = quene.shift();
      subTemp.push(node.val);
      if (node.left) {
        quene.push(node.left);
      }
      if (node.right) {
        quene.push(node.right);
      }
      len--;
    }
    res.push(subTemp);
  }
  return res;
};
