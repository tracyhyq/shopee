<!--
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-18 14:42:41
 -->
# shopee

## 介绍
针对 shopee app 部分页面采用 React-Native 代替，本项目可以做到 iOS、Android、H5 三端同构，一套代码，可以编译成不同环境运行的产物，主要技术栈如下：

* typescript 3.x
* react-native 0.61
* react-navigation 4.x
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

## 踩坑记录
1、在RN中要使用 tsconfig.json 中定义的别名，必须要同步在每个相应别名的文件夹下添加一个 package.json 文件，文件中必须要有一个 name 字段，值就是别名的名称。
看官方文档：https://www.npmjs.com/package/react-native-typescript-transformer
  For react-native you need to add one or more package.json files. These only need to contain the "name" field, and should be placed into any folders in the root of your project that you want to reference with an absolute path. The "name" field's value should be the name of the folder. So for me, I just added one file at src/package.json with the contents {"name": "src"}.

2、在使用 react-native-spring-scrollview 组件时，会出现以下错误：
```javascript
Unable to resolve module `react-native/lib/TextInputState` from `node_modules/react-native-spring-scrollview/SpringScrollView.js`
```
原因是 RN 6.0 以上 react-native/lib/TextInputState 这个路径已经变成：react-native/Libraries/Components/TextInput/TextInputState，但是作者还没发布 2.1 版本，所以采用临时方案：
https://github.com/bolan9999/react-native-largelist/issues/369#issuecomment-536437355


