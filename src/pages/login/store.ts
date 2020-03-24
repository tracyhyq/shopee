/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-24 17:10:58
 */

import { observable, action } from 'mobx';
import { POST } from '@utils/http-util';
import { AuthRes } from '@I/login';

class LoginStore {
  @observable
  username: string = "";

  @observable
  password: string = "";

  /**
   * 登录
   */
  @action
  async doLogin() {
    const res = await POST<AuthRes>('/api/v1/auth/token');
    return res;
  }
}

export default new LoginStore();
