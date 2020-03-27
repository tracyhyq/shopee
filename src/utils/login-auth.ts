/*
 * @description: 对某些方法做统一登录鉴权，并且加上 loading 状态
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-27 14:30:54
 */

import { NavigationScreenProp } from 'react-navigation';
import Cookies from '@utils/cookie-util';
import { toast } from '@components/Toast';
import { alert } from '@components/Alert';
import { Loading } from '@components/Loading';
import { IResponse } from '@I/index';

enum HTTPStatus {
  Unauthorized = 400,
  Forbidden = 403,
  Success = 200,
}

export interface IDoActionOptions {
  actionName?: string; // 本次操作的名称，用于提示用户
  // tslint:disable-next-line:no-any
  onError?: (err: any) => void | boolean; // 在发生错误时回调，返回true则不做错误反馈
  // 是否显示操作成功
  toastSuccess?: boolean;
  pendingText?: string;
  successText?: string;
  failedText?: string;
  // 登录鉴权失败，直接跳转到登录页
  navigation?: NavigationScreenProp<{}>;
  // 不是所有接口都需要登录鉴权的
  needAuth?: boolean;
}

// 执行耗时长的异步任务
// doAction 不会抛出异常
// 网络请求异常时（code非0，超时）会触发onError回调，同时会返回undefined
export async function doAction<R extends IResponse>(
  // 执行action的函数
  promise: Promise<R>,
  options?: IDoActionOptions
): Promise<R | void> {
  const u = await Cookies.getCookie('user');
  const {
    onError = () => {},
    toastSuccess = true,
    pendingText = `Loading...`,
    successText = `Success~`,
    failedText = `Failed!`,
  } = options || {};
  const closeLoading = Loading.loading(pendingText);

  // 验证本地 cookie 是否过期
  if (options && options.needAuth && options.navigation) {
    if (!u) {
      closeLoading();
      options.navigation.navigate('Login');
      return;
    }
  }

  try {
    const result = await promise;

    if (toastSuccess && successText) {
      setTimeout(() => {
        toast(successText);
      });
    }

    switch (result.code) {
      case HTTPStatus.Forbidden:
      case HTTPStatus.Unauthorized:
        // 鉴权失败去登入
        options && options.navigation && options.navigation.navigate('Login');
        return;
      case HTTPStatus.Success:
        return result as R;
      default:
        alert({
          title: failedText,
          content: `错误码：【${result.code}】, ${result.msg}`
        });
    }
  } catch (e) {
    // 返回true则不做错误反馈
    if (onError(e) || !e) {
      return;
    }
  } finally {
    closeLoading();
  }
}

export async function doLoading<R extends IResponse>(
  // 执行action的函数
  promise: Promise<R>,
  options?: IDoActionOptions
): Promise<R | void> {
  return doAction(
    promise,
    Object.assign({ actionName: '加载', toastSuccess: false }, options)
  );
}

