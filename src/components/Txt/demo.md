<!--
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-18 10:40:59
 -->

## demo 使用规范

```javascript
import * as React from 'react';
import { Component } from 'react';
import { Txt } from '../index';
import { View } from 'react-native';
import { globalStyle } from '../../style';
import { Switch } from '../../Switch';

export class Default extends Component {
  static doc = `
children可支持多种类型, 如果是组件类型直接render，否则会被显示给原生Text组件
  `;

  render() {
    return (
      <View>
        <Txt>123</Txt>
        <Txt children={'ABC'} />
        <Txt children={123} />
        <Txt children={true} />
        <Txt children={<Switch value={true} />} />
        <Txt children={[123, 'ABC', false]} />
        <Txt>
          <Txt>嵌套</Txt>
          <Txt>ABC</Txt>
          123
        </Txt>
      </View>
    );
  }
}

export class Size extends Component {
  static doc = `
支持 'xl' | 'l' | 'n' | 's' | 'xs' 5种大小
默认为 'n'
  `;

  render() {
    return (
      <View>
        <Txt size="xs">123</Txt>
        <Txt size="s">123</Txt>
        <Txt>123</Txt>
        <Txt size="l">123</Txt>
        <Txt size="xl">123</Txt>
      </View>
    );
  }
}

export class Bold extends Component {
  static doc = `
是否加粗
默认不加粗
  `;

  render() {
    return (
      <View>
        <Txt>normal</Txt>
        <Txt bold>bold</Txt>
      </View>
    );
  }
}

export class Color extends Component {
  static doc = `
  字体颜色
  `;

  render() {
    return (
      <View>
        <Txt color={globalStyle.color.normal}>normal</Txt>
        <Txt color={globalStyle.color.tint}>tint</Txt>
        <Txt color={globalStyle.color.border}>border</Txt>
        <Txt color={globalStyle.color.weak}>weak</Txt>
        <Txt color={globalStyle.color.disable}>disable</Txt>
        <Txt color={globalStyle.color.white}>white</Txt>
        <Txt color={globalStyle.color.pressNormal}>pressNormal</Txt>
      </View>
    );
  }
}
```