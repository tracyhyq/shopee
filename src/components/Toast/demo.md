<!--
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-18 10:42:26
 -->

## demo 使用规范

```javascript
import * as React from 'react';
import { Component } from 'react';
import { toast } from '../index';
import { Button } from '../../Button';
// tslint:disable: jsx-no-lambda
// tslint:disable: no-console

export class Default extends Component {
  static doc = `
  显示toast
  `;
  count: number = 0;
  render() {
    return (
      <Button
        title="显示toast"
        onPress={() => {
          toast(
            `toast content toast content toast content toast content toast content ${
              this.count
            }`
          );
          this.count++;
        }}
      />
    );
  }
}

export class Default1 extends Component {
  static doc = `
  显示toast, 自定义duration
  `;
  count: number = 0;
  render() {
    return (
      <Button
        title="显示toast, 1s后关闭"
        onPress={() => {
          toast({
            content: `toast content ${this.count}`,
            duration: 1000,
          });
          this.count++;
        }}
      />
    );
  }
}
```