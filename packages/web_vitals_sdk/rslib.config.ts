import { defineConfig } from "@rslib/core";

export default defineConfig({
  lib: [
    {
      format: "esm",
      syntax: "es2021",
      // dts: true,
      dts: false,
      autoExtension: false,
      output: {
        target: "web",
        filename: {
          js: "[name].mjs",
        },
      },
    },
    {
      format: "umd",
      umdName: "webPerformance",
      autoExtension: false,
      dts: true,
      output: {
        target: "web",
        filename: {
          js: "[name].umd.js",
        },
      },
    },
    {
      format: "cjs",
      syntax: "es2021",
      bundle: true,
    },
  ],
  source: {
    entry: {
      index: "./src/index.ts",
    },
  },
  output: {
    target: "node",
    minify: true,
  },
});
