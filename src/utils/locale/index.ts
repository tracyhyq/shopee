/*
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-24 10:52:52
 */

import I18n, { getLanguages } from 'react-native-i18n';
import en from './en';
import zh from './zh';

I18n.defaultLocale = 'en';
I18n.fallbacks = true;
I18n.translations = {
  en,
  zh,
};

export { I18n, getLanguages };
