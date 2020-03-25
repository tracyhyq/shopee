<!--
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-25 10:57:39
 -->

## demo 使用规范

```javascript
import * as React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import { BasePicker } from '../BasePicker';
import { PickerView } from '../PickerView';
import { CascadePicker } from '../CascadePicker';
import { Picker } from '../index';
import { Button } from '../../Button';
import { CityData } from './district';
import { Txt } from '../../Txt';
// const isiOS = Platform.OS === 'ios';
// tslint:disable: jsx-no-lambda
// tslint:disable: no-console
// tslint:disable: no-any

export class PupPicker extends Component {
  static doc = `
  Picker 示例
  `;
  state = {
    value: ['450000', '451000', '451027'],
    label: '',
  };

  onOk = (v: any) => {
    const value = v.map((item: any) => item.value);
    const label = v.map((item: any) => item.label).join('/');
    this.setState({ value, label });
  };

  render() {
    return (
      <View>
        <Picker
          data={CityData}
          cascade
          value={this.state.value}
          onOk={this.onOk}
          title={'选择城市'}
        >
          <Txt>{this.state.label || '打开城市选择Picker(级联)'}</Txt>
        </Picker>
      </View>
    );
  }
}

export class Default1 extends Component {
  static doc = `
  Picker 示例
  `;

  state = {
    visible: false,
    value: [3, 5],
  };

  showPicker = () => {
    this.setState({ visible: true });
  };

  onOk = (v: any[] = []) => {
    this.setState({ visible: false, value: v.map((item: any) => item.value) });
  };

  render() {
    const list1 = [];
    for (let i = 0; i < 24; i++) {
      list1.push({ label: `${i < 10 ? '0' + i : i}:00`, value: i });
    }
    const data = [list1, list1];
    return (
      <View>
        <Picker
          onClose={() => {
            alert('onClose');
          }}
          data={data}
          visible={this.state.visible}
          onOk={this.onOk}
          value={this.state.value}
        />
        <Txt>{this.state.value.join('至')}</Txt>
        <Button title="打开Picker" onPress={this.showPicker} />
      </View>
    );
  }
}

export class Default3 extends Component {
  static doc = `
  PickerView 示例
  `;

  render() {
    const list1 = [];
    for (let i = 0; i < 24; i++) {
      list1.push({ label: `${i < 10 ? '0' + i : i}:00`, value: i });
    }
    const data = [list1, list1];
    return (
      <View>
        <PickerView data={data} value={[12, 17]} />
      </View>
    );
  }
}

export class Default extends Component {
  static doc = `
  BasePicker 示例
  `;

  render() {
    const data = Array(20)
      .fill(2)
      .map((_, i) => {
        return { label: '名称' + i, value: i };
      });
    return <BasePicker data={data} />;
  }
}

export class Default2 extends Component {
  static doc = `
  级联选择 示例
  `;

  render() {
    return (
      <CascadePicker data={CityData} value={['450000', '451000', '451027']} />
    );
  }
}
```