/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-27 16:45:16
 */

import { StyleSheet } from "react-native";
import { globalStyle } from '@styles/variables';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.color.strong
  },
  titleText: {
    alignSelf: 'center',
    color: globalStyle.color.weak,
    fontSize: globalStyle.fontSize.s,
    paddingBottom: 4,
  },
  line: {
    alignSelf: 'center',
    borderBottomWidth: globalStyle.px1,
    borderBottomColor: globalStyle.color.weak,
  },
  dateLine: {
    width: globalStyle.scale.scaleWidth(80),
  },
  channelLine: {
    width: globalStyle.scale.scaleWidth(140),
  },
  active: {
    backgroundColor: globalStyle.color.active,
    color: globalStyle.color.strong,
    borderColor: 'transparent',
  },
  item: {
    color: globalStyle.color.white,
    fontSize: globalStyle.fontSize.n,
    marginTop: 15,
    marginRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 15,
    overflow: 'hidden',
  },
  itemsContainer: {
    marginTop: globalStyle.scale.scaleHeight(10),
    paddingLeft: globalStyle.scale.scaleWidth(20),
    paddingRight: globalStyle.scale.scaleWidth(20),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateContainer: {
    marginTop: globalStyle.scale.scaleHeight(40),
  },
  dateItem: {
  },
  channelContainer: {
    marginTop: globalStyle.scale.scaleHeight(30)
  },
  channelItem: {
    borderWidth: globalStyle.px1,
    borderColor: globalStyle.color.border
  },
  searchBtn: {
    width: '100%',
    height: globalStyle.scale.scaleHeight(64),
    backgroundColor: globalStyle.color.disable,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  searchBtnActive: {
    backgroundColor: globalStyle.color.active,
  },
  logoActive: {
    tintColor: globalStyle.color.fontOrIconDisable,
  },
  btnActive: {
    color: globalStyle.color.fontOrIconDisable,
  },
  pressWrap: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 10,
    tintColor: globalStyle.color.fontOrIconDisable,
  },
  searchText: {
    fontSize: globalStyle.fontSize.n,
    color: globalStyle.color.fontOrIconDisable,
  },
  searchSubTextWrap: {
    height: globalStyle.scale.scaleHeight(16),
    position: 'absolute',
    left: 0,
    bottom: globalStyle.scale.scaleHeight(8),
    right: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchSubText: {
    width: '80%',
    fontSize: globalStyle.fontSize.xs,
    color: globalStyle.color.tint,
    textAlign: 'center'
  },
  inputContainer: {
    height: globalStyle.scale.scaleHeight(40),
    backgroundColor: globalStyle.color.white,
    marginLeft: globalStyle.scale.scaleWidth(16),
    marginRight: globalStyle.scale.scaleWidth(16),
    marginTop: globalStyle.scale.scaleHeight(15),
    paddingLeft: globalStyle.scale.scaleWidth(8),
    paddingRight: globalStyle.scale.scaleWidth(8)
  },
  trangle: {
    width: 0,
    height: 0,
    borderTopWidth: 5,
    borderTopColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: globalStyle.color.white,
    marginTop: globalStyle.scale.scaleHeight(-10),
    marginLeft: globalStyle.scale.scaleWidth(25)
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputLogo: {
    width: 12,
    height: 12,
    tintColor: globalStyle.color.lighter
  },
  inputText: {
    width: globalStyle.scale.scaleWidth(200),
    marginLeft: globalStyle.scale.scaleWidth(5),
    textAlign: 'center'
  },
  op: {
    marginLeft: globalStyle.scale.scaleWidth(10)
  }
});
