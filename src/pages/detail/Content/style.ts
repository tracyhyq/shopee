/*
 * @description: Detail Content
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-26 21:21:43
 */

import { StyleSheet } from "react-native";
import { globalStyle } from '@styles/variables';

export default StyleSheet.create({
  swiperContainer: {},
  slide: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    overflow: 'hidden',
  },
  slideImage: {
    alignSelf: 'center',
    width: '90%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
  },
  describeContainer: {
    overflow: 'hidden',
  },
  describe: {
    fontSize: globalStyle.fontSize.n,
    color: globalStyle.color.normal
  },
  timeContainer: {},
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boldLine: {
    width: 4,
    height: 18,
    borderRadius: 2,
    backgroundColor: globalStyle.color.tint
  },
  H1: {
    fontSize: globalStyle.fontSize.n,
    color: globalStyle.color.tint,
    marginLeft: globalStyle.scale.scaleWidth(10)
  },
  timeWrap: {
    flexDirection: 'row',
    marginTop: globalStyle.scale.scaleHeight(20),
    justifyContent: 'space-around',
  },
  timeHor: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  timeLogo: {
    width: 16,
    height: 16,
    tintColor: globalStyle.color.lighter,
    marginRight: globalStyle.scale.scaleWidth(10)
  },
  participantsContainer: {
    height: globalStyle.scale.scaleHeight(150),
    backgroundColor: 'yellow'
  },
  timeText: {
    fontSize: globalStyle.fontSize.n,
    color: globalStyle.color.normal,
  },
  timestamp: {
    marginTop: globalStyle.scale.scaleHeight(20),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bigTime: {
    fontSize: globalStyle.fontSize.xl,
    color: globalStyle.color.other,
  },
  smallUnit: {
    fontSize: globalStyle.fontSize.xs,
    alignSelf: 'flex-end',
    color: globalStyle.color.other,
    marginLeft: globalStyle.scale.scaleWidth(10),
    marginBottom: globalStyle.scale.scaleHeight(5),
  },
  longSplit: {
    width: globalStyle.px1,
    height: globalStyle.scale.scaleHeight(75),
    backgroundColor: globalStyle.color.disable
  },
  addrContainer: {},
  addr: {
    fontSize: globalStyle.fontSize.n,
    color: globalStyle.color.normal,
    marginTop: globalStyle.scale.scaleHeight(10),
    marginBottom: globalStyle.scale.scaleHeight(10),
  },
  locationImg: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
  },
});
