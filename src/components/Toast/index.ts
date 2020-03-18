/*
 * @description: Toast Component
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-18 10:46:37
 */

import { IToastConfig } from './Toast';
import { toastManager } from './ToastManager';

export function toast(config: IToastConfig | string) {
  if (typeof config === 'string') {
    toastManager.push({ content: config });
  } else {
    toastManager.push(config);
  }
}
