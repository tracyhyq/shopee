/*
 * @description: http request util
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-18 16:55:53
 */

import config from '@config/index';

// tslint:disable:no-any
const _timeout = 30 * 1000; // 默认网络超时 30 秒
const prefix = config.server;

interface OP {
  [key: string]: any;
}

function createTimeout(ti: number): Promise<undefined> {
  let dispatchTimeout = () => {};
  const timeout = ti || _timeout;

  const timeoutPromise = new Promise<undefined>((resolve, reject) => {
    dispatchTimeout = () => {
      reject('request timeout');
    };
  });

  setTimeout(() => {
    dispatchTimeout();
  }, timeout);

  return timeoutPromise;
}

function createFetchPromise<R>(url: string, m: string, ...opts: any): Promise<R> {
  const options: OP = {
    method: m,
    headers: opts.headers || {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  if (m.toLocaleUpperCase() === 'POST') {
    options.body = JSON.stringify(opts.body || {});
  }

  const fetchPromise = new Promise<R>((reslove, reject) => {
    fetch(prefix + url, options)
    .then((res) => res.json())
    .then((data) => {
      reslove(data as R);
    }).catch((err) => {
      reject(err);
    });
  });

  return fetchPromise;
}

/**
 * get request
 * @param url 地址
 * @param opts 包含 headers、timeout 等等
 */
export function GET<T>(url: string, ...opts: any): Promise<T | undefined> {
  const timeoutPromise = createTimeout(opts.timeout);
  const getPromise = createFetchPromise<T>(url, 'GET', ...opts);

  return Promise.race([getPromise, timeoutPromise]);
}


/**
 * post request
 * @param url 地址
 * @param opts headers、body、timeout 等等
 */
export function POST<T>(url: string, ...opts: any): Promise<T | undefined> {
  const timeoutPromise = createTimeout(opts.timeout);
  const postPromise = createFetchPromise<T>(url, 'POST', ...opts);

  return Promise.race([postPromise, timeoutPromise]);
}
