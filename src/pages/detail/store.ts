/*
 * @description: detail store
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-26 21:28:29
 */

import { observable, action } from 'mobx';
import { GET } from '@utils/http-util';
import { IResponse } from '@I/index';
import { IEvent } from '@I/search';
import { User } from '@I/login';
import { CommentRes, Comment, Likes } from '@I/detail';

interface IEventRes extends IResponse {
  data: IEvent;
}

interface IParticipantsRes extends IResponse {
  data: User[];
}

interface ILikesRes extends IResponse {
  data: Likes;
}

interface ICommentsRes extends IResponse {
  data: CommentRes;
}

class SearchStore {

  /**
   * 事件详情
   */
  @observable
  evt: IEvent | null = null;

  /**
   * 点赞人数
   */
  @observable
  likes: User[] = [];

  /**
   * 参加人数
   */
  @observable
  participants: User[] = [];

  /**
   * 评论
   */
  @observable
  comments: Comment[] = [];

  @observable
  commentsMore: boolean = false;

  @action
  async getEvent(id: number) {
    const res = await GET<IEventRes>(`/api/v1/events/${id}`);
    if (res) {
      this.evt = res.data;
    }
  }

  @action
  async getLikes(id: number) {
    const res = await GET<ILikesRes>(`/api/v1/events/${id}/likes`);
    if (res) {
      this.likes = res.data.users;
    }
  }

  @action
  async getParticipants(id: number) {
    const res = await GET<IParticipantsRes>(`/api/v1/events/${id}/participants`);
    if (res) {
      this.participants = res.data;
    }
  }

  @action
  async getComments(id: number) {
    const res = await GET<ICommentsRes>(`/api/v1/events/${id}/comments`);
    if (res) {
      this.comments = res.data.comments;
      this.commentsMore = res.data.hasMore;
    }
  }
}

export default new SearchStore();
