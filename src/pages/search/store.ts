/*
 * @description: search store
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-25 14:18:52
 */

import { observable, action, computed } from 'mobx';
import { GET } from '@utils/http-util';
import { Channel, IFilter, IEvent, SearchResult } from '@I/search';
import { IResponse } from '@I/index';

interface IChannelRes extends IResponse {
  data: {
    channels: Channel[]
  };
}

interface ISearchRes extends IResponse {
  data: SearchResult;
}

class LoginStore {
  /**
   * 筛选条件
   */
  @observable
  filter: IFilter = {
    after: "",
    before: "",
    afterText: "",
    beforeText: "",
    channels: [],
    offset: 0,
    limit: 25,
  };

  /**
   * 时间筛选条件
   */
  @observable
  dateSelect = "";

  @observable
  channels: Channel[] = [];

  @observable
  events: IEvent[] = [];

  @observable
  hasMore = true;

  /**
   * 筛选结果条数
   */
  @observable
  results: number = 0;

  /**
   * 是否展示列表也筛选条件状态栏
   */
  @observable
  resultSearchBar: boolean = false;

  /**
   * 查询按钮是否能用
   * 只需要判断是否选了时间
   */
  @computed
  get canSearch() {
    // 选择的是时间段，需要判断是否已经初始化before和after
    if (this.dateSelect === 'later') {
      return this.filter.after !== '' && this.filter.before !== '';
    }
    return this.dateSelect !== '';
  }

  /**
   * 根据筛选条件选择计算text
   */
  @computed
  get searchString() {
    const selectChannelNames: string[] = [];
    // 没有选择时间为空
    if (!this.dateSelect) {
      return '';
    }
    // 选择的是时间段，但是时间还没有选中完为空
    if (this.dateSelect === 'later'
      && (this.filter.after === ''
      || this.filter.before === '')) {
      return '';
    }

    if (this.dateSelect === 'anytime'
      && this.filter.channels.length === 0) {
      return 'All activities';
    }

    if (this.filter.channels.length === 0) {
      return `All activities from ${this.filter.afterText} to ${this.filter.beforeText}`;
    }

    this.filter.channels.map((channelId) => {
      const tempChannels = this.findChannelById(channelId);
      if (tempChannels.length) {
        selectChannelNames.push(tempChannels[0].name);
      }
    });
    
    return `${selectChannelNames.join('、')} activities from ${this.filter.afterText} to ${this.filter.beforeText}`;
  }

  findChannelById(id: number) {
    return this.channels.filter((item) => item.id === id);
  }

  /**
   * 获取Channels
   */
  @action
  async getChannels() {
    const res = await GET<IChannelRes>('/api/v1/channels');

    if (res && res.data) {
      this.channels = res.data.channels;
    }
  }

  @action
  async getEvents() {
    const res = await GET<ISearchRes>('/api/v1/events');

    if (res && res.data) {
      this.events = res.data.events;
      this.hasMore = res.data.hasMore;
    }
  }
}

export default new LoginStore();
