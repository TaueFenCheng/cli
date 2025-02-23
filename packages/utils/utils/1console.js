const arr = Array.from({length:100}).map((item,index)=>index)
console.log(arr)

const fn  = (arr)=>{
    let s  = setInterval(()=>{
        const item = arr.shift()
        console.log(item)
        fn(arr)
        clearInterval(s)
    },1000)
}
fn(arr,arr.length)