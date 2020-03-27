/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-27 16:09:02
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
  footer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerText: {
    fontSize: globalStyle.fontSize.s,
    color: globalStyle.color.strong
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
});
