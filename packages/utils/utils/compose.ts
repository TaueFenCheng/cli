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
export function compose2(fns:any[]){
  return (...args)=>{
    return fns.reduce((a,b)=>{
      return a(b(...args))      
    },args)
  }
}


