/**
 * @description 二叉树最大高度
 * @param {*} root
 * @returns
 */
function maxBinargtree(root) {
  if (!root) {
    return 0;
  }
  if (root) {
    const left = maxBinargtree(root.left);
    const right = maxBinargtree(root.right);
    return Math.max(left, right) + 1;
  }
}
