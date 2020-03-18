/*
 * @description: Toast Component
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-18 10:46:50
 */

import * as React from 'react';
import { Component } from 'react';
import { Animated, Dimensions, LayoutChangeEvent, View } from 'react-native';
import { globalStyle } from '../style';
import { toastManager } from './ToastManager';
import { Txt } from '../Txt';

export interface IToastConfig {
  content: React.ReactNode;
  duration?: number;
}

export interface IToastProps extends IToastConfig {}

export interface IToastState {
  top: number;
  left: number;
  inited: boolean;
  fadeAnim: Animated.Value;
}

const animationTime = 100;

export class Toast extends Component<IToastProps, IToastState> {
  view: View | null = null;
  startAnimation = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: animationTime,
    }).start();
  };
  endAnimation = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: animationTime,
    }).start(() => {
      toastManager.next();
    });
  };
  onLayout = (e: LayoutChangeEvent) => {
    if (this.state.inited) {
      return;
    }

    const { height, width } = Dimensions.get('window');
    const { layout } = e.nativeEvent;
    this.setState({
      top: (height - layout.height) / 2,
      left: (width - layout.width) / 2,
      inited: true,
    });

    const duration = this.props.duration || 2000;

    this.startAnimation();
    setTimeout(this.endAnimation, duration);
  };
  renderChild = (
    child:
      | React.ReactChild
      | {}
      | React.ReactPortal
      | string
      | number
      | boolean
      | null
      | undefined
  ) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return (
        <Txt
          style={{
            color: 'white',
          }}
        >
          {child}
        </Txt>
      );
    }

    return child;
  };

  constructor(props: IToastProps) {
    super(props);
    this.state = {
      top: 0,
      left: 0,
      inited: false,
      fadeAnim: new Animated.Value(0),
    };
  }

  renderChildren() {
    const { content } = this.props;
    if (Array.isArray(content)) {
      return content.map(this.renderChild);
    }

    return this.renderChild(content);
  }

  render() {
    const { top, left, inited, fadeAnim } = this.state;
    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            zIndex: 1000,
            padding: globalStyle.gap.n,
            backgroundColor: 'black',
            borderRadius: 2,
            maxWidth: 240,
          },
          {
            top,
            left,
            opacity: inited ? fadeAnim : 0,
          },
        ]}
        onLayout={this.onLayout}
      >
        {this.renderChildren()}
      </Animated.View>
    );
  }
}
