/**
 * @description partial 递归
 */
type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P];
};
type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>;
