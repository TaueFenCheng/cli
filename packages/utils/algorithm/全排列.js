var permute = function(nums) {
    let ret = [] // 存储结果的数组

    function dfs(arr,getIndex){
        // 跳出的标志
        if(arr.length === nums.length){
            ret.push(arr)
            return
        }
        for(let i=0;i<nums.length;i++){
            const num = nums[i]
            if(!!getIndex[i]){  // 已经为1 
                continue; // 跳出本次循环
            }
            getIndex[i] = 1 // 标记已访问
            dfs([...arr,num],getIndex)  // 递归 将当前num 合并入数组
            getIndex[i] = 0
        }
    }
    // 标志每个值是否被访问
    let flagArr = new Array(nums.length) 
    dfs([],flagArr)
    return ret
};