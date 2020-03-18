/*
 * @description: Overlay Component
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-18 10:50:25
 */
import * as React from 'react';
import { ReactElement } from 'react';
import { Keyboard } from 'react-native';
import { keyValue, RootView } from './RootView';
import { OverlayView, IOverlayViewProps } from './OverlayView';
import { OverlayPullView } from './OverlayPullView';
import { EventCenter, EventNameMap } from './EventCenter';

export { OverlayView } from './OverlayView';
export { OverlayPullView } from './OverlayPullView';

export { RootView } from './RootView';

export class Overlay {
  static View = OverlayView;
  static PullView = OverlayPullView;

  static show(overlayView: ReactElement<OverlayView>) {
    let key: number;
    const onDisappearCompletedSave = (overlayView.props as IOverlayViewProps)
      .onDisappearCompleted;
    // tslint:disable-next-line:no-any
    const element = React.cloneElement(overlayView as any, {
      onDisappearCompleted: () => {
        RootView.remove(key);
        if (onDisappearCompletedSave) {
          onDisappearCompletedSave();
        }
      },
      currentKeyValueForEvent: keyValue + 1,
    });
    key = RootView.add(element);
    // 关闭键盘
    Keyboard.dismiss();
    return key;
  }

  static hide(key: number | null) {
    EventCenter.emit(EventNameMap.CLOSE_CURRENT_OVERLAY, key);
  }

  static hideAll() {
    RootView.removeAll();
  }
}
