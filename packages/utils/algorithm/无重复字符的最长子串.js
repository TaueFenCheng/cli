/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let res = 0
    let n = s.length
    let left = 0
    let right = 0
    let set = new Set()
    while (right < n) {
        while (set.has(s[right])) { // 出现重复 滑动窗口
            set.delete(s[left])
            left++
        }
        set.add(s[right])
        right++
        res = Math.max(res, right - left)
    }
    return res
};