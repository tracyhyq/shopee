/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-24 17:29:49
 */

export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
}

export interface AuthRes {
  token: string;
  user: User;
}
