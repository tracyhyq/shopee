<!--
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-27 13:33:49
 -->

## demo 使用规范

```javascript
import * as React from 'react';
import { Component } from 'react';
import { confirm } from '../index';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { globalStyle } from '../../style';
import { Txt } from '../../Txt';
// tslint:disable: jsx-no-lambda
// tslint:disable: no-console

export class Default extends Component {
  static doc = `
  配置confirm
  `;

  showAlert = () => {
    confirm({
      title: 'title',
      content:
        'content 内容 content 内容 content 内容 content 内容 content 内容',
      confirm: 'confirm',
      onConfirm: () => {
        console.warn('onConfirm');
      },
      cancel: 'cancel',
      onCancel: () => {
        console.warn('onCancel');
      },
    });
  };

  render() {
    return <Button title="打开confirm" onPress={this.showAlert} />;
  }
}

export class PreventClose extends Component {
  static doc = `
  返回 false 阻止关闭
  `;

  // tslint:disable: jsx-no-lambda
  // tslint:disable: no-console
  showAlert = () => {
    confirm({
      title: '阻止confirm关闭',
      onConfirm: () => {
        return false;
      },
    });
  };

  render() {
    return <Button title="打开confirm" onPress={this.showAlert} />;
  }
}

export class Close extends Component {
  static doc = `
  手动关闭
  `;

  showAlert = () => {
    const close = confirm({
      title: 'title',
      content: (
        <Txt
          children="点击我关闭confirm"
          onPress={() => {
            close();
          }}
        />
      ),
    });
  };

  render() {
    return <Button title="打开confirm" onPress={this.showAlert} />;
  }
}

export class Setnput extends Component {
  static doc = `
  内置Input
  `;

  showAlert = () => {
    confirm({
      title: 'title',
      content: (
        <Input
          textInputStyle={{ padding: 0 }}
          style={{
            marginTop: globalStyle.gap.n,
            borderWidth: globalStyle.px1,
            height: 32,
            paddingLeft: 10,
            paddingRight: 10,
            borderColor: '#ccc',
          }}
          placeholder="请输入"
          maxLength={10}
          autoFocus={true}
        />
      ),
    });
  };

  render() {
    return <Button title="打开confirm" onPress={this.showAlert} />;
  }
}

```