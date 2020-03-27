<!--
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-27 13:23:00
 -->

## demo 使用规范

```javascript
import * as React from 'react';
import { Component } from 'react';
import { Loading } from '../index';
import { Button } from '../../Button';
import { Easing, StyleSheet, View } from 'react-native';

export class Default extends Component {
  static doc = `
  Loading 默认效果 type="normal"
  `;

  render() {
    return (
      <View style={{ flexDirection: 'row', backgroundColor: 'gray' }}>
        <Loading style={styles.loading} />
        <Loading
          style={[{ width: 20, height: 20 }, styles.loading]}
          duration={2000}
        />
        <Loading
          style={[{ width: 50, height: 50 }, styles.loading]}
          easing={Easing.ease}
        />
      </View>
    );
  }
}

export class Default4 extends Component {
  static doc = `
  Loading 彩色效果 type="tint"
  `;

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Loading style={styles.loading} type="tint" />
        <Loading
          style={[{ width: 20, height: 20 }, styles.loading]}
          type="tint"
          duration={2000}
        />
        <Loading
          style={[{ width: 50, height: 50 }, styles.loading]}
          type="tint"
          easing={Easing.ease}
        />
      </View>
    );
  }
}

export class Default1 extends Component {
  static doc = `
  默认 loading
  `;

  showLoading = () => {
    const a = Loading.loading('加载中...');
    setTimeout(a, 3000);
  };

  render() {
    return (
      <View>
        <Button title="打开loading, 3秒后消失" onPress={this.showLoading} />
      </View>
    );
  }
}

export class Default5 extends Component {
  static doc = `
  loading， 阻止交互(展示一个透明蒙层)
  `;

  showLoading = () => {
    const a = Loading.loading({ content: '加载中...', mask: true });
    setTimeout(a, 3000);
  };

  render() {
    return (
      <View>
        <Button title="打开loading后不可交互" onPress={this.showLoading} />
      </View>
    );
  }
}

export class Default2 extends Component {
  static doc = `
  蒙层loading
  `;

  showLoading = () => {
    const a = Loading.loading({
      content: '加载中...',
      modal: true,
      mask: false,
    });
    setTimeout(a, 3000);
  };

  render() {
    return (
      <View>
        <Button title="打开弹层loading, 3秒后消失" onPress={this.showLoading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    marginRight: 10,
  },
});

```