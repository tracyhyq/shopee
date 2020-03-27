/**
 * @desc IconButton component
 * @author heyanqiu
 * @date 2020-3-26
 */
import * as React from 'react';
import { SFC } from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageRequireSource,
  ImageURISource,
  StyleProp,
  ImageStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { globalStyle } from '@styles/variables';

export interface IIconButtonProps {
  /**
   * 按钮文字
   */
  icon: ImageURISource | ImageURISource[] | ImageRequireSource;
  /**
   * 当按钮点击时
   */
  onPress?: (event: GestureResponderEvent) => void;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
}

/**
 * 图标按钮
 */
export const IconButton: SFC<IIconButtonProps> = ({
  icon,
  onPress,
  disabled,
  style,
  iconStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          width: 22,
          height: 22,
          backgroundColor: disabled
            ? globalStyle.color.disable
            : globalStyle.color.white,
        },
        style,
      ]}
      onPress={disabled ? undefined : onPress}
    >
      <Image
        resizeMode="contain"
        source={icon}
        style={
          iconStyle || {
            width: 22,
            height: 22,
          }
        }
      />
    </TouchableOpacity>
  );
};
