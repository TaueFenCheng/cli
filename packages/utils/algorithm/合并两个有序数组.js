/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = (nums1, m, nums2, n) => {
    let p1 = 0, p2 = 0;
 const sorted = new Array(m + n).fill(0);
 var cur;
 while (p1 < m || p2 < n) {
     if (p1 === m) {
         cur = nums2[p2++];
     } else if (p2 === n) {
         cur = nums1[p1++];
     } else if (nums1[p1] < nums2[p2]) {
         cur = nums1[p1++];
     } else {
         cur = nums2[p2++];
     }
     sorted[p1 + p2 - 1] = cur;  // 将数组依次赋值给sorted
 }
 for (let i = 0; i < m + n; ++i) {
     nums1[i] = sorted[i];
 }
 return nums1
};