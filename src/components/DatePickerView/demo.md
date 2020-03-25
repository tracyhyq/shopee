<!--
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-25 10:59:12
 -->

## demo 使用规范

```javascript
import * as React from 'react';
import { Component } from 'react';
import { DatePickerView } from '../index';
// tslint:disable: no-duplicate-string

export class Default extends Component {
  static doc = `
  DatePickerView 默认
  `;

  render() {
    return (
      <DatePickerView
        minDate={new Date('2018/05/01 12:20:13')}
        value={new Date('2018/05/18 19:27:26')}
      />
    );
  }
}

export class Default1 extends Component {
  static doc = `
  DatePickerView 年月日
  `;

  render() {
    return (
      <DatePickerView mode="date" value={new Date('2018/05/18 19:27:26')} />
    );
  }
}

export class Default2 extends Component {
  static doc = `
  DatePickerView 自定义分钟数步长
  `;

  render() {
    return (
      <DatePickerView minuteStep={15} value={new Date('2018/05/18 19:27:26')} />
    );
  }
}
```