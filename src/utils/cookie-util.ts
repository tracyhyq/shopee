/*
 * @description: 模拟 cookie 保存, 时间原因，暂时不考虑跨域问题
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-24 20:05:02
 */

import AsyncStorage from '@react-native-community/async-storage';

class Cookies {

  /**
   * 添加cookie
   * @param key key
   * @param items value
   * @param expire 过期时长，单位 ms，默认1天
   * @param callback  回调函数
   */
  setCookie(
    key: string,
    value: string,
    expire: number = 24 * 60 * 60 * 1000,
    callback?: (error?: Error | undefined) => void | undefined
  ) {
    if (!value || !key)return;

    // 增加时长和存入时间
    const newCookie = {
      key: value,
      __saveTime: new Date().getTime(),
      __expire: expire
    };

    AsyncStorage.setItem(key, JSON.stringify(newCookie), callback);
  }

  /**
   * 获取cookie
   * @param key
   * @returns {Promise}
   */
   getCookie<T>(key: string): Promise<T | undefined> {
    return new Promise<T | undefined>((resolve, reject)=> {
      AsyncStorage.getItem(key, (error, result)=> {
        if (!error) {
          if (result) {
            const cookie = JSON.parse(result);
            const now = new Date().getTime();

            // cookie 已过期
            if (now - cookie.__saveTime > cookie.__expire) {
              resolve(undefined);
            } else {
              resolve(cookie[key] as T);
            }
          } else {
            resolve(undefined);
          }
        } else {
          reject(error);
          console.error(error);
        }
      });
    });
  }

  /**
   * 删除cookie
   * @param key
   * @returns {*}
   */
  removeCookie(
    key: string,
    callback: (error?: Error | undefined) => void | undefined
  ) {
    if (!key)return;
    AsyncStorage.removeItem(key, callback);
  }

  /**
   * 删除多个cookie
   * @param keys
   * @returns {*}
   */
  removeCookies(
    keys: string[],
    callback: (error?: Error[] | undefined) => void | undefined
  ) {
    if (!keys)return;
    AsyncStorage.multiRemove(keys, callback);
  }
}

export default new Cookies();
