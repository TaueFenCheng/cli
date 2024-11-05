/**
 * @description 请求types
 */

export enum businessEnum {
  yomi = 1,
  zhuiya = 2,
  bos = 3,
  hgame = 4,
}

export type enumsBusType = keyof typeof businessEnum;
