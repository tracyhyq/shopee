/*
 * @description: Home 模块相关声明
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-18 16:52:16
 */

export interface ICity {
  name: string;
  code: string;
}

export interface ICityList {
  sortLetter: string;
  items: ICity[];
}
