/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-26 17:30:10
 */

import { User } from '../login';

export interface Comment {
  id: number;
  create_time: string;
  comment: string;
  author: User;
}

export interface Likes {
  users: User[];
  hasMore: boolean;
}

export interface CommentRes {
  comments: Comment[];
  hasMore: boolean;
}
