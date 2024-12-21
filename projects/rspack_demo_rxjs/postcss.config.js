module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-preset-env"),
    require("postcss-pxtorem")({
      //   rootValue: 16,
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
    }),
  ],
};
