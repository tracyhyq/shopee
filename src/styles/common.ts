/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-24 19:40:17
 */
/*
 * @providesModule @styles/common
 */

import { StyleSheet } from 'react-native';
import { globalStyle } from './variables';

export default StyleSheet.create({
  navHeader: {
    borderBottomWidth: 0,
    backgroundColor: globalStyle.color.tint,
    shadowColor: 'transparent',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
});
