/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-27 00:23:56
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginLeft: globalStyle.scale.scaleWidth(25),
    marginRight: globalStyle.scale.scaleWidth(30),
  },
  tabSplit: {
    color: globalStyle.color.disable
  },
  logoActive: {
    tintColor: globalStyle.color.other,
  },
});
