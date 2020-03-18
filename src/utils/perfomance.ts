/*
 * @description: 防抖、截流等共工具函数
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-18 16:56:59
 */

// tslint:disable:no-any
/**
 * 防抖函数, 回调函数只执行一次，但期间若有事件触发，则重新计时
 * @param fn 最终执行的fn
 * @param delay 延迟时间，单位ms
 */
export function debounce<T extends Function>(fn: T, delay: number = 300): T {
  let timer: any;

  return function() {
    const args = arguments;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  } as any;
}

/**
 * 节流函数，一定时间内回调函数只执行一次。
 * @param fn 最终执行的fn
 * @param during 执行间隔时间，单位ms
 */
export function throttle<T extends Function>(fn: T, during: number = 200): T {
  let start: number;
  let timer: any;

  return function() {
    const context = this;
    const args = arguments;

    const now = +new Date();
    if (now - start < during) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        start = now;
        fn.apply(context, args);
      }, during);
    } else {
      start = now;
      fn.apply(context, args);
    }
  } as any;
}
