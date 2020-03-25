import * as React from 'react';
import { Component } from 'react';
import {
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { globalStyle } from '@styles/variables';
import { Txt } from '../Txt';

export interface IPickerHeaderProps {
  style?: StyleProp<ViewStyle>;

  /**
   * 确认按钮的文字
   */
  okText?: string;

  /**
   * 标题
   */
  title?: string;

  /**
   * 取消按钮的文字
   */
  cancelText?: string;

  /**
   * 点击确认按钮的回调
   */
  onConfirm?: () => void;

  onCancel?: () => void;
}
export interface IPickerHeaderState {}

export class PickerHeader extends Component<
  IPickerHeaderProps,
  IPickerHeaderState
> {
  static defaultProps: IPickerHeaderProps = {
    okText: '确认',
    title: '',
    cancelText: '取消',
  };
  render() {
    const { cancelText, okText, title, style } = this.props;
    return (
      <View style={[styles.header, style]}>
        <TouchableHighlight
          underlayColor={globalStyle.color.pressNormal}
          style={[styles.headerItem]}
          onPress={this.props.onCancel}
        >
          <Txt
            style={[
              styles.txt,
              { textAlign: 'left', color: globalStyle.color.tint },
            ]}
          >
            {cancelText}
          </Txt>
        </TouchableHighlight>
        <View style={[styles.headerItem, styles.headerTitle]}>
          <Txt style={[styles.txt, { textAlign: 'center' }]}>{title}</Txt>
        </View>
        <TouchableHighlight
          underlayColor={globalStyle.color.pressNormal}
          style={[styles.headerItem]}
          onPress={this.props.onConfirm}
        >
          <Txt
            style={[
              styles.txt,
              { textAlign: 'right', color: globalStyle.color.tint },
            ]}
          >
            {okText}
          </Txt>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: globalStyle.px1,
    overflow: 'hidden',
    borderBottomColor: globalStyle.color.border,
  },
  headerItem: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
  },
  txt: {
    fontSize: globalStyle.fontSize.n,
    color: globalStyle.color.normal,
  },
});
