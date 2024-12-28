import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["index.ts"],
	splitting: false,
	sourcemap: true,
	format: ["cjs", "esm"],
	clean: true,
	outDir: "dist",
	target: "es5",
});
