import * as React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

import {
  BasePicker,
  IBasePickerListItem,
  IPickerCommonProps,
} from './BasePicker';

export interface IPickerViewProps extends IPickerCommonProps {
  /**
   * 数据源
   */
  data?: IBasePickerListItem[][];

  /**
   * 值, 格式是[value1, value2, value3], 对应数据源的相应级层 value
   */
  value?: Array<number | string>;

  extraTexts?: string[];

  style?: StyleProp<ViewStyle>;

  /**
   * 发生改变时候的回调
   */
  onChange?: (value: IBasePickerListItem[], index: number) => void;
}

export interface IState {}

export class PickerView extends React.Component<IPickerViewProps, IState> {
  static defaultProps = {
    data: [[]],
    value: [],
    extraTexts: [],
  };

  selectedValue: IBasePickerListItem[] = [];

  timer: any = 0; // tslint:disable-line:no-any

  onPickerChange = (item: IBasePickerListItem, pickerIndex: number) => {
    if (!item) {
      return;
    }
    const len = this.selectedValue.length;
    const { data = [] } = this.props;
    const dataLength = data.length;
    this.selectedValue = this.selectedValue.slice(0, Math.min(len, dataLength));
    this.selectedValue[pickerIndex || 0] = item;

    // 值全部拿到的时候再调用 回调
    if (
      this.selectedValue.length === 0 ||
      this.selectedValue.length < data.length
    ) {
      return;
    }

    this.clearTimer();
    /**
     * 防止多次调用onChange
     */
    this.timer = setTimeout(() => {
      if (this.props.onChange) {
        this.props.onChange(this.selectedValue, pickerIndex);
        this.clearTimer();
      }
    }, 50);
  };

  clearTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  UNSAFE_componentWillUnmount() {
    this.clearTimer();
  }

  render() {
    const { data = [], extraTexts = [], onChange, ...other } = this.props;
    let { value = [] } = this.props;
    if (this.selectedValue.length === data.length) {
      value =
        value.length === 0
          ? this.selectedValue.map((v) => v.value)
          : value.slice(0);
    }
    const indexs = this.findeIndexsByValues(value);
    return (
      <View>
        <View style={[styles.pickerViewContainer]}>
          {data.map((colum, index) => {
            let flexNum = 1;
            if (data.length > 4 && index === 0 && extraTexts.length > 0) {
              flexNum = 1.3;
            }
            return (
              <BasePicker
                // tslint:disable-next-line:jsx-no-lambda
                onChange={(item) => this.onPickerChange(item, index)}
                style={[styles.pickerStyle, { flex: flexNum }]}
                activeIndex={indexs[index] || 0}
                data={colum}
                key={index}
                extraText={extraTexts[index]}
                {...other}
              />
            );
          })}
        </View>
      </View>
    );
  }

  /**
   *
   * @param values 通过value 找到 对应的index
   */
  private findeIndexsByValues(values: Array<string | number>): number[] {
    const { data = [] } = this.props;
    const indexs: number[] = [];
    if (data.length !== values.length) {
      return indexs.concat(Array(data.length)).fill(0);
    }
    data.forEach((columData, index) => {
      for (let i = 0; i < columData.length; i++) {
        const item = columData[i];
        if (item.value === values[index]) {
          indexs.push(i);
          break;
        }
      }
    });
    return indexs;
  }
}

const styles = StyleSheet.create({
  pickerViewContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  pickerStyle: {
    flex: 1,
  },
});
