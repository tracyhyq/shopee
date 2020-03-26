/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-26 22:06:29
 */

import { StyleSheet } from "react-native";
import { globalStyle } from '@styles/variables';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  textContainer: {
    flexDirection: 'row',
    width: '20%',
    alignSelf: 'flex-start',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginRight: globalStyle.scale.scaleWidth(30),
    marginTop: globalStyle.scale.scaleHeight(5),
  },
  logo: {
    width: 12,
    height: 12,
    tintColor: globalStyle.color.weak,
  },
  text: {
    fontSize: globalStyle.fontSize.xs,
    color: globalStyle.color.normal
  },
  ataversContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '80%'
  },
  ataver: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: globalStyle.scale.scaleWidth(10),
    marginBottom: globalStyle.scale.scaleWidth(20)
  }
});
