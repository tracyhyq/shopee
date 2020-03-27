/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-27 20:33:10
 */

export interface UserInfo {
  id: number;
  username: string;
  avatar: string;
  email?: string;
  likes_count: number;
  past_count: number;
  goings_count: number;
}
