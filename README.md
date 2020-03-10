# shopee

## 介绍
针对 shopee app 部分页面采用 React-Native 代替，本项目可以做到 iOS、Android、H5 三端同构，一套代码，可以编译成不同环境运行的产物，主要技术栈如下：

* typescript 3.x
* react-native 0.61
* webpack4.x
* react16.9
* mobx5.x

支持的版本：
Android 4.1 以上
iOS 7.0以上

## 开发环境启动项目
运行本项目的前提是 RN 的运行环境已经安装完毕

```bash
$ npm i --verbose
$ react-native run-ios      // 首次运行，需要编译安装app到虚拟机，安装到iOS
$ react-native run-android  // 首次运行，需要编译安装app到虚拟机，安装到Android
$ npm start
```

## 打包

```bash
$ npm run build
```

打包指定平台

```bash
$ npm run build:android
$ npm run build:iOS
```

android 的 bundle 输出地址：android/app/src/main/assets/
iOS 的 bundle 输出地址：ios/bundle/

## 在 Web 平台运行

通过

```bash
$ npm run web
```

启动 Webpack 后访问
`http://localhost:8888`
通过最后的 hash 值切换页面
