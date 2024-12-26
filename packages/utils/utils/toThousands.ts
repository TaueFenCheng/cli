/**
 * @description 将数字转换成千分位
 */
export function toThousands(num: string | number) {
  num = num.toString();
  return num.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
}

/**
 *
 * @param num
 * @description 数字转换为千分位
 * @returns
 */
export function toThousands2(num: number | string) {
  num = num.toString();
  let result = "";
  while (num.length > 3) {
    result = "," + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  result = num + result;
  return result;
}
