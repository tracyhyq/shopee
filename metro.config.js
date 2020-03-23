/*
 * @description: Metro configuration for React Native
 *               https://facebook.github.io/metro/docs/configuration  
 *               Svg useage
 *               https://github.com/aeirola/react-native-svg-asset-plugin  
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-23 19:41:43
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
    assetPlugins: ['react-native-svg-asset-plugin'],
    svgAssetPlugin: {
      pngCacheDir: '.png-cache',
      scales: [1, 2, 3],
      output: {
        compressionLevel: 9,
      },
    },
  },
};
