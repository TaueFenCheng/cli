import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import * as RefreshPlugin from "@rspack/plugin-react-refresh";
// import autoprefixer from "autoprefixer";
// import postcssPxtorem from "postcss-pxtorem";
const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
  context: __dirname,
  entry: {
    main: "./src/main.tsx",
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"],
  },
  experiments: {
    css: true,
  },
  module: {
    parser: {
      "css/auto": {
        namedExports: false,
      },
    },
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                rootValue: 100,
                unitPrecision: 5,
                //   propList: [
                // "font",
                // "font-size",
                // "line-height",
                // "letter-spacing",
                // "word-spacing",
                //   ],
                propList: ["*"],
                selectorBlackList: [],
                replace: true,
                mediaQuery: false,
                minPixelValue: 0,
                exclude: /node_modules/i,
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              // 同时使用 `modern-compiler` 和 `sass-embedded` 可以显著提升构建性能
              // 需要 `sass-loader >= 14.2.1`
              api: "modern-compiler",
              implementation: require.resolve("sass-embedded"),
            },
          },
        ],
        // 如果你需要将 '*.module.(sass|scss)' 视为 CSS Modules 那么将 'type' 设置为 'css/auto' 否则设置为 'css'
        type: "css/auto",
      },
      {
        test: /\.(jsx?|tsx?)$/i,
        exclude: [/node_modules/],
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),
    isDev ? new RefreshPlugin() : null,
  ].filter(Boolean),
  optimization: {
    minimizer: [
      // 壓縮js代碼
      new rspack.SwcJsMinimizerRspackPlugin(),
      // 壓縮css代碼
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
});
