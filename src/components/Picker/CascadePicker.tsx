import { Component } from 'react';
import * as React from 'react';
import { View } from 'react-native';
// import cityData from './district';
import { arrayTreeFilter } from './helper';
import { IBasePickerListItem, BasePicker } from './BasePicker';
import { PickerView } from './PickerView';

export interface ICascadePickerProps {
  /**
   * 数据源： 类似[{ lable: 'xx', value: '2', children: [] }]
   */
  data?: IBasePickerListItem[];

  /**
   * 默认选中的所在层级的值，注意不是 index
   */
  value?: string[];

  /**
   * 滚动完成的回调
   */
  onChange?: (val?: IBasePickerListItem[]) => void;
}

export interface ICascadePickerState {
  /**
   * BasePicker 需要的数据列表
   */
  data?: IBasePickerListItem[][];
  value?: string[];
  /**
   * BasePicker 需要的索引值
   */
  selectedIndeArr: number[];
}

export class CascadePicker extends Component<
  ICascadePickerProps,
  ICascadePickerState
> {
  static defaultProps: ICascadePickerProps = {
    value: [],
    data: [],
  };

  state: ICascadePickerState = {
    data: [],
    value: this.props.value,
    selectedIndeArr: [],
  };

  refPickers: BasePicker[] = [];

  timer: any = 0; // tslint:disable-line:no-any

  /**
   * 将级联数据扁平化
   * @param data 级联数据
   * @param value 选中的值
   * @return IBasePickerListItem[][]
   */
  private fixData(data: IBasePickerListItem[], value: string[]) {
    const treeChildren = arrayTreeFilter(data, (item, level) => {
      return item.value === value[level];
    });
    const treeData: IBasePickerListItem[][] = [];
    treeData.push(data);
    for (let i = 0; i < treeChildren.length - 1; i++) {
      treeData.push(treeChildren[i].children);
    }
    const values = value.slice(0, treeData.length);
    const selectedIndeArr = this.getDataTreeIndex(treeData, value);
    const lastIndex = treeData.length - 1;
    const lastList = treeData[lastIndex];
    const selectedIndex =
      selectedIndeArr.length > 0
        ? selectedIndeArr[selectedIndeArr.length - 1]
        : 0;
    let selectedItem = lastList[selectedIndex];
    while (selectedItem.children && selectedItem.children.length !== 0) {
      treeData.push(selectedItem.children);
      const firstItem = selectedItem.children[0];
      values.push(String(firstItem.value));
      selectedItem = firstItem;
    }

    return { data: treeData, value: values };
  }

  private onPickerChange = (
    selected?: IBasePickerListItem[],
    idx?: number | null
  ) => {
    const val: string[] = (selected || []).map((item) => String(item.value));
    if (idx !== undefined && idx !== null) {
      const { data, value } = this.fixData(this.props.data || [], val);
      this.setState({ data, value }, () => {
        this.clearChangeTimer();
        this.timer = setTimeout(() => {
          if (typeof this.props.onChange === 'function') {
            this.props.onChange(this.getSelectedValue());
          }
        }, 50);
      });
    }
  };

  UNSAFE_componentWillUnmount() {
    this.clearChangeTimer();
  }

  clearChangeTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  /**
   * 获取选中的值
   */
  private getSelectedValue(): IBasePickerListItem[] {
    const { data = [], value = [] } = this.state;
    const values: IBasePickerListItem[] = [];
    data.forEach((col, index) => {
      col.forEach((item) => {
        if (item.value === value[index]) {
          values.push(item);
        }
      });
    });
    return values;
  }

  /**
   * 根据值获取对应索引
   * @param data
   * @param values
   */
  private getDataTreeIndex(
    data: IBasePickerListItem[][],
    values: string[]
  ): number[] {
    const indexs: number[] = [];
    data.forEach((list: IBasePickerListItem[], idx: number) => {
      list.forEach((item, index) => {
        if (values[idx] === item.value) {
          indexs.push(index);
        }
      });
    });
    return indexs;
  }

  componentDidMount() {
    const { value = [] } = this.props;
    const propsData = this.props.data;
    if (!propsData || !propsData.length) {
      return;
    }
    const { data } = this.fixData(propsData, value);
    this.setState({ data });
  }

  render() {
    const { data = [], value = [] } = this.state;
    return (
      <View>
        <PickerView data={data} value={value} onChange={this.onPickerChange} />
      </View>
    );
  }
}

export default CascadePicker;
