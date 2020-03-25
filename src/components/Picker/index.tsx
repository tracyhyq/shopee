import * as React from 'react';
import { Component } from 'react';
import {
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
  TouchableHighlight,
  GestureResponderEvent,
  TouchableHighlightProperties,
} from 'react-native';
import { IPickerCommonProps, IBasePickerListItem } from './BasePicker';
import { PickerView } from './PickerView';
import { globalStyle } from '@styles/variables';
import { CascadePicker } from './CascadePicker';
import { Overlay, OverlayPullView } from '../Overlay';
import { PickerHeader } from './PickerHeader';

export interface IPickerProps extends IPickerCommonProps {
  style?: StyleProp<ViewStyle>;
  /**
   * 是否可见
   */
  visible?: boolean;

  /**
   * 数据源：
   * 一个二维数组, [[ { label: '北京‘, value: 'beijing', xxx: 'x' } ]]
   * 如果开启级联的话，那么数据结构需要是[{ label: 'dd', value: 'xxx', children: [] }] Item必须要有label 和 value属性属性
   */
  data?: IBasePickerListItem[][] | IBasePickerListItem[];

  /**
   * 发生改变时候的回调
   */
  onOk?: (val: IBasePickerListItem[]) => void;

  /**
   * 是否级联，默认false
   */
  cascade?: boolean;

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
   * 选中的值，对应层级
   */
  value?: Array<string | number>;

  onClose?: () => void;

  overlayClosable?: boolean;

  onPress?: (event?: GestureResponderEvent) => void;

  touchableProps?: TouchableHighlightProperties;
}

/**
 * Picker
 */
export class Picker extends Component<IPickerProps> {
  static defaultProps = {
    visible: false,
  };

  overlayKey: number | null = null;

  selectedValue: IBasePickerListItem[] = [];

  isShow: boolean = false;

  pickerChange = (v: IBasePickerListItem[]) => {
    this.selectedValue = v;
  };

  onOk = () => {
    if (this.props.onOk) {
      this.props.onOk(this.selectedValue);
    }
    this.hide();
  };

  onCancel = () => {
    this.hide();
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
      cascade,
      onOk,
      data,
      visible,
      okText,
      cancelText,
      title,
      onClose,
      overlayClosable,
      ...other
    } = this.props;
    // tslint:disable-next-line:no-any
    let PickerComp: any = PickerView;
    if (cascade) {
      PickerComp = CascadePicker;
    }
    const actionView = (
      <OverlayPullView
        animated
        overlayClosable={overlayClosable}
        onClose={this.onClose}
      >
        <View style={[styles.pickerContainer]}>
          <PickerHeader
            title={this.props.title}
            okText={this.props.okText}
            cancelText={this.props.cancelText}
            onCancel={this.onCancel}
            onConfirm={this.onOk}
          />
          <View style={{ padding: 15 }}>
            <PickerComp data={data} onChange={this.pickerChange} {...other} />
          </View>
        </View>
      </OverlayPullView>
    );
    this.overlayKey = Overlay.show(actionView);
  };

  hide = () => {
    Overlay.hide(this.overlayKey);
    this.overlayKey = null;
  };

  onPress = (event: GestureResponderEvent) => {
    this.show();
    if (this.props.onPress) {
      this.props.onPress(event);
    }
  };

  componentWillReceiveProps(nexProps: IPickerProps) {
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
  header: {
    height: 51,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: globalStyle.px1,
    borderBottomColor: globalStyle.color.border,
  },
  headerItem: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: globalStyle.fontSize.n,
    color: globalStyle.color.normal,
  },
});
