import { defineConfig } from "tsup";

export default defineConfig({
  // 入口文件 或者可以使用 entryPoints 底层是 esbuild
  entry: ["index.ts"],
  // 打包类型  支持以下几种 'cjs' | 'esm' | 'iife'
  format: ["cjs", "esm"],
  // 生成类型文件 xxx.d.ts
  dts: true,
  // 代码分割 默认esm模式支持 如果cjs需要代码分割的话就需要配置为 true
  splitting: true,
  // sourcemap
  sourcemap: false,
  // 每次打包先删除dist
  clean: true,
  outDir: "dist",
  // minify: true,
  cjsInterop: true,
  onSuccess: async () => {
    console.log("打包成功!");
    return;
  },
});
