/*
 * @description: common interface
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-27 09:56:49
 */

// tslint:disable:no-any
export interface IResponse {
  code: number;
  msg: string;
  data?: any;
}
