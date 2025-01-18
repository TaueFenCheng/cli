import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";
export * from "./measure";
console.log(onCLS);
console.log(onLCP);
console.log(onFCP);
console.log(onTTFB);
console.log(onINP);

export { onCLS, onLCP, onFCP, onTTFB, onINP };
