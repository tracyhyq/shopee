<!--
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-27 13:29:37
 -->

## demo 使用规范

```javascript
import * as React from 'react';
import { Component } from 'react';
import { Button } from '../../Button';
import { alert } from '../index';

export class Default extends Component {
  static doc = `
  打开alert
  `;

  showAlert = () => {
    alert({
      title: 'title',
      content: '正文 正文 正文 正文 正文 正文 正文 正文 正文 正文',
    });
  };

  render() {
    return <Button title="打开alert" onPress={this.showAlert} />;
  }
}

export class Close extends Component {
  static doc = `
  手动关闭
  `;

  // tslint:disable:jsx-no-lambda
  showAlert = () => {
    const close = alert({
      title: 'title',
      content: (
        <Button
          title="手动关闭alert"
          onPress={() => {
            close();
          }}
        />
      ),
    });
  };

  render() {
    return <Button title="打开alert" onPress={this.showAlert} />;
  }
}

export class Content extends Component {
  static doc = `
  只有content
  `;

  showAlert = () => {
    alert({
      content: 'content',
    });
  };

  render() {
    return <Button title="打开alert" onPress={this.showAlert} />;
  }
}

```