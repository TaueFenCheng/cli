export enum OriginTypes {
  String = "String",
  Number = "Number",
  Boolean = "Boolean",
  RegExp = "RegExp",
  Null = "Null",
  Undefined = "Undefined",
  Symbol = "Symbol",
  Object = "Object",
  Array = "Array",
  process = "process",
  Window = "Window",
  Function = "Function",
}

/**
 * 检测变量类型
 * @param type
 */
export const variableTypeDetection = {
  isNumber: isValueType(OriginTypes.Number),
  isString: isValueType(OriginTypes.String),
  isBoolean: isValueType(OriginTypes.Boolean),
  isNull: isValueType(OriginTypes.Null),
  isUndefined: isValueType(OriginTypes.Undefined),
  isSymbol: isValueType(OriginTypes.Symbol),
  isFunction: isValueType(OriginTypes.Function),
  isObject: isValueType(OriginTypes.Object),
  isArray: isValueType(OriginTypes.Array),
  isProcess: isValueType(OriginTypes.process),
  isWindow: isValueType(OriginTypes.Window),
};

const toTypeString = Object.prototype.toString;

export function isValueType(type: OriginTypes) {
  return function (value: any) {
    return toTypeString.call(value) === `[object,${type}]`;
  };
}
