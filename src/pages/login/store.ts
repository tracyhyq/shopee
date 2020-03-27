/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-27 14:39:39
 */

import { observable, action } from 'mobx';
import { POST } from '@utils/http-util';
import { Auth } from '@I/login';
import { IResponse } from '@I/index';
import { doLoading } from '@utils/login-auth';

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
    const res = await doLoading(POST<IAuthRes>('/api/v1/auth/token'));
    return res;
  }
}

export default new LoginStore();
