/*
 * @description: Components common style
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-18 10:37:56
 */

import { Dimensions, PixelRatio, StyleSheet } from 'react-native';

const window = Dimensions.get('window');
const fontScale = PixelRatio.getFontScale();

/**
 * 全局样式变量
 */
export const globalStyle = {
  /* 圆角值 */
  radius: 2,
  /* 1px */
  px1: StyleSheet.hairlineWidth,
  /* 间距 */
  gap: {
    /* 正常间距大小 */
    n: 15,
  },
  // tslint:disable-next-line: no-useless-cast
  fontWeightBold: '600' as '600',
  color: {
    /* 正常字体颜色 */
    normal: '#333',
    /* 主色调 */
    tint: '#f63',
    /* 边框颜色 */
    border: '#E7E7E7',
    /* 弱字体颜色 */
    weak: '#999',
    /* 禁用 */
    disable: '#ccc',
    /* 白色 */
    white: '#fff',
    /**
     * 按下时候的背景颜色
     */
    pressNormal: '#f8f8f8',
  },
  fontSize: {
    xs: 12 / fontScale,
    s: 14 / fontScale,
    /* 正常字体大小 */
    n: 16 / fontScale,
    l: 20 / fontScale,
    xl: 30 / fontScale,
  },
  window: {
    ...window,
  },
};
