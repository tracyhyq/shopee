/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-27 20:33:33
 */

import { observable, action } from 'mobx';
import { GET } from '@utils/http-util';
import { IResponse } from '@I/index';
import { IEvent } from '@I/search';
import { UserInfo } from '@I/profile';
import { doLoading } from '@utils/login-auth';
import { NavigationScreenProp } from 'react-navigation';

interface IFilter {
  offset: number;
  limit: number;
  type: string;
}

interface IUserInfoRes extends IResponse {
  data: UserInfo;
}

interface IEventRes extends IResponse {
  data: {
    events: IEvent[],
    hasMore: boolean
  };
}

class ProfileStore {
  /**
   * 筛选条件
   */
  @observable
  filter: IFilter = {
    offset: 0,
    limit: 25,
    type: 'liked'
  };

  /**
   * 用户信息
   */
  @observable
  userInfo: UserInfo | undefined = undefined;

  /**
   * 事件列表
   */
  @observable
  events: IEvent[] = [];

  @observable
  hasMore = false;

  /**
   * 用作无限下拉分页加载
   */
  @observable
  eventsPool: IEvent[] = [];

  /**
   * 获取用户详情
   * @param navi
   */
  @action
  async getUserInfo(navi: NavigationScreenProp<{}>) {
    const res = await doLoading(GET<IUserInfoRes>('/api/v1/user'), {
      needAuth: true,
      navigation: navi
    });

    if (res) {
      this.userInfo = res.data;
    }
  }

  /**
   * 获取用户events
   * @param navi
   */
  @action
  async getUserEvents(navi: NavigationScreenProp<{}>) {
    const res = await doLoading(GET<IEventRes>('/api/v1/user/events', {
      body: this.filter
    }), {
      needAuth: true,
      navigation: navi
    });

    if (res) {
      this.events = res.data.events;
      this.hasMore = res.data.hasMore;
    }
  }
}

export default new ProfileStore();
