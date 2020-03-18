/*
 * @description: ToastManager Component
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-18 10:47:08
 */

import { IToastConfig, Toast } from './Toast';
import * as React from 'react';
import { Overlay, OverlayView } from '../Overlay';

interface IElements {
  destroy(): void;
}

export class ToastManager {
  currentToast: IToastConfig | null = null;
  stack: IToastConfig[] = [];
  elements: IElements[] = [];

  next() {
    this.currentToast = null;
    requestAnimationFrame(() => {
      const next = this.stack.shift();
      const previousToast = this.elements.shift();
      if (previousToast) {
        previousToast.destroy();
      }

      if (!next) {
        return;
      }
      this.currentToast = next;
      this.showNext();
    });
  }

  push(config: IToastConfig) {
    if (this.currentToast) {
      this.stack.push(config);
      return;
    }

    this.currentToast = config;

    this.showNext();
  }

  showNext() {
    const config = this.currentToast;
    const toastLayKey = Overlay.show(
      <OverlayView
        animated
        overlayPointerEvents="none"
        maskPointerEvents="none"
        overlayOpacity={0}
        overlayClosable
      >
        <Toast {...config || { content: '' }} />
      </OverlayView>
    );
    this.elements.push({
      destroy: () => {
        Overlay.hide(toastLayKey);
      },
    });
  }
}

export const toastManager = new ToastManager();
