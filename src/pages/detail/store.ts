/*
 * @description: detail store
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-27 16:44:10
 */

import { observable, action } from 'mobx';
import { GET, POST, DELETE } from '@utils/http-util';
import { IResponse } from '@I/index';
import { IEvent } from '@I/search';
import { User } from '@I/login';
import { CommentRes, Comment, Likes } from '@I/detail';
import { doLoading } from '@utils/login-auth';
import { NavigationScreenProp } from 'react-navigation';

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

interface IAddComment extends IResponse {
  data: Comment;
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
    const res = await doLoading(GET<IEventRes>(`/api/v1/events/${id}`));
    if (res) {
      this.evt = res.data;
    }
  }

  @action
  async getLikes(id: number) {
    const res = await doLoading(GET<ILikesRes>(`/api/v1/events/${id}/likes`));
    if (res) {
      this.likes = res.data.users;
    }
  }

  @action
  async getParticipants(id: number) {
    const res = await doLoading(GET<IParticipantsRes>(`/api/v1/events/${id}/participants`));
    if (res) {
      this.participants = res.data;
    }
  }

  @action
  async getComments(id: number) {
    const res = await doLoading(GET<ICommentsRes>(`/api/v1/events/${id}/comments`));
    if (res) {
      this.comments = res.data.comments;
      this.commentsMore = res.data.hasMore;
    }
  }

  @action
  async addComment(c: string, id: number, navi: NavigationScreenProp<{}>) {
    const res = await doLoading(POST<IAddComment>(`/api/v1/events/${id}/comments`, {
      body: {
        comment: c
      }
    }), {
      needAuth: true,
      navigation: navi
    });
    return res;
  }

  @action
  async addGoing(id: number, navi: NavigationScreenProp<{}>) {
    const res = await doLoading(POST<IResponse>(`/api/v1/events/${id}/participants`), {
      needAuth: true,
      navigation: navi
    });
    return res;
  }

  @action
  async cancelGoing(id: number, navi: NavigationScreenProp<{}>) {
    const res = await doLoading(DELETE<IResponse>(`/api/v1/events/${id}/participants`), {
      needAuth: true,
      navigation: navi
    });
    return res;
  }

  @action
  async addLike(id: number, navi: NavigationScreenProp<{}>) {
    const res = await doLoading(POST<IResponse>(`/api/v1/events/${id}/likes`), {
      needAuth: true,
      navigation: navi
    });
    return res;
  }

  @action
  async cancelLike(id: number, navi: NavigationScreenProp<{}>) {
    const res = await doLoading(DELETE<IResponse>(`/api/v1/events/${id}/likes`), {
      needAuth: true,
      navigation: navi
    });
    return res;
  }
}

export default new SearchStore();
