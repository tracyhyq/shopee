/*
 * @description: RootView
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-27 11:36:47
 */
import * as React from 'react';
import { Component, ReactNode } from 'react';
import {
  Animated,
  AppRegistry,
  StyleSheet,
  View,
  GestureResponderEvent,
  Platform,
} from 'react-native';

import { EventCenter, EventNameMap, UIEventNameMap } from './EventCenter';

export type UIEventName = keyof typeof UIEventNameMap;

export interface IProps {}

export interface IElementShape {
  key?: number;
  element?: ReactNode;
}

export interface IState {
  elements: IElementShape[];
}

export let keyValue: number = 0;

export class RootView extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.bindEvent();
    this.state = {
      elements: [],
    };
  }

  static add(element: ReactNode) {
    const key = ++keyValue;
    EventCenter.emit(EventNameMap.ADD_OVERLAY, { key, element });
    return key;
  }

  static remove(key: number) {
    EventCenter.emit(EventNameMap.REMOVE_OVERLAY, { key });
  }

  static removeAll() {
    EventCenter.emit(EventNameMap.REMOVE_ALL_OVERLAY, {});
  }

  /**
   * 绑定事件
   */
  public static addListener(
    eventName: UIEventName,
    listener: (e: GestureResponderEvent) => void
  ): typeof EventCenter {
    return EventCenter.addListener(eventName, listener);
  }

  bindEvent = () => {
    EventCenter.addListener(EventNameMap.ADD_OVERLAY, (e: IElementShape) =>
      this.add(e)
    );
    EventCenter.addListener(EventNameMap.REMOVE_OVERLAY, (e: IElementShape) =>
      this.remove(e)
    );
    EventCenter.addListener(EventNameMap.REMOVE_ALL_OVERLAY, () =>
      this.removeAll()
    );
  };

  UNSAFE_componentWillUnmount() {
    if (Platform.OS === 'android') {
      // android ，多个页面入口使用了同一个引擎，这里不能移除监听。不然弹窗弹不出来。
    } else {
      EventCenter.removeAllListeners(EventNameMap.ADD_OVERLAY);
      EventCenter.removeAllListeners(EventNameMap.REMOVE_OVERLAY);
      EventCenter.removeAllListeners(EventNameMap.REMOVE_ALL_OVERLAY);
    }
  }

  add(e: IElementShape) {
    const { elements } = this.state;
    elements.push(e);
    this.setState({ elements });
  }

  remove(e: IElementShape) {
    const { elements } = this.state;
    for (let i = elements.length - 1; i >= 0; --i) {
      if (elements[i].key === e.key) {
        elements.splice(i, 1);
        break;
      }
    }
    this.setState({ elements });
  }

  removeAll() {
    this.setState({ elements: [] });
  }

  rootViewTouchStart(e: GestureResponderEvent) {
    EventCenter.emit(UIEventNameMap.rootViewTouchStart, e);
  }

  rootViewTouchMove(e: GestureResponderEvent) {
    EventCenter.emit(UIEventNameMap.rootViewTouchMove, e);
  }

  rootViewTouchEnd(e: GestureResponderEvent) {
    EventCenter.emit(UIEventNameMap.rootViewTouchEnd, e);
  }

  rootViewTouchCancel(e: GestureResponderEvent) {
    EventCenter.emit(UIEventNameMap.rootViewTouchCancel, e);
  }

  render() {
    const { elements } = this.state;
    return (
      <View
        style={{ flex: 1 }}
        onTouchStart={this.rootViewTouchStart}
        onTouchMove={this.rootViewTouchMove}
        onTouchEnd={this.rootViewTouchEnd}
        onTouchCancel={this.rootViewTouchCancel}
      >
        <Animated.View style={{ flex: 1 }}>{this.props.children}</Animated.View>
        {elements.map((item) => {
          return (
            <View
              key={'rootView' + item.key}
              style={styles.overlay}
              pointerEvents="box-none"
            >
              {item.element}
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const originRegisterComponentOld = AppRegistry.registerComponent;

export const registerComponent = (AppRegistry.registerComponent = (
  appKey,
  componentProvider
) => {
  class RootElement extends Component {
    render() {
      const Comp = componentProvider();
      return (
        <RootView>
          <Comp {...this.props} />
        </RootView>
      );
    }
  }

  return originRegisterComponentOld.apply(AppRegistry, [
    appKey,
    () => RootElement,
  ]);
});
