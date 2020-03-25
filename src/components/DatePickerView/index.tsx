import * as React from 'react';
import { IBasePickerListItem } from '../Picker/BasePicker';
import { PickerView } from '../Picker/PickerView';
import { format } from 'date-fns';

export type DateMode = 'date' | 'time' | 'datetime' | 'year' | 'month';

export interface IDatePickerViewProps {
  defaultDate?: Date;
  className?: string;

  /**
   * 使用12小时制
   */
  use12Hours?: boolean;
  /**
   * 展示模式
   * 可选的值 'date' | 'time' | 'datetime' | 'year' | 'month'
   */
  mode?: DateMode;

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
   * 日期发生改变的时候调用
   */
  onChange?: (v: string, date?: Date) => void;
}

export interface IdatePickerViewPropsExt extends IDatePickerViewProps {
  /**
   * 当前选中的值
   */
  value?: Date;
}

export interface IDatePickerViewState {
  date?: Date;
}

enum DATE_UNIT {
  year = '年',
  month = '月',
  day = '日',
  hours = '时',
  minutes = '分',
}

const DATETIME = 'datetime';
const DATE = 'date';
const TIME = 'time';
const MONTH = 'month';
const YEAR = 'year';
const ONE_DAY = 24 * 60 * 60 * 1000;

export class DatePickerView extends React.Component<
  IdatePickerViewPropsExt,
  IDatePickerViewState
