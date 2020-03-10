/*
 * @description: 全局声明
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-10 14:15:21
 */

/**
 * 扩展 NodeJS.Global 上的属性
 */
declare namespace NodeJS{
  interface Global {
    HermesInternal: null | string
  }
}