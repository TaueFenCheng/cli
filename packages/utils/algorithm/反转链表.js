var reverseList = (head) => {

    let cur = head
    let next = null
    let prev = null
    while (cur) {
        next = cur.next
        cur.next = prev
        prev = cur
        cur = next
    }

    return prev
};