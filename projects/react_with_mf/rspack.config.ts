import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import * as RefreshPlugin from "@rspack/plugin-react-refresh";
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/rspack");

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
  devServer: {
    port: 2000,
  },
  output: {
    // 需要设置一个唯一值，不能和其他应用相等
    uniqueName: "federation_provider",
    // 使用 manifest 必须要配置 publicPath
    publicPath: "http://localhost:2000/",
  },
  module: {
    // 启用默认导出方式
    parser: {
      'css/auto': {
        namedExports: false,
      },
    },
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: 'sass-loader',
            options: {
              // 同时使用 `modern-compiler` 和 `sass-embedded` 可以显著提升构建性能
              // 需要 `sass-loader >= 14.2.1`
              api: 'modern-compiler',
              implementation: require.resolve('sass-embedded'),
            },
          },
        ],
        // 如果你需要将 '*.module.(sass|scss)' 视为 CSS Modules 那么将 'type' 设置为 'css/auto' 否则设置为 'css'
        type: 'css/auto',
      },
      {
        test: /\.(jsx?|tsx?)$/,
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
    // mf 插件
    // new ModuleFederationPlugin({
    //   name: "federation_provider",
    //   fileName: "testmf.js",
    //   exposes: {
    //     "./button": "./src/button.tsx",
    //   },
    //   shared: ["react", "react-dom"],
    //   //   react: {
    //   // 	singleton: true,
    //   //   },
    //   //   'react-dom': {
    //   // 	singleton: true,
    //   //   },
    // }),
    new rspack.container.ModuleFederationPlugin({
      // options
      name: "federation_provider",
      filename: "testmf.js",
      exposes: {
        "./button": "./src/components/button.tsx",
      },
      // shared: ["react", "react-dom"],
    }),
  ].filter(Boolean),
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
  experiments: {
    css: true,
  },
});
