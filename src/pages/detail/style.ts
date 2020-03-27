/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-27 11:55:48
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
    marginBottom: globalStyle.scale.scaleHeight(50)
  },
  btnsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
  unlike: {
    tintColor: globalStyle.color.lighter,
  },
  gone: {
    tintColor: globalStyle.color.tint,
  },
  joinText: {
    fontSize: globalStyle.fontSize.n,
    color: '#788C36',
    marginRight: globalStyle.scale.scaleWidth(30)
  },
  replyLeftContainer: {
    width: '80%',
    backgroundColor: globalStyle.color.tint,
  },
  replyRightContainer: {
    width: '20%',
    backgroundColor: globalStyle.color.lighter,
    alignItems: 'center',
    justifyContent: 'center',
    height: globalStyle.scale.scaleHeight(60),
  },
  input: {
    width: '75%',
    height: globalStyle.scale.scaleHeight(32),
  },
  textInputStyle: {
    backgroundColor: globalStyle.color.white,
    borderRadius: 20,
    overflow: 'hidden',
    color: globalStyle.color.strong,
    paddingLeft: globalStyle.scale.scaleWidth(20),
    paddingRight: globalStyle.scale.scaleWidth(20)
  },
  crossIcon: {
    width: 24,
    height: 24,
    tintColor: globalStyle.color.lighter,
    marginRight: globalStyle.scale.scaleWidth(30),
  },
  sendIcon: {
    width: 28,
    height: 24,
    tintColor: globalStyle.color.tint,
  }
});
