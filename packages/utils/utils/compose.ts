/**
 * @description conpose 函数
 * @description 组合函数
 */

// 从右往左
export function compose(fns: Function[]) {
  return (val: any) => {
    return fns.reduceRight((arg, fn) => fn(arg), val);
  };
}

/**
 *
 * @param fns
 * @returns
 * @description reduce 实现 compose 函数 从右往左
 */
export function compose2(fns: any[]) {
  return (...args) => {
    return fns.reduce((a, b) => {
      return a(b(...args));
    }, args);
  };
}

/**
 * 大树相加
 */


let a = "9007199254740991";
let b = "1234567899999999999";

function add(a ,b){
   //取两个数字的最大长度
   let maxLength = Math.max(a.length, b.length);
   //用0去补齐长度
   a = a.padStart(maxLength , 0);//"0009007199254740991"
   b = b.padStart(maxLength , 0);//"1234567899999999999"
   //定义加法过程中需要用到的变量
   let t = 0;
   let f = 0;   //"进位"
   let sum = "";
   for(let i=maxLength-1 ; i>=0 ; i--){
      t = parseInt(a[i]) + parseInt(b[i]) + f;
      f = Math.floor(t/10);
      sum = t%10 + sum;
   }
   if(f == 1){
      sum = "1" + sum;
   }
   return sum;
}
