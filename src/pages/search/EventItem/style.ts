/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-27 16:45:01
 */

import { StyleSheet } from "react-native";
import { globalStyle } from '@styles/variables';

export default StyleSheet.create({
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightWrap: {},
  userIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: globalStyle.scale.scaleWidth(10)
  },
  username: {
    fontSize: globalStyle.fontSize.xs,
    color: globalStyle.color.normal,
  },
  channelText: {
    color: globalStyle.color.normal,
    fontSize: globalStyle.fontSize.xs,
    paddingTop: globalStyle.scale.scaleHeight(6),
    paddingBottom: globalStyle.scale.scaleHeight(6),
    paddingLeft: globalStyle.scale.scaleWidth(10),
    paddingRight: globalStyle.scale.scaleWidth(10),
    borderColor: globalStyle.color.normal,
    borderWidth: globalStyle.px1,
    borderRadius: 15,
  },
  itemBody: {
    flexDirection: 'row',
    marginTop: globalStyle.scale.scaleHeight(10),
  },
  bodyLeft: {
    paddingRight: globalStyle.scale.scaleWidth(15)
  },
  bodyRight: {},
  eventImg: {
    width: 64,
    height: 64,
  },
  title: {
    fontSize: globalStyle.fontSize.l,
    color: globalStyle.color.strong
  },
  timeBar: {
    flexDirection: 'row',
    marginTop: globalStyle.scale.scaleHeight(12),
    alignItems: 'center'
  },
  timeIcon: {
    width: 12,
    height: 12,
    tintColor: globalStyle.color.tint,
    marginRight: globalStyle.scale.scaleWidth(8),
  },
  timeText: {
    fontSize: globalStyle.fontSize.xs,
    color: globalStyle.color.tint,
  },
  content: {
    marginTop: globalStyle.scale.scaleHeight(12),
    fontSize: globalStyle.fontSize.s,
    color: globalStyle.color.normal,
  },
  likesBar: {
    flexDirection: 'row',
    marginTop: globalStyle.scale.scaleHeight(12),
    alignItems: 'center'
  },
  likeBarIcon: {
    width: 12,
    height: 12,
    tintColor: globalStyle.color.weak,
    marginRight: globalStyle.scale.scaleWidth(8),
  },
  likeBarText: {
    fontSize: globalStyle.fontSize.xs,
    color: globalStyle.color.weak,
  },
  likeText: {
    marginRight: globalStyle.scale.scaleWidth(30),
  },
  goneIcon: {
    tintColor: globalStyle.color.other,
  },
  goneText: {
    color: globalStyle.color.strong
  },
  likedIcon: {
    tintColor: globalStyle.color.like,
  },
  likedText: {
    color: globalStyle.color.strong
  },
});
