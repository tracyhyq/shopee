/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-26 21:19:52
 */

import { StyleSheet } from "react-native";
import { globalStyle } from '@styles/variables';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.color.white
  },
  line: {
    borderBottomColor: globalStyle.color.border,
    borderBottomWidth: globalStyle.px1,
  },
  marginLine: {
    height: globalStyle.px1,
    backgroundColor: globalStyle.color.border,
    marginTop: globalStyle.scale.scaleHeight(20),
    marginBottom: globalStyle.scale.scaleHeight(20),
  },
  padding: {
    paddingTop: globalStyle.scale.scaleHeight(20),
    paddingBottom: globalStyle.scale.scaleHeight(20),
    paddingRight: globalStyle.scale.scaleWidth(20),
    paddingLeft: globalStyle.scale.scaleWidth(20),
  },
  scrollContainer: {
    // flex: 1,
    // minHeight: height,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: globalStyle.color.white
  },
  detailContainer: {
  },
  participantsContainer: {
    height: globalStyle.scale.scaleHeight(150),
    backgroundColor: 'yellow'
  },
  commentsContainer: {
    height: globalStyle.scale.scaleHeight(300),
    backgroundColor: 'blue'
  },
  btnsContainer: {
    height: globalStyle.scale.scaleHeight(60),
    backgroundColor: 'green'
  }
});
