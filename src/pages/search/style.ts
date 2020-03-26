/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-26 18:52:04
 */

import { StyleSheet, Dimensions } from "react-native";
import { globalStyle } from '@styles/variables';

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    backgroundColor: globalStyle.color.white,
    minHeight: height,
    minWidth: width
  },
  filterContainer: {
    paddingLeft: globalStyle.scale.scaleWidth(30),
    paddingRight: globalStyle.scale.scaleWidth(30),
    paddingTop: globalStyle.scale.scaleHeight(14),
    paddingBottom: globalStyle.scale.scaleHeight(14),
    backgroundColor: '#FAF9FC',
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultCount: {
    color: globalStyle.color.tint,
    fontSize: globalStyle.fontSize.n
  },
  filterClearBtn: {
    color: globalStyle.color.normal,
    fontSize: globalStyle.fontSize.xs,
    paddingTop: globalStyle.scale.scaleHeight(6),
    paddingBottom: globalStyle.scale.scaleHeight(6),
    paddingLeft: globalStyle.scale.scaleWidth(10),
    paddingRight: globalStyle.scale.scaleWidth(10),
    backgroundColor: globalStyle.color.lighter,
    borderRadius: 15,
    overflow: 'hidden'
  },
  filterSubText: {
    color: globalStyle.color.normal,
    fontSize: globalStyle.fontSize.xs,
    marginTop: globalStyle.scale.scaleHeight(10),
    marginBottom: globalStyle.scale.scaleHeight(10),
  },
  itemContainer: {
    paddingLeft: globalStyle.scale.scaleWidth(30),
    paddingRight: globalStyle.scale.scaleWidth(30),
    paddingTop: globalStyle.scale.scaleHeight(18),
    paddingBottom: globalStyle.scale.scaleHeight(18),
    borderBottomColor: globalStyle.color.border,
    borderBottomWidth: globalStyle.px1,
    flex: 1
  },
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    width: 60,
    height: 60,
    tintColor: globalStyle.color.border
  },
  emptyText: {
    fontSize: globalStyle.fontSize.n,
    color: globalStyle.color.disable,
  },
  footer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerText: {
    fontSize: globalStyle.fontSize.s,
    color: globalStyle.color.strong
  }
});
