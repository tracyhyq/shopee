/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-25 09:34:45
 */

import { observable, action } from 'mobx';
import { POST } from '@utils/http-util';
import { Auth } from '@I/login';
import { IResponse } from '@I/index';

interface IAuthRes extends IResponse {
  data: Auth;
}

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
    const res = await POST<IAuthRes>('/api/v1/auth/token');
    return res;
  }
}

export default new LoginStore();
