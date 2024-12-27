/**
 * @description 层序遍历二叉树
 * @param {*} root
 * @returns
 */
function levelBinaryTree(root) {
  if (!root) {
    return [];
  }
  const res = [];
  const quene = [root];
  while (quene.length) {
    let len = quene.length;
    const subTemp = [];
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
}
