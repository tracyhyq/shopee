/*
 * @providesModule @styles/common
 */

import { StyleSheet } from 'react-native';
import { FontScale } from './variables';

export default StyleSheet.create({
  navHeader: {
    borderBottomWidth: 0,
    backgroundColor: 'white',
    shadowColor: 'transparent',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  navCard: {
    backgroundColor: 'white',
    flex: 1,
  },
  navTitle: {
    fontSize: 18 / FontScale,
    fontWeight: '500',
    flex: 1,
    textAlign: 'center',
  },
  page: {
    height: '100%',
    width: '100%',
  },
  touchArea: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
