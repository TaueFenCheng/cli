module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-preset-env"),
    require("postcss-px-to-viewport")({
      //   rootValue: 16,
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: undefined,
      include: undefined,
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568
    }),
  ],
};
