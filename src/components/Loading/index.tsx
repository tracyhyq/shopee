/**
 * @desc Loading compnent
 * @author heyanqiu
 * @date 2020-3-26
 */
import * as React from 'react';
import { Component, ReactNode } from 'react';
import {
  Animated,
  Easing,
  EasingFunction,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Overlay, OverlayView } from '../Overlay';
import { globalStyle } from '@styles/variables';
import { Txt } from '../Txt';

export interface ILoadingType {
  normal: string;
  tint: string;
}

export interface ILoadingProps {
  style?: StyleProp<ViewStyle>;
  easing?: EasingFunction;
  duration?: number;
  type?: keyof ILoadingType;
}

export interface ILoadingState {
  transform: Animated.Value;
}

const imgMap: ILoadingType = {
  normal: require('@assets/imgs/toast_loading.png'),
  tint: require('@assets/imgs/loading.png'),
};

/**
 * Loading
 */
export class Loading extends Component<ILoadingProps, ILoadingState> {
  static loading = loading;
  static defaultProps = {
    easing: Easing.linear,
    duration: 1000,
    type: 'normal',
  };

  readonly state: ILoadingState = {
    transform: new Animated.Value(0),
  };

  rTimer: number | null = null;

  rotate = () => {
    const fn = () => {
      this.state.transform.setValue(0);
      Animated.timing(this.state.transform, {
        duration: this.props.duration,
        toValue: 1,
        easing: this.props.easing,
      }).start(() => {
        if (this.rTimer) {
          cancelAnimationFrame(this.rTimer);
        }
        this.rTimer = requestAnimationFrame(fn);
      });
    };
    fn();
  };

  componentDidMount() {
    this.rotate();
  }

  UNSAFE_componentWillUnmount() {
    if (this.rTimer) {
      cancelAnimationFrame(this.rTimer);
    }
  }

  render() {
    const { style, ...otherProps } = this.props;
    const spin = this.state.transform.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <Animated.Image
        source={imgMap[this.props.type || 'normal']}
        resizeMode="cover"
        {...otherProps}
        style={[
          {
            width: 30,
            height: 30,
            transform: [
              {
                rotate: spin,
              },
            ],
          },
          style,
        ]}
      />
    );
  }
}

export interface ILoadingOption extends ILoadingProps {
  content?: ReactNode;
  mask?: boolean;
  modal?: boolean;
}

export function loading(opt?: ILoadingOption | string | number) {
  let option: ILoadingOption = {};
  if (isText(opt)) {
    option = {
      content: opt,
    };
  } else {
    option = opt as ILoadingOption;
  }
  let txt = option.content;
  if (isText(txt)) {
    txt = (
      <Txt
        style={{
          color: '#fff',
          marginTop: 5,
          fontSize: globalStyle.fontSize.n,
        }}
      >
        {txt}
      </Txt>
    );
  }
  const { modal } = option;
  let { mask } = option;
  if (modal && mask === undefined) {
    mask = true;
  }
  const overlayProps = {
    overlayOpacity: modal ? 0.8 : 0,
    overlayClosable: mask ? false : !modal,
  };
  const overlayView = (
    <OverlayView
      animated
      {...overlayProps}
      overlayPointerEvents={mask ? 'auto' : 'none'}
      maskPointerEvents={mask ? 'auto' : 'none'}
      style={styles.overlayLoading}
    >
      <View
        style={{
          padding: globalStyle.gap.n,
          borderRadius: 2,
          backgroundColor: modal ? 'transparent' : 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loading {...option} />
        {txt}
      </View>
    </OverlayView>
  );
  const key = Overlay.show(overlayView);

  return () => {
    Overlay.hide(key);
  };
}

const styles = StyleSheet.create({
  overlayLoading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
 * 是否文字
 * @param txt
 */
function isText(txt?: ILoadingOption | string | number | ReactNode): boolean {
  const t = typeof txt;
  if (t === 'string' || t === 'number') {
    return true;
  }
  return false;
}
