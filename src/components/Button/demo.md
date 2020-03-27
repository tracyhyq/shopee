<!--
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-27 13:30:51
 -->

## demo 使用规范

```javascript
import * as React from 'react';
import { Component } from 'react';
import { Button } from '../index';
import { View } from 'react-native';
import { IconButton } from '../IconButton';

export class Default extends Component {
  static doc = `
设置Button的title
  `;

  render() {
    return <Button title="按钮" />;
  }
}

export class OnPress extends Component {
  static doc = `
Button被点击时触发onPress
  `;

  // tslint:disable: jsx-no-lambda
  // tslint:disable: no-console
  render() {
    return (
      <Button
        title="onPress"
        onPress={() => {
          console.warn('onPress');
        }}
      />
    );
  }
}

export class Disabled extends Component {
  static doc = `
Button被禁用
  `;

  render() {
    return (
      <View>
        <Button disabled title="default" />
        <View style={{ height: 10 }} />
        <Button disabled title="primary" type="primary" />
        <View style={{ height: 10 }} />
        <Button disabled title="ghost" type="ghost" />
      </View>
    );
  }
}

export class Type extends Component {
  static doc = `
不同类型
  `;

  render() {
    return (
      <View>
        <Button title="default" />
        <View style={{ height: 10 }} />
        <Button title="primary" type="primary" />
        <View style={{ height: 10 }} />
        <Button title="ghost" type="ghost" />
        <View style={{ height: 10 }} />
        <Button title="clear" type="ghost" clear />
      </View>
    );
  }
}

export class Size extends Component {
  static doc = `
不同大小
  `;

  render() {
    return (
      <View>
        <Button title="default" />
        <View style={{ height: 10 }} />
        <Button title="default" size="s" />
        <View style={{ height: 10 }} />
        <Button title="default" size="xs" />
      </View>
    );
  }
}

export class Rect extends Component {
  static doc = `
无圆角
  `;

  render() {
    return <Button title="无圆角模式" rect />;
  }
}

export class TitleStyle extends Component {
  static doc = `
设置title的样式
  `;

  render() {
    return (
      <Button
        title="titleStyle"
        titleStyle={{
          color: 'red',
        }}
      />
    );
  }
}

export class IconButtonDemo extends Component {
  static doc = `
图标按钮
  `;

  render() {
    return (
      <View>
        <IconButton
          icon={require('../../img/3p.png')}
          iconStyle={{
            width: 4,
            height: 17,
          }}
        />
        <IconButton icon={require('../../img/alert.png')} />
        <IconButton icon={require('../../img/arrow.png')} />
        <IconButton icon={require('../../img/clear.png')} />
      </View>
    );
  }
}

```