/*
 * @description: common interface
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-18 16:53:02
 */

// tslint:disable:no-any
export interface IResponse {
  code: number;
  msg: string;
  data: any;
}
