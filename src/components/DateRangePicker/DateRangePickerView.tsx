import * as React from 'react';
import { Component } from 'react';
import {
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { globalStyle } from '@styles/variables';
import { format } from 'date-fns';
import { DatePickerView } from '../DatePickerView';
import { StaticRender } from '../Picker/StaticRender';
import { Txt } from '../Txt';

export interface IDateRangePropsCommon {
  /**
   * 最小可选日期
   */
  minDate?: Date;

  /**
   * 最大可选日期
   */
  maxDate?: Date;

  /**
   * 分钟数步长， 默认 1
   */
  minuteStep?: number;

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

  value?: Date[];

  mode?: 'date' | 'datetime';
  style?: StyleProp<ViewStyle>;
}

export interface IDateRangePickerViewProps extends IDateRangePropsCommon {
  /**
   * 关闭的回调
   */
  onValueChange?: (date: string[]) => void;
}

export interface IDateRangePickerViewState {
  currentTab: TabItem;
}

export enum TabItem {
  START = 0,
  END = 1,
}

/**
 * DateRangePicker
 */
export class DateRangePickerView extends Component<
  IDateRangePickerViewProps,
  IDateRangePickerViewState
> {
  static defaultProps: IDateRangePickerViewProps = {
    mode: 'datetime',
  };

  state = {
    display: false,
    currentTab: TabItem.START,
  };

  /**
   * 当前选中的值
   */
  selectedStartValue: string = '';
  selectedEndValue: string = '';

  changeTab = (tab: TabItem) => {
    this.setState({ currentTab: tab });
  };

  onStartPickerChange = (value: string) => {
    this.selectedStartValue = value;
    if (this.props.onValueChange) {
      const startTime = this.selectedStartValue;
      const endTime = this.selectedEndValue;
      this.props.onValueChange([startTime, endTime]);
    }
    // this.setState({});
    this.forceUpdate();
  };

  onEndPickerChange = (value: string) => {
    this.selectedEndValue = value;
    if (this.props.onValueChange) {
      const startTime = this.selectedStartValue;
      const endTime = this.selectedEndValue;
      this.props.onValueChange([startTime, endTime]);
    }
    // this.setState({});
    this.forceUpdate();
  };

  render() {
    const {
      style,
      value = [],
      startMaxDate,
      startMinDate,
      endMaxDate,
      endMinDate,
      ...otherProps
    } = this.props;
    const { currentTab } = this.state;
    const [startTime, endTime] = value;
    let FORMAT = 'yyyy/MM/dd';
    if (this.props.mode === 'datetime') {
      FORMAT = 'yyyy/MM/dd HH:mm';
    }

    const startValue =
      (this.selectedStartValue && format(new Date(this.selectedStartValue), FORMAT)) || startTime;
    const endValue =
      (this.selectedEndValue && format(new Date(this.selectedEndValue), FORMAT)) || endTime;
    return (
      <View style={style}>
        <View>
          <View style={[styles.tabContainer]}>
            <TouchableOpacity
              style={[styles.tabItem]}
              // tslint:disable-next-line:jsx-no-lambda
              onPress={() => this.changeTab(TabItem.START)}
            >
              <View
                style={[
                  styles.tabTextItem,
                  currentTab === TabItem.START
                    ? styles.activeTabTextItem
                    : null,
                ]}
              >
                <Txt
                  style={[
                    styles.tabTxt,
                    currentTab === TabItem.START ? styles.activeTxt : null,
                  ]}
                >
                  {format(new Date(startValue), FORMAT)}
                </Txt>
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: 21,
                height: 1,
                backgroundColor: '#d8d8d8',
              }}
            />
            <TouchableOpacity
              style={[styles.tabItem]}
              // tslint:disable-next-line:jsx-no-lambda
              onPress={() => this.changeTab(TabItem.END)}
            >
              <View
                style={[
                  styles.tabTextItem,
                  currentTab === TabItem.END ? styles.activeTabTextItem : null,
                ]}
              >
                <Txt
                  style={[
                    styles.tabTxt,
                    currentTab === TabItem.END ? styles.activeTxt : null,
                  ]}
                >
                  {format(new Date(endValue), FORMAT)}
                </Txt>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.pickerContainer}>
            <View
              style={[
                styles.pickerContent,
                { top: currentTab === TabItem.START ? 0 : -145 },
              ]}
            >
              <StaticRender>
                <DatePickerView
                  onChange={this.onStartPickerChange}
                  value={new Date(startValue)}
                  minDate={startMinDate}
                  maxDate={startMaxDate}
                  {...otherProps}
                />
              </StaticRender>
            </View>
            <View
              style={[
                styles.pickerContent,
                { top: currentTab === TabItem.END ? -145 : 0 },
              ]}
            >
              <StaticRender>
                <DatePickerView
                  onChange={this.onEndPickerChange}
                  value={new Date(endValue)}
                  minDate={endMinDate}
                  maxDate={endMaxDate}
                  {...otherProps}
                />
              </StaticRender>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 15,
    height: 60,
    paddingTop: 15,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  pickerContainer: {
    height: 145,
    overflow: 'hidden',
    // ⚠️ android 系统下面，需要设置zIndex值才能使 overflow： hidden 生效
    zIndex: 10,
    marginBottom: 15,
    paddingRight: 15,
    paddingLeft: 15,
  },
  pickerContent: {},
  activeTabTextItem: {
    borderBottomColor: globalStyle.color.tint,
  },
  tabTextItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0)',
    paddingBottom: 1,
  },
  tabTxt: {
    fontSize: 16,
    fontWeight: globalStyle.fontWeightBold,
    color: globalStyle.color.normal,
  },
  activeTxt: {
    color: globalStyle.color.tint,
  },
});
