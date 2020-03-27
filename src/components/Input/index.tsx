/**
 * @desc TextInput with icon
 * @author heyanqiu
 * @date 2020-3-24
 */

import * as React from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  TextInput,
  TextInputProperties,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData
} from 'react-native';
import { divide, times } from 'number-precision';
import { globalStyle } from '@styles/variables';

export interface IInputProps extends TextInputProperties {
  style?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  clearStyle?: StyleProp<ImageStyle>;
  showClearIcon?: boolean;
  // 最左侧 icon
  leftIcon?: JSX.Element;
  // 左侧 Icon 样式 
  leftIconStyle?: StyleProp<ViewStyle>;
  // 是否在onBlur自动去除输入首位的空格
  autoTrim?: boolean;
  // 是否是用于输入钱，在钱模式下后端接口的数据单位是分，展示给用户的元，onVary中回调的是分
  // 组件会解决JS浮点数运行时失去精度的问题
  useMoney?: boolean;
  disabled?: boolean;
}

interface IState {
  clearable: boolean;
  value: string;
  invalid: boolean;
}

/**
 * 输入框
 */
export default class Input extends React.Component<IInputProps, IState> {
  state = {
    clearable: false,
    value: '',
    invalid: true,
  };

  public clear = () => {
    this.onChange('');
  };

  UNSAFE_componentWillReceiveProps(nextProps: IInputProps) {
    const { value } = this.props;
    this.setState({
      value: value || ''
    });
  }

  onChange = (text: string) => {
    const { onChangeText, useMoney, maxLength } = this.props;
    this.state.clearable = text.length > 0;

    if (useMoney) {
      if (!text.endsWith('.')) {
        const numValue = parseFloat(text);
        if (!isNaN(numValue)) {
          text = String(times(numValue, 100));
        }
      }
    }

    //
    if (maxLength && String(text).length > maxLength) {
      return;
    }

    this.setState({
      value: text
    });

    // 还原 onChangeText
    if (typeof onChangeText === 'function') {
      onChangeText(text);
    }
  };

  onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const { autoTrim, onBlur } = this.props;

    // 还原原生blur
    if (typeof onBlur === 'function') {
      onBlur(e);
    }

    if (autoTrim) {
      this.setState({
        value: (this.state.value || '').trim()
      });
    }
  };

  render() {
    // tslint:disable: prefer-const
    let {
      style,
      textInputStyle,
      clearStyle,
      showClearIcon,
      disabled,
      leftIcon,
      leftIconStyle,
      useMoney,
      maxLength, // 在JS层面实现maxLength
      ...otherProps
    } = this.props;
    let { invalid, value = '', clearable } = this.state;

    if (useMoney) {
      // 钱模式下 / 100
      if (!value.endsWith('.')) {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          value = String(divide(numValue, 100));
        }
      }
    }

    return (
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
          },
          style,
        ]}
      >
        {
          leftIcon? (
            <View style={leftIconStyle}>
              {leftIcon}
            </View>
          ) : null
        }
        <TextInput
          {...otherProps}
          value={value}
          onChangeText={this.onChange}
          onBlur={this.onBlur}
          editable={!disabled}
          style={[
            {
              flex: 1,
              alignSelf: 'stretch',
              textAlignVertical: 'center',
              padding: 0,
              color: invalid
                ? globalStyle.color.tint
                : disabled
                  ? globalStyle.color.disable
                  : globalStyle.color.white,
              fontSize: globalStyle.fontSize.n,
            },
            textInputStyle,
          ]}
        />
        {showClearIcon && clearable ? (
          <TouchableWithoutFeedback onPress={this.clear}>
            <Image
              source={require('@assets/imgs/clear.png')}
              style={[
                {
                  width: 16,
                  height: 16,
                  marginRight: 10,
                },
                clearStyle,
              ]}
            />
          </TouchableWithoutFeedback>
        ) : null}
      </View>
    );
  }
}
