/**
 * @desc Header Title
 * @author heyanqiu
 * @date 2020-3-24
 */

import * as React from 'react';
import { Image } from 'react-native';
import { globalStyle } from '@styles/variables';

export default function LogoTitle() {
  return (
    <Image
      style={{ width: 24, height: 24, tintColor: globalStyle.color.lighter }}
      source={require('@assets/svg/logo-cat.svg')}
    />
  );
}
