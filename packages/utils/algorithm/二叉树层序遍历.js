var levelOrder = function(root) {
    if(!root){
        return []
    }
    let res = []
    let quene = []
    quene.push(root) // 队列入队
    while(quene.length !== 0 ){
        let subTemp = []
        let len = quene.length
        while(len){
            let node = quene.shift()
            subTemp.push(node.val)
            if(node.left){
                quene.push(node.left)
            }
            if(node.right){
                quene.push(node.right)
            }
            len--
        }
        res.push(subTemp)
    }
    return res
};