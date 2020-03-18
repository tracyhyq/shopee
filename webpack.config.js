/*
 * @description: 深入理解 optimization splitChunks
    https://medium.com/dailyjs/webpack-4-splitchunks-plugin-d9fbbe091fd0
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-17 12:11:01
 */
const path = require('path');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';
const isDev = env === 'development';
const analyze = process.env.analyze || false;
const outputPath = 'dist';

const webpackConfig = {
  mode: env || 'none',
  entry: {
    main: path.resolve(__dirname, 'src/App.tsx'),
  },
  output: {
    // 给输出的文件名称加上 hash 值
    filename: isProd ? '[name].bundle.[chunkhash:8].js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name].chunk.[chunkhash:8].js' : '[name].chunk.js',
    path: path.resolve(__dirname, outputPath),
  },
  // webpack4  采用 splitChunks 代替 CommonsChunksPlugin 来做代码分割
  // 详情参考： https://juejin.im/post/5ce53a7f6fb9a07eb67d668c
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'all',
          minChunks: 2,
          name: 'commons',
          maxInitialRequests: 5,
          minSize: 0, // 默认是30kb，minSize设置为0之后
        },
        mobxBase: {
          test: (module) => {
            // 直接使用 test 来做路径匹配，抽离mobx相关代码
            return /node_modules\/mobx|node_modules\/mobx-react/.test(
              module.context
            );
          },
          chunks: 'all',
          name: 'mobx-base',
          priority: 10,
          reuseExistingChunk: true,
        },
        reactBase: {
          test: (module) => {
            // 直接使用 test 来做路径匹配，抽离react相关代码
            return /node_modules\/prop-types|node_modules\/react-dom|node_modules\/react/.test(
              module.context
            );
          },
          chunks: 'all',
          name: 'react-base',
          priority: 10,
          reuseExistingChunk: true,
        },
        verdor: {
          test: /node_modules/, // 其他node_modules下面的模块，统一放到vendor里面
          chunks: 'all',
          name: 'vendor',
          priority: -10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
    minimizer: isProd
      ? [
          new UglifyJsPlugin({
            exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
            cache: true,
            parallel: true, // 开启并行压缩，充分利用cpu
            sourceMap: false,
            extractComments: false, // 移除注释
            uglifyOptions: {
              warnings: false,
              compress: {
                unused: true,
                drop_debugger: true,
              },
              output: {
                comments: false,
              },
            },
          }),
        ]
      : [],
    runtimeChunk: {
      name: 'manifest',
    },
  },
  resolve: {
    // .web.js 为 RN web 平台文件
    extensions: ['.tsx', '.ts', '.js', '.web.js', '.web.ts', '.web.tsx'],
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ['jsnext:main', 'browser', 'main'],
    // 使用 alias 把导入 react 的语句换成直接使用单独完整的 react.min.js 文件，
    // 减少耗时的递归解析操作
    alias: {
      'react-native': 'react-native-web',
      react: path.resolve(
        __dirname,
        `./node_modules/react/umd/${
          isDev ? 'react.development.js' : 'react.production.min.js'
        }`
      ),
      // 'react-dom': path.resolve(
      //   __dirname,
      //   `./node_modules/react-dom/umd/${
      //     isDev ? 'react-dom.development.js' : 'react-dom.production.min.js'
      //   }`
      // ),
      mobx: path.resolve(__dirname, './node_modules/mobx/lib/mobx.umd.min.js'),
      'mobx-react': path.resolve(
        __dirname,
        './node_modules/mobx-react/index.min.js'
      ),
      '@components': path.resolve(__dirname, './src/components'),
      '@I': path.resolve(__dirname, './src/interfaces'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  module: {
    // 对单独完整的未采用模块化的库文件，不需要采用递归去解析，比如react.production.min.js
    noParse: [/react\..+\.js$/, /mobx\..+\.js/],
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
            },
          },
        ],
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.js/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // 缓存加速
              cacheDirectory: true,
              // presets: [
                // "@babel/preset-env",
                // "@babel/preset-react",
              //   'react-native'
              // ],
              // plugins: [
              //   ["module-resolver", {
              //     "alias": {
              //       "^react-native$": "react-native-web"
              //     }
              //   }],
              //   "@babel/plugin-proposal-object-rest-spread"
              // ],
            },
          },
        ],
        include: [
          // 只对使用了ES6语法的RN库使用babel转换
          path.resolve('node_modules/react-native'),
        ],
      },
      {
        test: /\.(png|jpe?g|gif|eot|woff|woff2|ttf)$/,
        use: [`file-loader${isProd ? '?name=[name]_[hash:8].[ext]' : ''}`],
      },
      {
        test: /\.svg$/,
        // 内嵌svg
        use: ['raw-loader'],
      },
    ],
  },
  devtool: isDev ? 'source-map' : '',
  plugins: [
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /node_modules/,
      // add errors to webpack instead of warnings
      failOnError: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: 'index.html',
      pageConfig: JSON.stringify({
        testParam: 'testParam',
      }),
      isProd: isProd,
      minify: {
        //是否去除空格，默认false
        collapseWhitespace: true,
        //是否压缩html里的css（使用clean-css进行的压缩） 默认值false；
        minifyCSS: true,
        //是否压缩html里的js（使用uglify-js进行的压缩）
        minifyJS: true,
      },
      hash: true,
    }),
    // 开启 Scope Hoisting
    new ModuleConcatenationPlugin(),
    new ProgressBarPlugin({
      format:
        '  build [:bar] ' +
        chalk.green.bold(':percent') +
        ' (:elapsed seconds)',
      clear: false,
      width: 60,
    }),
  ]
    .concat(
      analyze
        ? new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 8081,
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: 'stats.json',
            statsOptions: null,
            logLevel: 'info',
          })
        : []
    ),
};

if (isDev) {
  webpackConfig.devServer = {
    host: '0.0.0.0',
    port: 8888,
    inline: false,
    hot: false,
  };
}

module.exports = webpackConfig;
