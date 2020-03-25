/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-25 09:33:41
 */

export interface User {
  id: number;
  username: string;
  email?: string;
  avatar: string;
}

export interface Auth {
  token: string;
  user: User;
}
