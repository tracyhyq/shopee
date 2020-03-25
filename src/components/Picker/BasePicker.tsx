import * as React from 'react';
import { Component } from 'react';
import {
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { globalStyle } from '@styles/variables';
import { Txt } from '../Txt';

const isiOS = Platform.OS === 'ios';

export interface IPickerCommonProps {
  /**
   * 每一行的高度
   */
  itemHeight?: number;

  /**
   * 选中行的高度
   */
  activeItemHeight?: number;

  /**
   * 可见行数
   */
  visibleRows?: number;
}

export interface IBasePickerProps extends IPickerCommonProps {
  style?: StyleProp<ViewStyle>;

  /**
   * 数据源
   */
  data?: IBasePickerListItem[];

  /**
   * 默认选中第几个
   */
  activeIndex?: number;

  /**
   * 用于展示类似年月日这种单位
   */
  extraText?: string;

  /**
   * 改变选中的回调
   */
  onChange?: (item: IBasePickerListItem, index: number) => void;
}

export interface IBasePickerListItem {
  label: string;
  value: string | number;
  children?: IBasePickerListItem[];

  // tslint:disable-next-line:no-any
  [key: string]: any;
}

export interface IState {
  activeIndex: number;
}

/**
 * BasePicker
 * Picker 的基本实现，封装了基本行为
 */
export class BasePicker extends Component<IBasePickerProps, IState> {
  static defaultProps: IBasePickerProps = {
    data: [],
    itemHeight: 45,
    activeIndex: 0,
    activeItemHeight: 55,
    visibleRows: 3,
  };

  state = {
    activeIndex: this.props.activeIndex || 0,
  };
  /**
   * scrollView instance
   */
  private refScrollView: ScrollView | null = null;
  private timer: any = 0; // tslint:disable-line:no-any
  /**
   * 是不是 scrollTo方法触发了 momentumEnd
   */
  private isMomentumEndByScrollTo: boolean = false;
  /**
   * scrollView 是否已经完成布局
   */
  private isScrollViewReady: boolean = false;
  /**
   * 布局完成后的回调
   */
  private initCallbacks: Array<() => void> = [];
  /**
   * 是否开始拖动
   */
  private startDrag: boolean = false;
  /**
   * 是否开始惯性滚动
   */
  private momentumStart: boolean = false;

  private scrollToIndexTimer: number = 0;

  private changeTimer: any = 0; // tslint:disable-line:no-any

  /**
   * 滚动结束的时候，模拟的
   */
  onScrollEnd = (e: { nativeEvent: { contentOffset: { y: number } } }) => {
    const { itemHeight = 60 } = this.props;
    let y: number = e.nativeEvent.contentOffset.y || 0;
    y = y < 0 ? 0 : y;
    let selectedIndex = Math.round(y / itemHeight);
    if (selectedIndex < 0) {
      selectedIndex = 0;
    }
    const newOffsetY = selectedIndex * itemHeight;
    if (y !== newOffsetY) {
      if (isiOS) {
        this.isMomentumEndByScrollTo = true;
      }
      if (this.refScrollView) {
        this.refScrollView.scrollTo({ y: newOffsetY });
      }
    }
    if (this.state.activeIndex === selectedIndex) {
      return;
    }
    this.setState((state) => {
      return { ...state, activeIndex: selectedIndex };
    }, this.invokeChange);
  };

  /**
   * 渲染每一行
   */
  private renderItem = (item: IBasePickerListItem, index: number) => {
    const { activeItemHeight, itemHeight } = this.props;
    const style: StyleProp<ViewStyle> = {
      height: itemHeight,
    };
    const txtStyle: StyleProp<TextStyle> = {
      fontSize: globalStyle.fontSize.n,
      color: globalStyle.color.normal,
    };

    const isActive = this.state.activeIndex === index;
    let bold = false;

    if (isActive) {
      style.height = activeItemHeight;
      txtStyle.fontSize = globalStyle.fontSize.l;
      txtStyle.fontWeight = globalStyle.fontWeightBold;
      bold = true;
    }

    return (
      <View key={index} style={[styles.pickerItem, style]}>
        <Txt bold={bold} style={txtStyle}>
          <Txt bold={bold} style={[txtStyle, style]}>
            {item.label}
          </Txt>
          <Txt
            bold={bold}
            style={[txtStyle, style, { opacity: 0, color: 'rgba(0, 0, 0, 0)' }]}
          >
            {this.props.extraText}
          </Txt>
        </Txt>
      </View>
    );
  };

  private onMomentumScrollEnd = (
    e?: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    this.momentumStart = false;
    this.clearScrollTimer();
    if (
      !this.isMomentumEndByScrollTo &&
      !this.momentumStart &&
      !this.startDrag
    ) {
      if (e) {
        this.onScrollEnd(e);
      }
    }
  };

  private onMomentumScrollBegin = () => {
    this.momentumStart = true;
    this.clearScrollTimer();
  };

  private onScrollBeginDrag = () => {
    this.startDrag = true;
    if (isiOS) {
      this.isMomentumEndByScrollTo = false;
    }
    this.clearScrollTimer();
  };

  clearScrollTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  clearChangeTimer() {
    if (this.changeTimer) {
      clearTimeout(this.changeTimer);
    }
  }

  clearScrollToIndexTimer() {
    if (this.scrollToIndexTimer) {
      clearTimeout(this.scrollToIndexTimer);
    }
  }

  private onScrollEndDrag = (e?: NativeSyntheticEvent<NativeScrollEvent>) => {
    this.startDrag = false;
    // 不复制的话，e 会被垃圾回收
    if (!e) {
      return;
    }
    const event = {
      nativeEvent: { contentOffset: { y: e.nativeEvent.contentOffset.y } },
    };
    this.clearScrollTimer();
    this.timer = setTimeout(() => {
      if (!this.momentumStart && !this.startDrag) {
        this.onScrollEnd(event);
      }
    }, 50);
  };

  private onScrollViewLayout = () => {
    if (!this.isScrollViewReady) {
      this.isScrollViewReady = true;
      this.initCallbacks.forEach((item) => item());
    }
  };

  componentWillUnmount() {
    this.clearScrollTimer();
    this.clearScrollToIndexTimer();
    this.clearChangeTimer();
  }

  /**
   *
   * @param idx 滚动到指定的行
   */
  public scrollToIndex(idx: number) {
    const { itemHeight = 60 } = this.props;
    if (idx < 0) {
      idx = 0;
    }
    const y = idx * itemHeight;
    this.setState((state) => {
      return { ...state, activeIndex: idx };
    }, this.invokeChange);
    /**
     * 延迟，为了解决scrollTo y:0 的时候，位置可能不对
     */
    this.scrollToIndexTimer = setTimeout(() => {
      if (this.refScrollView) {
        this.refScrollView.scrollTo({ y, animated: false });
      }
    });
  }

  /**
   * 获取当前选中的元素 和索引
   */
  public getSelectedItem() {
    const idx = this.state.activeIndex;
    const { data = [] } = this.props;
    return {
      item: data[idx],
      index: idx,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: IBasePickerProps) {
    const idx = nextProps.activeIndex || 0;
    if (idx !== this.state.activeIndex) {
      this.scrollToIndex(idx);
    } else {
      this.invokeChange();
    }
  }

  invokeChange = () => {
    if (this.props.onChange) {
      this.clearChangeTimer();
      // this.changeTimer = setTimeout(() => {
      const { item, index } = this.getSelectedItem();
      this.props.onChange(item, index);
      // }, 10);
    }
  };

  componentDidMount() {
    const fn = () => {
      this.scrollToIndex(this.props.activeIndex || 0);
    };

    if (Platform.OS === 'ios') {
      fn();
    } else {
      this.initCallbacks.push(fn);
    }
  }

  render() {
    const {
      style,
      itemHeight = 60,
      activeItemHeight = 55,
      visibleRows = 3,
      data = [],
      extraText,
    } = this.props;
    // 容器高度
    const ScrollContainerHeight =
      (visibleRows - 1) * itemHeight + activeItemHeight;
    const paddingHeight = ((visibleRows - 1) / 2) * itemHeight;
    const maxLenItem = data
      .slice(0)
      .sort((a, b) => b.label.length - a.label.length)[0];
    return (
      <View
        style={[
          {
            height: ScrollContainerHeight,
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 1)',
          },
          style,
        ]}
      >
        <ScrollView
          // tslint:disable-next-line:no-any
          ref={(c: any) => (this.refScrollView = c)}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          onMomentumScrollBegin={this.onMomentumScrollBegin}
          onScrollEndDrag={this.onScrollEndDrag}
          onScrollBeginDrag={this.onScrollBeginDrag}
          showsVerticalScrollIndicator={false}
          onLayout={this.onScrollViewLayout}
        >
          <View style={{ height: paddingHeight }} />
          {data.map(this.renderItem)}
          <View style={{ height: paddingHeight }} />
        </ScrollView>
        <View
          pointerEvents="none"
          style={[
            styles.mask,
            {
              height: paddingHeight,
              top: 0,
            },
          ]}
        />
        <View
          pointerEvents="none"
          style={[
            styles.pickerItem,
            styles.labelStyle,
            { top: paddingHeight, bottom: paddingHeight },
          ]}
        >
          <Txt bold style={styles.labelText}>
            <Txt
              bold
              style={[
                styles.labelText,
                { opacity: 0, color: 'rgba(0, 0, 0, 0)' },
              ]}
            >
              {maxLenItem && maxLenItem.label}
            </Txt>
            <Txt bold style={styles.labelText}>
              {extraText}
            </Txt>
          </Txt>
        </View>
        <View
          pointerEvents="none"
          style={[
            styles.mask,
            {
              height: paddingHeight,
              bottom: 0,
              borderTopColor: globalStyle.color.border,
            },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pickerItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  mask: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    left: 0,
    right: 0,
  },

  labelStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
  },

  labelText: {
    fontSize: globalStyle.fontSize.l,
    fontWeight: globalStyle.fontWeightBold,
    color: globalStyle.color.normal,
  },
});
