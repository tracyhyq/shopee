/*
 * @description: OverlayPullView
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-18 10:54:14
 */
import * as React from 'react';
import { Animated, LayoutChangeEvent, LayoutRectangle } from 'react-native';
import {
  IOverlayViewProps,
  IOverlayViewState,
  OverlayView,
} from './OverlayView';

export interface IOverlayPullViewProps extends IOverlayViewProps {}

export interface IOverlayPullViewState extends IOverlayViewState {
  showed: boolean;
  translateValue: Animated.Value;
}

export class OverlayPullView extends OverlayView<
  IOverlayPullViewProps,
  IOverlayPullViewState
> {
  viewLayout: LayoutRectangle = { x: 0, y: 0, width: 0, height: 0 };
  state: IOverlayPullViewState = {
    showed: false,
    translateValue: new Animated.Value(0),
    overlayOpacity: new Animated.Value(0),
  };
  onLayout = (e: LayoutChangeEvent) => {
    this.viewLayout = e.nativeEvent.layout;
    if (!this.state.showed) {
      this.setState(Object.assign({ showed: true }));
      this.appear();
    }
  };

  constructor(props: IOverlayPullViewProps) {
    super(props);
    Object.assign(this.state, {
      showed: false,
      translateValue: new Animated.Value(0),
    });
  }

  get translateValue() {
    return this.viewLayout.height;
  }

  appear(animated = this.props.animated) {
    if (animated) {
      this.state.translateValue.setValue(this.translateValue);
    }
    const duration = this.props.duration;
    const animates = [
      Animated.timing(this.state.translateValue, {
        toValue: 0,
        duration,
      }),
    ];
    super.appear(animated, animates);
  }

  disappear(animated = this.props.animated) {
    if (animated) {
      this.state.translateValue.setValue(0);
    }
    const duration = this.props.duration;
    const animates = [
      Animated.timing(this.state.translateValue, {
        toValue: this.translateValue,
        duration,
      }),
    ];
    super.disappear(animated, animates);
  }

  buildProps() {
    super.buildProps();
  }

  renderContent() {
    return (
      <Animated.View
        style={{
          transform: [
            {
              translateY: this.state.translateValue,
            },
          ],
          opacity: this.state.showed ? 1 : 0,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
        onLayout={this.onLayout}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
