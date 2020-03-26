/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-26 20:32:13
 */

import { StyleSheet } from "react-native";
import { globalStyle } from '@styles/variables';

export default StyleSheet.create({
  headerContainer: {
    flex: 1
  },
  headerChannelText: {
    maxWidth: 150,
    textAlign: 'center',
    color: globalStyle.color.normal,
    fontSize: globalStyle.fontSize.xs,
    paddingTop: globalStyle.scale.scaleHeight(3),
    paddingBottom: globalStyle.scale.scaleHeight(3),
    paddingLeft: globalStyle.scale.scaleWidth(10),
    paddingRight: globalStyle.scale.scaleWidth(10),
    borderColor: globalStyle.color.normal,
    borderWidth: globalStyle.px1,
    borderRadius: 12,
  },
  headerTitleText: {
    fontSize: globalStyle.fontSize.l,
    color: globalStyle.color.strong,
    marginTop: globalStyle.scale.scaleHeight(12),
  },
  headerAvatarWrap: {
    marginTop: globalStyle.scale.scaleHeight(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTextWrap: {
    flexDirection: 'column',
    marginLeft: globalStyle.scale.scaleWidth(12)
  },
  headerUsername: {
    fontSize: globalStyle.fontSize.s,
    color: globalStyle.color.normal
  },
  headerPublish: {
    fontSize: globalStyle.fontSize.xs,
    color: globalStyle.color.disable,
    marginTop: globalStyle.scale.scaleHeight(4),
  },
});
