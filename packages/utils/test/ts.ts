const a = ["1", "2", "3"]; // 识别为字符串数组
const a1 = ["1", "2", "3"] as const; // 识别为元祖


type items = (typeof a)[number];
// 取数组的元素类型
type Tuple = (typeof a1)[number];
