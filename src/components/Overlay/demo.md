<!--
 * @description: 
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-18 10:49:11
 -->

## demo 使用规则

```javascript
import * as React from 'react';
import { Component } from 'react';
import { Slider, StyleSheet, Switch, View, TextInput } from 'react-native';
import { Overlay, OverlayPullView, OverlayView } from '../index';
import { globalStyle } from '../../style';
import { Button } from '../../Button';
import { Txt } from '../../Txt';
// tslint:disable: jsx-no-lambda
// tslint:disable: no-console
// tslint:disable: no-any

export class Default extends Component {
  refOverlayView: OverlayView | null = null;
  state = {
    opacity: 0.5,
    animated: true,
    overlayClosable: true,
  };
  elKey: any;
  onClose = () => {
    alert('弹层关闭了');
  };
  showOverlay = () => {
    const overlayView = (
      <OverlayView
        animated={this.state.animated}
        overlayOpacity={this.state.opacity}
        overlayClosable={this.state.overlayClosable}
        onClose={this.onClose}
        style={styles.overlayView}
        ref={(c) => c}
      >
        <View style={styles.overlayContent}>
          <Txt
            style={{
              color: globalStyle.color.tint,
              fontSize: globalStyle.fontSize.l,
            }}
          >
            Hello world
          </Txt>
          <TextInput />
          <Button title="手动关闭" onPress={this.close} />
        </View>
      </OverlayView>
    );

    this.elKey = Overlay.show(overlayView);
  };

  close = () => {
    Overlay.hide(this.elKey);
  };

  render() {
    return (
      <View>
        <Button title="显示浮层" onPress={this.showOverlay} />
        <View style={{ marginTop: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
          <View style={styles.optionStyle}>
            <Txt>动画：</Txt>
            <Switch
              onValueChange={(v) => this.setState({ animated: v })}
              value={this.state.animated}
            />
          </View>
          <View style={styles.optionStyle}>
            <Txt>透明度：</Txt>
            <Slider
              minimumValue={0}
              maximumValue={1}
              step={0.1}
              value={this.state.opacity}
              onValueChange={(v) => this.setState({ opacity: v })}
            />
          </View>
          <View style={styles.optionStyle}>
            <Txt>弹层是否可关闭：</Txt>
            <Switch
              onValueChange={(v) => this.setState({ overlayClosable: v })}
              value={this.state.overlayClosable}
            />
          </View>
        </View>
      </View>
    );
  }
}

export class ShowPullView extends Component {
  static doc = `
显示 从下向上出现的View
  `;

  refOverlayPullView: OverlayPullView | null = null;

  showPullView = () => {
    const overlayView = (
      <Overlay.PullView animated ref={(c) => (this.refOverlayPullView = c)}>
        <View style={styles.pullBottom}>
          <Txt
            style={{
              color: globalStyle.color.tint,
              fontSize: globalStyle.fontSize.l,
            }}
          >
            Hello world
          </Txt>
          <Button title="手动关闭" onPress={this.close} />
        </View>
      </Overlay.PullView>
    );
    Overlay.show(overlayView);
  };

  close = () => {
    if (this.refOverlayPullView) {
      this.refOverlayPullView.close();
    }
  };

  render() {
    return (
      <View>
        <Button title="显示向上弹出层" onPress={this.showPullView} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlayView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayContent: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  pullBottom: {
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    height: 300,
    width: globalStyle.window.width,
  },
  optionStyle: {
    marginRight: 5,
    marginTop: 5,
  },
});
```