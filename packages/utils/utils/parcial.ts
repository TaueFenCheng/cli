/**
 * @description partial 递归
 */
// eslint-disable-next-line no-unused-vars
type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P];
};
// eslint-disable-next-line no-unused-vars
type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>;
