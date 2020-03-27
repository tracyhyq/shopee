/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-27 20:14:29
 */

import { StyleSheet } from "react-native";
import { globalStyle } from '@styles/variables';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  line: {
    borderBottomColor: globalStyle.color.border,
    borderBottomWidth: globalStyle.px1,
  },
  padding: {
    paddingTop: globalStyle.scale.scaleHeight(20),
    paddingBottom: globalStyle.scale.scaleHeight(20),
    paddingRight: globalStyle.scale.scaleWidth(20),
    paddingLeft: globalStyle.scale.scaleWidth(20),
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  atavarImg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: globalStyle.color.tint,
    marginTop: globalStyle.scale.scaleHeight(24),
    marginBottom: globalStyle.scale.scaleHeight(24),
  },
  username: {
    fontSize: globalStyle.fontSize.l,
    color: globalStyle.color.normal,
    marginBottom: globalStyle.scale.scaleHeight(10),
  },
  email: {
    fontSize: globalStyle.fontSize.s,
    color: globalStyle.color.tint,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: globalStyle.color.white
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    marginTop: globalStyle.scale.scaleHeight(150),
    width: 60,
    height: 60,
    tintColor: globalStyle.color.border
  },
  emptyText: {
    marginTop: globalStyle.scale.scaleHeight(15),
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
  },
});
