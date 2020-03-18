/*
 * @description: OverlayView
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-18 10:54:14
 */
import * as React from 'react';
import { Component } from 'react';
import {
  Animated,
  BackHandler,
  PanResponder,
  PanResponderInstance,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ViewStyle,
} from 'react-native';
import { EventCenter, EventNameMap } from './EventCenter';

const CLOSE_EVENT_NAME = EventNameMap.CLOSE_CURRENT_OVERLAY;

export interface IOverlayViewProps {
  /**
   * 样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * 蒙层透明度
   */
  overlayOpacity?: number;
  /**
   * 动画延迟
   */
  duration?: number;
  /**
   * 点击是否可关闭
   */
  overlayClosable?: boolean;
  /**
   * 是否可动画
   */
  animated?: boolean;
  /**
   * 用于控制当前视图是否可以作为触控事件的目标
   * 想见 https://reactnative.cn/docs/0.48/view.html
   */
  overlayPointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
  maskPointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';

  /**
   * 弹层出现过后的回调
   */
  onAppearCompleted?: () => void;
  /**
   * 消失
   */
  onDisappearCompleted?: () => void;
  /**
   * 拦截关闭事件
   */
  // tslint:disable-next-line:no-any
  onCloseRequest?: (a: any) => void;

  /**
   * 关闭的回调
   */
  onClose?: () => void;

  // 不要使用这个
  currentKeyValueForEvent?: number;
}

export interface IOverlayViewState {
  overlayOpacity: Animated.Value;
}

export class OverlayView<
  IProps extends IOverlayViewProps = IOverlayViewProps,
  IState extends IOverlayViewState = {
    overlayOpacity: Animated.Value;
  }
> extends Component<IProps | IOverlayViewProps, IState | IOverlayViewState> {
  static defaultProps = {
    overlayClosable: true,
    animated: false,
    overlayPointerEvents: 'auto',
    duration: 200,
    maskPointerEvents: 'auto',
  };

  touchStateID: number = 0;

  panResponder: PanResponderInstance;

  // tslint:disable-next-line:no-any
  backListener: any;

  closed: boolean = false;

  // tslint:disable-next-line:no-any
  closeEventHandler: any | null = null;

  constructor(props: IProps) {
    super(props);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) =>
        (this.touchStateID = gestureState.stateID),
      onPanResponderRelease: (_, gestureState) => {
        return this.touchStateID === gestureState.stateID
          ? this.closeRequest()
          : null;
      },
    });
    this.state = {
      overlayOpacity: new Animated.Value(0),
    };

    if (!this.closeEventHandler) {
      this.closeEventHandler = EventCenter.addListener(
        CLOSE_EVENT_NAME,
        (k: number) => {
          if (k === this.props.currentKeyValueForEvent) {
            this.close();
          }
        }
      );
    }
  }

  get overlayOpacity() {
    const { overlayOpacity } = this.props;
    return overlayOpacity || overlayOpacity === 0 ? overlayOpacity : 0.5;
  }

  get appearAnimates() {
    const duration = this.props.duration;
    return [
      Animated.timing(this.state.overlayOpacity, {
        toValue: Number(this.overlayOpacity),
        duration,
      }),
    ];
  }

  get disappearAnimates() {
    const duration = this.props.duration;
    return [
      Animated.timing(this.state.overlayOpacity, {
        toValue: 0,
        duration,
      }),
    ];
  }

  get appearAfterMount() {
    return true;
  }

  public getInstance() {
    return this;
  }

  componentDidMount() {
    this.bindBackAndroidEvent();
    // tslint:disable-next-line:no-unused-expression
    this.appearAfterMount && this.appear();
  }

  componentWillUnmount() {
    this.removeBackListener();
    if (this.closeEventHandler) {
      this.closeEventHandler.removeListener();
      this.closeEventHandler = null;
    }
  }

  public close(animated = this.props.animated) {
    // tslint:disable-next-line:curly
    if (this.closed) return true;
    this.closed = true;
    this.removeBackListener();
    this.disappear(animated);
    return true;
  }

  closeRequest() {
    const { overlayClosable, onCloseRequest } = this.props;
    if (onCloseRequest) {
      onCloseRequest(this);
    } else if (overlayClosable) {
      this.close();
    }
  }

  render() {
    this.buildProps();

    const { style, overlayPointerEvents, maskPointerEvents } = this.props;
    return (
      <View style={styles.screen} pointerEvents={overlayPointerEvents}>
        <Animated.View
          pointerEvents={maskPointerEvents}
          style={[
            styles.screen,
            { backgroundColor: '#000', opacity: this.state.overlayOpacity },
          ]}
          {...this.panResponder.panHandlers}
        />
        <KeyboardAvoidingView
          style={style}
          behavior="padding"
          pointerEvents="box-none"
        >
          {this.renderContent()}
        </KeyboardAvoidingView>
      </View>
    );
  }

  protected appear(
    animated = this.props.animated,
    // tslint:disable-next-line:no-any
    additionAnimates: any[] | null = null
  ) {
    if (animated) {
      this.state.overlayOpacity.setValue(0);
      Animated.parallel(
        this.appearAnimates.concat(additionAnimates || [])
      ).start(() => this.appearCompleted());
    } else {
      this.state.overlayOpacity.setValue(Number(this.overlayOpacity));
      this.appearCompleted();
    }
  }

  protected disappear(
    animated = this.props.animated,
    // tslint:disable-next-line:no-any
    additionAnimates: any[] | null = null
  ) {
    if (animated) {
      Animated.parallel(
        this.disappearAnimates.concat(additionAnimates || [])
      ).start(() => this.disappearCompleted());
      this.state.overlayOpacity.addListener((e) => {
        if (e.value < 0.01) {
          this.state.overlayOpacity.stopAnimation();
          this.state.overlayOpacity.removeAllListeners();
        }
      });
    } else {
      this.disappearCompleted();
    }
  }

  protected appearCompleted() {
    const { onAppearCompleted } = this.props;
    if (onAppearCompleted) {
      onAppearCompleted();
    }
  }

  protected disappearCompleted() {
    const { onDisappearCompleted, onClose } = this.props;
    if (onDisappearCompleted) {
      onDisappearCompleted();
    }

    if (onClose) {
      onClose();
    }
  }

  protected buildProps() {
    let { style } = this.props;
    style = [{ backgroundColor: 'rgba(0, 0, 0, 0)', flex: 1 }].concat(
      // tslint:disable-next-line:no-any
      style as any
    );
    // tslint:disable-next-line:no-any
    (this.props as any) = { ...(this.props as any), style };
  }

  protected renderContent() {
    return this.props.children;
  }

  private bindBackAndroidEvent() {
    if (Platform.OS === 'android') {
      const backHandler = BackHandler;
      if (this.backListener) {
        return;
      }
      // tslint:disable:no-any
      this.backListener = (backHandler.addEventListener as (
        n: any,
        c: any
      ) => any)('hardwareBackPress', () => {
        this.closeRequest();
        return true;
      });
    }
  }

  private removeBackListener() {
    if (this.backListener) {
      this.backListener.remove();
      this.backListener = null;
    }
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
