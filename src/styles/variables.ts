/*
 * @description: @styles/variables
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-25 13:42:19
 */

import { Dimensions, PixelRatio, StyleSheet } from 'react-native';

const window = Dimensions.get('window');
const { height, width } = Dimensions.get('window'); // 获取窗口的宽、高度，以 dp 为单位。
const deviceRatio = PixelRatio.get(); // 获取设备的像素密度
const fontRatio = PixelRatio.getFontScale(); // 获取设备的文字缩放比率
const BASE_LINE = 750; // 以设计稿是 750 为基准

export const FontScale = fontRatio;
export const OnePX = 1 / deviceRatio;

/**
 * 计算真实的高度
 * @param realHeight
 */
const scaleHeight = (realHeight: number) => {
  return realHeight * (height / BASE_LINE);
};

/**
 * 计算真实的宽度
 * @param realWidth
 */
const scaleWidth = (realWidth: number) => {
  return realWidth * (width / BASE_LINE);
};

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
    normal: '#67616D',
    /* 主色调 */
    tint: '#8560A9',
    /* 亮色 */
    lighter: '#D5EF7F',
    /* 深色 */
    strong: '#453257',
    /* 边框颜色 */
    border: '#D3C1E5',
    /* 弱字体颜色 */
    weak: '#AC8EC9',
    /* 禁用 */
    disable: '#BABABA',
    /* 白色 */
    white: '#fff',
    /**
     * 按下时候的背景颜色
     */
    pressNormal: '#f8f8f8',
    active: '#E5F7A9',
    fontOrIconDisable: '#666',
  },
  fontSize: {
    xs: 12 / FontScale,
    s: 14 / FontScale,
    /* 正常字体大小 */
    n: 16 / FontScale,
    l: 24 / FontScale,
    xl: 30 / FontScale,
  },
  window: {
    ...window,
  },
  scale: {
    scaleWidth,
    scaleHeight
  }
};
