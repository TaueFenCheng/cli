/**
 * urlsearchparams
 * @description 貨物url上的參數
 */
// http://xxxxxxx/xxx.html?a=b&c=d&xxxxxx
export function getUrlSearchParams(url: string, key: string) {
  const search = url.split("?")[1];
  const obs = search.split("&");
  let map = {};
  for (const item of obs) {
    const [key, value] = item.split("=");
    map[key] = value;
  }
  return map[key] || "";
}
