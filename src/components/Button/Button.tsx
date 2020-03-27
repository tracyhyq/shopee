/**
 * @desc Button component
 * @author heyanqiu
 * @date 2020-3-26
 */
import * as React from 'react';
import { SFC } from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { globalStyle } from '@styles/variables';
import { Txt } from '../Txt';

export interface IButtonProps {
  /**
   * 按钮文字
   */
  title: string;
  /**
   * 当按钮点击时
   */
  onPress?: (event: GestureResponderEvent) => void;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 按钮类型
   */
  type?: 'primary' | 'ghost';
  size?: 's' | 'xs';
  /**
   * 是否显示边框
   */
  clear?: boolean;
  /**
   * 是否无边框
   */
  rect?: boolean;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

/**
 * 按钮
 */
export const Button: SFC<IButtonProps> = ({
  title,
  onPress,
  disabled,
  type,
  rect,
  size,
  clear,
  style,
  titleStyle,
}) => {
  let backgroundColor: string;
  let color: string;
  let borderWidth: number | undefined = globalStyle.px1;
  let borderColor: string | undefined;
  let fontSize = globalStyle.fontSize.n;
  switch (type) {
    case 'primary':
      backgroundColor = globalStyle.color.tint;
      color = globalStyle.color.white;
      borderWidth = undefined;
      borderColor = undefined;
      if (disabled) {
        backgroundColor = globalStyle.color.disable;
        color = globalStyle.color.white;
      }
      break;
    case 'ghost':
      backgroundColor = globalStyle.color.white;
      color = globalStyle.color.tint;
      borderColor = globalStyle.color.tint;
      if (disabled) {
        backgroundColor = globalStyle.color.white;
        color = globalStyle.color.disable;
        borderColor = globalStyle.color.disable;
      }
      break;
    default:
      backgroundColor = globalStyle.color.white;
      color = globalStyle.color.normal;
      borderColor = globalStyle.color.weak;
      if (disabled) {
        backgroundColor = globalStyle.color.white;
        color = globalStyle.color.disable;
        borderColor = globalStyle.color.disable;
      }
  }
  let height = 50;
  switch (size) {
    case 's':
      height = 40;
      break;
    case 'xs':
      height = 30;
      fontSize = globalStyle.fontSize.s;
      break;
    default:
  }
  if (clear) {
    borderWidth = undefined;
    borderColor = undefined;
  }
  return (
    <TouchableOpacity
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          height,
          backgroundColor,
          borderRadius: rect ? 0 : globalStyle.radius,
          borderWidth,
          borderColor,
        },
        style,
      ]}
      onPress={disabled ? undefined : onPress}
      activeOpacity={disabled ? 1 : 0.5}
    >
      <Txt
        style={[
          {
            color,
            fontSize,
          },
          titleStyle,
        ]}
      >
        {title}
      </Txt>
    </TouchableOpacity>
  );
};
