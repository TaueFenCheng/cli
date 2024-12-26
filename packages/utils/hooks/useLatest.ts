import { useRef } from "react";

export function useLatest<T>(fn: T): T {
  const value = useRef(fn);
  value.current = fn;
  return value;
}
