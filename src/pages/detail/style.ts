/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-27 00:24:47
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
  },
  commentsContainer: {
  },
  btnsContainer: {
    height: globalStyle.scale.scaleHeight(60),
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: globalStyle.scale.scaleHeight(60),
  },
  joinLeftContainer: {
    width: '55%',
    backgroundColor: globalStyle.color.tint,
  },
  joinRightContainer: {
    width: '45%',
    backgroundColor: globalStyle.color.lighter
  },
  btnIcon: {
    width: 24,
    height: 24,
    tintColor: globalStyle.color.strong,
    marginRight: globalStyle.scale.scaleWidth(50)
  },
  likeIcon: {
    marginLeft: globalStyle.scale.scaleWidth(50)
  },
  joinText: {
    fontSize: globalStyle.fontSize.n,
    color: '#788C36',
    marginRight: globalStyle.scale.scaleWidth(30)
  }
});
