/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-26 23:02:18
 */

import { StyleSheet } from "react-native";
import { globalStyle } from '@styles/variables';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: globalStyle.scale.scaleHeight(20),
  },
  ataversContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginRight: globalStyle.scale.scaleWidth(20),
    width: '10%'
  },
  ataver: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  textContainer: {
    width: '90%',
  },
  nameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: globalStyle.fontSize.xs,
    color: globalStyle.color.tint,
    marginRight: globalStyle.scale.scaleWidth(20),
  },
  time: {
    fontSize: globalStyle.fontSize.xxs,
    color: globalStyle.color.disable,
  },
  comment: {
    fontSize: globalStyle.fontSize.s,
    color: globalStyle.color.normal,
    marginTop: globalStyle.scale.scaleHeight(10),
    marginRight: globalStyle.scale.scaleWidth(50),
  },
  reply: {
    width: 16,
    height: 16,
    position: 'absolute',
    top: 0,
    right: globalStyle.scale.scaleWidth(40),
    tintColor: globalStyle.color.lighter
  }
});
