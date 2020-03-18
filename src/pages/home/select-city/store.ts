/*
 * @description: select-city store
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-18 16:55:12
 */

import { observable, action } from 'mobx';
import { ICity, ICityList } from '@I/home';
import { IResponse } from '@I/index';
import { GET } from '@utils/http-util';

interface ICityRes extends IResponse {
  data: ICityList[];
}

class SelectCityStore {
  /**
   * 带索引的 city 数据列表
   */
  @observable
  cityList: ICityList[] = [];

  /**
   * 热门城市列表
   */
  @observable
  hotCities: ICity[] = [];

  /**
   * 访问过的城市列表
   */
  @observable
  visitedCities: ICity[] = [];

  @observable
  currentCity: ICity = {
    name: 'Jakarta',
    code: '002929'
  };

  /**
   * 获取城市列表数据
   */
  @action
  async getCities() {
    const res = await GET<ICityRes>('/api/common/getArea');
    if (res) {
      this.cityList = res.data;
    }
  }

  /**
   * 获取热门城市
   */
  @action
  async getHotCities() {
    const defaultHotCityArray = [
      {code: "310000", name: "Jakarta"},
      {code: "440300", name: "Bandung"},
      {code: "110000", name: "Surabaya"},
      {code: "440100", name: "Madan"},
      {code: "540300", name: "Semarang"},
      {code: "210000", name: "Yogyakarta"},
      {code: "540100", name: "Makassar"},
      {code: "540110", name: "Palembang"},
    ];

    this.hotCities = defaultHotCityArray;
  }

  /**
   * 获取访问过的城市
   */
  @action
  async getVistedCities() {
    const defaultVisitedCityArray = [
      {code: "310000", name: "Jakarta"},
      {code: "440300", name: "Bandung"},
      {code: "110000", name: "Surabaya"},
      {code: "440100", name: "Madan"},
    ];

    this.visitedCities = defaultVisitedCityArray;
  }
}

export default new SelectCityStore();
