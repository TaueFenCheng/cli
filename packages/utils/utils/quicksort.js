function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // 获取分区索引
    const pivotIndex = partition(arr, low, high);
    // 递归排序左右子数组
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  // 选择基准值，这里选择最后一个元素
  const pivot = arr[high];
  let i = low - 1; // 小于基准值的元素索引

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      // 交换 arr[i] 和 arr[j]
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  // 交换 arr[i + 1] 和 arr[high]（将基准值放到正确位置）
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1; // 返回基准值的索引
}

// 示例使用
const array = [34, 7, 23, 32, 5, 62];
const sortedArray = quickSort(array);
console.log(sortedArray); // 输出：[5, 7, 23, 32, 34, 62]
