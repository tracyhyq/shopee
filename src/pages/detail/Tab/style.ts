/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-26 20:44:53
 */

import { StyleSheet } from "react-native";
import { globalStyle } from '@styles/variables';

export default StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: globalStyle.color.white
  },
  tabTouchContainer: {
    width: '33%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textActive: {
    color: globalStyle.color.other,
  },
  tabLogo: {
    width: 20,
    height: 20,
    tintColor: globalStyle.color.tint,
  },
  tabText: {
    fontSize: globalStyle.fontSize.xs,
    color: globalStyle.color.tint,
  },
  tabSplit: {
    color: globalStyle.color.disable
  },
  logoActive: {
    tintColor: globalStyle.color.other,
  },
});
