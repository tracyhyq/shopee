import * as React from 'react';
import { Text, TextProperties } from 'react-native';
import { globalStyle } from '@styles/variables';
import { isValidElement, SFC } from 'react';

export interface ITxtProps extends TextProperties {
  // tslint:disable-next-line:no-any
  children: any;
  // 字体大小
  size?: 'xl' | 'l' | 'n' | 's' | 'xs';
  // 是否加粗
  bold?: boolean;
  // 字体颜色
  color?: string;
}

// 扩展 RN自带Text组件，设置默认的 fontSize 和 color
export const Txt: SFC<ITxtProps> = ({
  children,
  size = 'n',
  bold,
  color = globalStyle.color.normal,
  style,
  ...otherProps
}) => {
  if (isValidElement(children)) {
    return children;
  }
  return (
    <Text
      children={children}
      style={[
        {
          color,
          fontSize: globalStyle.fontSize[size],
          fontWeight: bold ? globalStyle.fontWeightBold : 'normal',
        },
        style,
      ]}
      {...otherProps}
    />
  );
};
