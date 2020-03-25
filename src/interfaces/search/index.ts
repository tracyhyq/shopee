/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-25 13:22:04
 */

import { User } from '../login';

export interface Channel {
  id: number;
  name: string;
}

export interface IFilter {
  after: string;
  before: string;
  afterText: string;
  beforeText: string;
  channels: number[];
  offset: number;
  limit: number;
}

export interface IEvent {
  id: number;
  name: string;
  begin_time: string;
  end_time: string;
  description: string;
  creator: User;
  create_time: string;
  update_time: string;
  channel: Channel;
  images: string[];
  location: string;
  goings_count: number;
  likes_count: number;
}

export interface SearchResult {
  events: IEvent[];
  hasMore: boolean;
}
