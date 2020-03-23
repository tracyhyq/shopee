/*
 * @description: 全局声明
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-23 18:43:19
 */

/**
 * 扩展 NodeJS.Global 上的属性
 */

declare namespace NodeJS{
  interface Global {
    HermesInternal: null | string
  }
}

declare module "*.svg" {
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