> {
  static defaultProps: IdatePickerViewPropsExt = {
    mode: DATETIME,
    minuteStep: 1,
    use12Hours: false,
  };

  state = {
    date: this.props.value || this.props.defaultDate,
  };

  defaultMinDate?: Date;
  defaultMaxDate?: Date;

  componentWillReceiveProps(nextProps: IdatePickerViewPropsExt) {
    if ('value' in nextProps) {
      this.setState({
        date: nextProps.value || nextProps.defaultDate,
      });
    }
  }

  getNewDate = (values: string[], index: number) => {
    const value = parseInt(values[index], 10);
    const props = this.props;
    const { mode } = props;
    const newValue = cloneDate(this.getDate());
    if (mode === DATETIME || mode === DATE || mode === YEAR || mode === MONTH) {
      switch (index) {
        case 0:
          newValue.setFullYear(value);
          break;
        case 1:
          setMonth(newValue, value);
          break;
        case 2:
          newValue.setDate(value);
          break;
        case 3:
          this.setHours(newValue, value);
          break;
        case 4:
          newValue.setMinutes(value);
          break;
        case 5:
          this.setAmPm(newValue, value);
          break;
        default:
          break;
      }
    } else if (mode === TIME) {
      switch (index) {
        case 0:
          this.setHours(newValue, value);
          break;
        case 1:
          newValue.setMinutes(value);
          break;
        case 2:
          this.setAmPm(newValue, value);
          break;
        default:
          break;
      }
    }
    return this.clipDate(newValue);
  };

  onValueChange = (values: IBasePickerListItem[], index: number) => {
    const newValue = this.getNewDate(
      values.map((item) => String(item.value)),
      index
    );
    this.setState({
      date: newValue,
    });

    if (this.props.onChange) {
      this.props.onChange(format(newValue, 'YYYY/MM/DD HH:mm:ss'), newValue);
    }
  };

  setHours(date: Date, hour: number) {
    if (this.props.use12Hours) {
      const dh = date.getHours();
      let nhour = dh >= 12 ? hour + 12 : hour;
      nhour = nhour >= 24 ? 0 : nhour; // Make sure no more than one day
      date.setHours(nhour);
    } else {
      date.setHours(hour);
    }
  }

  setAmPm(date: Date, index: number) {
    if (index === 0) {
      date.setTime(+date - ONE_DAY / 2);
    } else {
      date.setTime(+date + ONE_DAY / 2);
    }
  }

  getDefaultMinDate() {
    if (!this.defaultMinDate) {
      this.defaultMinDate = new Date(2000, 1, 1, 0, 0, 0);
    }
    return this.defaultMinDate;
  }

  getDefaultMaxDate() {
    if (!this.defaultMaxDate) {
      this.defaultMaxDate = new Date(2030, 1, 1, 23, 59, 59);
    }
    return this.defaultMaxDate;
  }

  getDate() {
    return this.clipDate(this.state.date || this.getDefaultMinDate());
  }

  getValue() {
    return this.getDate();
  }

  getMinYear() {
    return this.getMinDate().getFullYear();
  }

  getMaxYear() {
    return this.getMaxDate().getFullYear();
  }

  getMinMonth() {
    return this.getMinDate().getMonth();
  }

  getMaxMonth() {
    return this.getMaxDate().getMonth();
  }

  getMinDay() {
    return this.getMinDate().getDate();
  }

  getMaxDay() {
    return this.getMaxDate().getDate();
  }

  getMinHour() {
    return this.getMinDate().getHours();
  }

  getMaxHour() {
    return this.getMaxDate().getHours();
  }

  getMinMinute() {
    return this.getMinDate().getMinutes();
  }

  getMaxMinute() {
    return this.getMaxDate().getMinutes();
  }

  getMinDate() {
    return this.props.minDate || this.getDefaultMinDate();
  }

  getMaxDate() {
    return this.props.maxDate || this.getDefaultMaxDate();
  }

  getDateData() {
    const { mode } = this.props;
    const date = this.getDate();
    const selYear = date.getFullYear();
    const selMonth = date.getMonth();
    const minDateYear = this.getMinYear();
    const maxDateYear = this.getMaxYear();
    const minDateMonth = this.getMinMonth();
    const maxDateMonth = this.getMaxMonth();
    const minDateDay = this.getMinDay();
    const maxDateDay = this.getMaxDay();
    const years: IBasePickerListItem[] = [];
    for (let i = minDateYear; i <= maxDateYear; i++) {
      years.push({
        value: i + '',
        label: i + '',
      });
    }
    const yearCol = { key: 'year', props: { children: years } };
    if (mode === YEAR) {
      return [yearCol];
    }

    const months: IBasePickerListItem[] = [];
    let minMonth = 0;
    let maxMonth = 11;
    if (minDateYear === selYear) {
      minMonth = minDateMonth;
    }
    if (maxDateYear === selYear) {
      maxMonth = maxDateMonth;
    }
    for (let i = minMonth; i <= maxMonth; i++) {
      const label = pad(i + 1 + '');
      months.push({
        value: i + '',
        label,
      });
    }
    const monthCol = { key: 'month', props: { children: months } };
    if (mode === MONTH) {
      return [yearCol, monthCol];
    }

    const days: IBasePickerListItem[] = [];
    let minDay = 1;
    let maxDay = getDaysInMonth(date);

    if (minDateYear === selYear && minDateMonth === selMonth) {
      minDay = minDateDay;
    }
    if (maxDateYear === selYear && maxDateMonth === selMonth) {
      maxDay = maxDateDay;
    }
    for (let i = minDay; i <= maxDay; i++) {
      const label = pad(i + '');
      days.push({
        value: i + '',
        label,
      });
    }
    return [yearCol, monthCol, { key: 'day', props: { children: days } }];
  }

  getDisplayHour(rawHour: number) {
    if (this.props.use12Hours) {
      if (rawHour === 0) {
        rawHour = 12;
      }
      if (rawHour > 12) {
        rawHour -= 12;
      }
      return rawHour;
    }
    return rawHour;
  }

  getTimeData(date: Date) {
    let minHour = 0;
    let maxHour = 23;
    let minMinute = 0;
    let maxMinute = 59;
    const { mode, minuteStep, use12Hours } = this.props;
    const minDateMinute = this.getMinMinute();
    const maxDateMinute = this.getMaxMinute();
    const minDateHour = this.getMinHour();
    const maxDateHour = this.getMaxHour();
    const hour = date.getHours();
    if (mode === DATETIME) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const minDateYear = this.getMinYear();
      const maxDateYear = this.getMaxYear();
      const minDateMonth = this.getMinMonth();
      const maxDateMonth = this.getMaxMonth();
      const minDateDay = this.getMinDay();
      const maxDateDay = this.getMaxDay();
      if (
        minDateYear === year &&
        minDateMonth === month &&
        minDateDay === day
      ) {
        minHour = minDateHour;
        if (minDateHour === hour) {
          minMinute = minDateMinute;
        }
      }
      if (
        maxDateYear === year &&
        maxDateMonth === month &&
        maxDateDay === day
      ) {
        maxHour = maxDateHour;
        if (maxDateHour === hour) {
          maxMinute = maxDateMinute;
        }
      }
    } else {
      minHour = minDateHour;
      if (minDateHour === hour) {
        minMinute = minDateMinute;
      }
      maxHour = maxDateHour;
      if (maxDateHour === hour) {
        maxMinute = maxDateMinute;
      }
    }

    const hours: IBasePickerListItem[] = [];
    if ((minHour === 0 && maxHour === 0) || (minHour !== 0 && maxHour !== 0)) {
      minHour = this.getDisplayHour(minHour);
    } else if (minHour === 0 && use12Hours) {
      minHour = 1;
      hours.push({ value: '0', label: '12' });
    }
    maxHour = this.getDisplayHour(maxHour);
    for (let i = minHour; i <= maxHour; i++) {
      hours.push({
        value: i + '',
        label: pad(i),
      });
    }

    const minutes: IBasePickerListItem[] = [];
    const selMinute = date.getMinutes();
    for (let i = minMinute; i <= maxMinute; i += minuteStep!) {
      minutes.push({
        value: i + '',
        label: pad(i),
      });
      if (selMinute > i && selMinute < i + minuteStep!) {
        minutes.push({
          value: selMinute + '',
          label: pad(selMinute),
        });
      }
    }
    const cols = [
      { key: 'hours', props: { children: hours } },
      { key: 'minutes', props: { children: minutes } },
    ].concat(
      use12Hours
        ? [
            {
              key: 'ampm',
              props: {
                children: [
                  { value: '0', label: '上午' },
                  { value: '1', label: '下午' },
                ],
              },
            },
          ]
        : []
    );
    return { cols, selMinute };
  }

  clipDate(date: Date) {
    const { mode } = this.props;
    const minDate = this.getMinDate();
    const maxDate = this.getMaxDate();
    if (mode === DATETIME) {
      if (date < minDate) {
        return cloneDate(minDate);
      }
      if (date > maxDate) {
        return cloneDate(maxDate);
      }
    } else if (mode === DATE || mode === YEAR || mode === MONTH) {
      if (+date + ONE_DAY <= +minDate) {
        return cloneDate(minDate);
      }
      if (+date >= +maxDate) {
        return cloneDate(maxDate);
      }
    } else if (mode === TIME) {
      const maxHour = maxDate.getHours();
      const maxMinutes = maxDate.getMinutes();
      const minHour = minDate.getHours();
      const minMinutes = minDate.getMinutes();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      if (hour < minHour || (hour === minHour && minutes < minMinutes)) {
        return cloneDate(minDate);
      }
      if (hour > maxHour || (hour === maxHour && minutes > maxMinutes)) {
        return cloneDate(maxDate);
      }
    }
    return date;
  }

  getValueCols() {
    const { mode, use12Hours } = this.props;
    const date = this.getDate();
    let cols: Array<{
      key: string;
      props: {
        children: IBasePickerListItem[];
      };
    }> = [];
    let value: string[] = [];

    if (mode === YEAR) {
      return {
        cols: this.getDateData(),
        value: [date.getFullYear() + ''],
      };
    }

    if (mode === MONTH) {
      return {
        cols: this.getDateData(),
        value: [date.getFullYear() + '', date.getMonth() + ''],
      };
    }

    if (mode === DATETIME || mode === DATE) {
      cols = this.getDateData();
      value = [
        date.getFullYear() + '',
        date.getMonth() + '',
        date.getDate() + '',
      ];
    }

    if (mode === DATETIME || mode === TIME) {
      const time = this.getTimeData(date);
      cols = cols.concat(time.cols);
      const hour = date.getHours();
      let dtValue = [hour + '', time.selMinute + ''];
      let nhour;
      if (use12Hours) {
        nhour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        dtValue = [nhour + '', time.selMinute + '', (hour >= 12 ? 1 : 0) + ''];
      }
      value = value.concat(dtValue);
    }
    return {
      value,
      cols,
    };
  }

  render() {
    const { value, cols } = this.getValueCols();
    const data = cols.map((col) => col.props.children);
    // const selectedValue = findDataIndexs(data, value);
    return (
      <PickerView
        data={data}
        onChange={this.onValueChange}
        value={value}
        extraTexts={cols.map((col) => {
          // tslint:disable-next-line:no-any
          const key: keyof typeof DATE_UNIT = col.key as any;
          return DATE_UNIT[key];
        })}
      />
    );
  }
}

export default DatePickerView;

function getDaysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function pad(n: number | string) {
  return n < 10 ? `0${n}` : n + '';
}

function cloneDate(date: Date) {
  return new Date(+date);
}

function setMonth(date: Date, month: number) {
  date.setDate(
    Math.min(
      date.getDate(),
      getDaysInMonth(new Date(date.getFullYear(), month))
    )
  );
  date.setMonth(month);
}
