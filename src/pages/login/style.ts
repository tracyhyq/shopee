/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-26 18:56:04
 */

import { StyleSheet, Dimensions } from "react-native";
import { globalStyle } from '@styles/variables';

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height
  },
  mask: {
    position: 'absolute',
    width: '100%',
    height,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: globalStyle.color.tint,
    opacity: 0.7,
  },
  langChanger: {
    flex: 1,
    position: 'absolute',
    width: 150,
    height: globalStyle.scale.scaleHeight(80),
    top: 0,
    left: 10,
    color: globalStyle.color.lighter,
    fontSize: globalStyle.fontSize.n,
    justifyContent: 'center',
  },
  pickerItem: {
    color: globalStyle.color.lighter,
    fontSize: globalStyle.fontSize.n
  },
  textStyle: {
    color: globalStyle.color.lighter,
    width: '100%',
    textAlign: 'center'
  },
  slogon: {
    height: globalStyle.scale.scaleHeight(20),
    lineHeight: globalStyle.scale.scaleHeight(20),
    marginTop: globalStyle.scale.scaleHeight(100),
    fontSize: globalStyle.fontSize.n
  },
  brand: {
    height: globalStyle.scale.scaleHeight(32),
    lineHeight: globalStyle.scale.scaleHeight(32),
    marginTop: globalStyle.scale.scaleHeight(20),
    fontSize: globalStyle.fontSize.l
  },
  logoWrap: {
    marginTop: globalStyle.scale.scaleHeight(30),
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  logo: {
    width: 64,
    height: 64,
    tintColor: globalStyle.color.lighter,
  },
  leftIcon: {
    marginLeft: 12,
    marginRight: 12
  },
  btns: {
    flex: 1,
    marginTop: globalStyle.scale.scaleHeight(-100)
  },
  input: {
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20,
    height: globalStyle.scale.scaleHeight(40),
    borderStyle: "solid",
    borderWidth: globalStyle.px1,
    borderColor: globalStyle.color.white,
    borderRadius: 20
  },
  loginBtn: {
    width: '100%',
    height: globalStyle.scale.scaleHeight(64),
    backgroundColor: globalStyle.color.lighter,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  pressWrap: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    fontSize: globalStyle.fontSize.n,
    color: globalStyle.color.strong
  }
});
