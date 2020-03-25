import * as React from 'react';
import { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  GestureResponderEvent,
  TouchableHighlightProperties,
} from 'react-native';
import { globalStyle } from '@styles/variables';
import { getTime, format } from 'date-fns';
import { toast } from '../Toast';
import { PickerHeader } from '../Picker/PickerHeader';
import {
  DateRangePickerView,
  IDateRangePropsCommon,
} from './DateRangePickerView';
import { Overlay, OverlayPullView } from '../Overlay';

export interface IDateRangePickerProps extends IDateRangePropsCommon {
  /**
   * 是否可见
   */
  visible?: boolean;

  /**
   * 弹窗标题
   */
  title?: string;

  /**
   * 取消按钮的文字
   */
  cancelText?: string;

  /**
   * 确定按钮的文字
   */
  confirmText?: string;

  /**
   * 开始日期的最小时间
   */
  startMinDate?: Date;

  /**
   * 开始日期的最大时间
   */
  startMaxDate?: Date;

  /**
   * 结束日期的最小时间
   */
  endMinDate?: Date;

  /**
   * 结束日期的最大时间
   */
  endMaxDate?: Date;

  overlayClosable?: boolean;

  touchableProps?: TouchableHighlightProperties;

  /**
   * 点击确定时候的回调，参数是选中的日期字符串
   */
  onOk?: (v: string[]) => Promise<any> | void; // tslint:disable-line:no-any
  onPress?: (event?: GestureResponderEvent) => void;
  onClose?: () => void;
}

export interface IDateRangePickerState {}

/**
 * DateRangePicker
 */
export class DateRangePicker extends Component<
  IDateRangePickerProps,
  IDateRangePickerState
> {
  static defaultProps = {
    mode: 'datetime',
  };

  selectedDateRange: string[] = [];
  overlayKey: number | null = null;
  isShow: boolean = false;

  handleOk = async () => {
    let [startTime, endTime] = this.selectedDateRange;

    let FORMAT = 'yyyy/MM/dd';
    if (this.props.mode === 'datetime') {
      FORMAT = 'yyyy/MM/dd HH:mm';
    }
    startTime = format(new Date(startTime), FORMAT);
    endTime = format(new Date(endTime), FORMAT);

    if (getTime(new Date(startTime)) > getTime(new Date(endTime))) {
      toast('结束日期不能小于开始日期');
      return;
    }
    if (typeof this.props.onOk === 'function') {
      await this.props.onOk([startTime, endTime]);
    }

    this.hide();
  };

  hide = () => {
    Overlay.hide(this.overlayKey);
    this.overlayKey = null;
    this.isShow = false;
  };

  onPress = (event: GestureResponderEvent) => {
    this.show();
    if (this.props.onPress) {
      this.props.onPress(event);
    }
  };

  UNSAFE_componentWillReceiveProps(nexProps: IDateRangePickerProps) {
    const { visible } = nexProps;
    if (visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  componentDidMount() {
    if (this.props.visible) {
      this.show();
    }
  }

  onCancel = () => {
    this.hide();
  };

  private onValueChange = (date: string[]) => {
    this.selectedDateRange = date;
  };

  private onClose = () => {
    this.isShow = false;
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  show = () => {
    if (this.isShow) {
      return;
    }

    this.isShow = true;
    const {
      onOk,
      confirmText,
      cancelText,
      title,
      onClose,
      children,
      overlayClosable,
      ...other
    } = this.props;
    const actionView = (
      <OverlayPullView
        animated
        overlayClosable={overlayClosable}
        onClose={this.onClose}
      >
        <View style={[styles.pickerContainer]}>
          <PickerHeader
            okText={confirmText}
            cancelText={cancelText}
            title={title}
            onConfirm={this.handleOk}
            onCancel={this.onCancel}
          />
          <DateRangePickerView onValueChange={this.onValueChange} {...other} />
        </View>
      </OverlayPullView>
    );
    this.overlayKey = Overlay.show(actionView);
  };

  render() {
    return this.props.children ? (
      <TouchableHighlight
        onPress={this.onPress}
        underlayColor={globalStyle.color.pressNormal}
        {...this.props.touchableProps}
      >
        {this.props.children}
      </TouchableHighlight>
    ) : null;
  }
}

const styles = StyleSheet.create({
  pickerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
