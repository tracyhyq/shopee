<!--
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-25 10:58:25
 -->

## demo 使用规范

```javascript
import * as React from 'react';
import { Component } from 'react';
import { Text, View } from 'react-native';
import { format } from 'date-fns';
import { DateRangePicker } from '../index';

export class Default extends Component {
  static doc = `
  日期范围
  `;

  state = {
    value: [new Date('2018/05/18 19:27:26'), new Date('2018/06/18 19:27:26')],
  };

  onDateRangePickerConfirm = (dateArr: string[]) => {
    // 注意⚠️： 在RN 中 Date 构造函数只接受 YYYY/MM/DD HH:mm:ss 格式的日期字符串，而不能接受 YYYY-MM-DD HH:mm:ss
    const [start, end] = dateArr;
    this.setState({
      value: [new Date(start), new Date(end)],
    });
  };

  render() {
    const [startDate, endDate] = this.state.value;
    return (
      <DateRangePicker
        mode="date"
        title="请选择日期范围"
        value={this.state.value}
        onOk={this.onDateRangePickerConfirm}
      >
        <View>
          <Text>请选择日期范围：</Text>
          <Text>
            {format(startDate, 'YYYY/MM/DD')} 至 {format(endDate, 'YYYY/MM/DD')}
          </Text>
        </View>
      </DateRangePicker>
    );
  }
}

export class Default1 extends Component {
  static doc = `
  时间范围
  `;

  state = {
    value: [new Date('2018/05/18 19:27:26'), new Date('2018/06/19 19:27:26')],
  };

  onDateRangePickerConfirm = (dateArr: string[]) => {
    // 注意⚠️： 在RN 中 Date 构造函数只接受 YYYY/MM/DD HH:mm:ss 格式的日期字符串，而不能接受 YYYY-MM-DD HH:mm:ss
    const [start, end] = dateArr;
    this.setState({
      value: [new Date(start), new Date(end)],
    });
  };

  render() {
    const [startDate, endDate] = this.state.value;
    return (
      <DateRangePicker
        title="请选择时间范围"
        value={this.state.value}
        onOk={this.onDateRangePickerConfirm}
      >
        <View>
          <Text>请选择时间范围：</Text>
          <Text>
            {format(startDate, 'YYYY/MM/DD HH:mm')} 至{' '}
            {format(endDate, 'YYYY/MM/DD HH:mm')}
          </Text>
        </View>
      </DateRangePicker>
    );
  }
}

```