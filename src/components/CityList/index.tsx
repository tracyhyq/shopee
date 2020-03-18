/**
 * @desc CityList Component
 *    为了列表加载效率，引入了开源组件 LargeList 
 *    LargeList 组件接入指南：
 *    https://bolan9999.github.io/react-native-largelist/#/zh-cn/V3/GettingStart
 * @author heyanqiu
 * @date 2020-3-16
 */

import * as React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle
} from 'react-native';
import { LargeList, IndexPath } from "react-native-largelist-v3";
import { ICity, ICityList } from '@I/home';
import { globalStyle } from '../style';

export interface ICityListProps {
  data: ICityList[];
  onCityPress?: (city: ICity) => void;
  style?: StyleProp<ViewStyle>;
}

interface ICityListState {
}

const { height } =  Dimensions.get('window');
const sectionHeight = 60;
const rowHeight = 48;

export default class CityList extends React.Component<ICityListProps, ICityListState> {
  sectionsHeight: number[] = [];

  letters: string[] = [];

  private $largeList = React.createRef<LargeList>();

  constructor(props: ICityListProps) {
    super(props);

    this.sectionsHeight = this._gotTotalHeightArray();
    this.letters = this._gotLettersArray();
  }

  /**
   * 获取每个字母区域的高度
   */
  _gotTotalHeightArray = () => {
    const { data } = this.props;
    const totalArray: number[] = [];

    data.map((section) => {
      const eachHeight = rowHeight * (section.items.length + 1);
      totalArray.push(eachHeight);
    });
    return totalArray;
  }

  /**
   * 获取字母列表头
   */
  _gotLettersArray = () => {
    const { data } = this.props;
    const lettersArray: string[] = [];
    
    data.map((item) => {
      lettersArray.push(item.sortLetter);
    });
    return lettersArray; 
  }

  /**
   * 点击每个城市的回调
   */
  selectCity = (city: ICity) => {
    const { onCityPress } = this.props;
    onCityPress && onCityPress(city);
  }

  /**
   * 点击右侧字母滑动到相应位置
   */
  scrollToList = (index: number) => {
    let position = 0;
    for (let i = 0; i < index; i++) {
      position += this.sectionsHeight[i];
    }

    if (this.$largeList.current) {
      this.$largeList.current.scrollTo({ x: 0, y: position});
    }
  }

  /**
   * 右侧索引render
   */
  _renderSideSectionView = () => {
    const { data } = this.props;
    const sectionItem = data.map((item, index) => {
      return (
        <Text 
          onPress={() => this.scrollToList(index)}
          key={`${item.sortLetter}_${index}`}
          style={styles.rightSideText}
        >
          {item.sortLetter}
        </Text>
      );
    });

    return (
      <View style={styles.rightSlideArea}>
        {sectionItem}
      </View>
    );
  }

  /**
   * 渲染字母 section
   */
  _renderSection = (sectionIndex: number) => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionText}>
          {this.letters[sectionIndex]}
        </Text>
      </View>
    );
  }

  /**
   * 渲染城市 item 
   */
  _renderIndexPath = (indexPath: IndexPath) => {
    const { data } = this.props;
    const section = data[indexPath.section];
    const city = section.items[indexPath.row];

    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => {this.selectCity(city);}}
      >
        <View style={styles.cityTextBox}>
          <Text style={styles.cityTextStyle}>{city.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _renderEmpty = () => {
    return (
      <View style={styles.empty}>
        <Text>No results found</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.listContainner}>
        <View style={styles.listContainner}>
          <LargeList
            style={{flex: 1,}}
            data={this.props.data}
            heightForSection={() => sectionHeight}
            renderSection={this._renderSection}
            heightForIndexPath={() => rowHeight}
            renderIndexPath={this._renderIndexPath}
            renderEmpty={this._renderEmpty}
            ref={this.$largeList}
          />
        </View>
        {this._renderSideSectionView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainner: {
    marginBottom: 10,
    flexDirection: "row",
    height
  },
  rightSlideArea: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: 20,
    right: 5,
    top: 0,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#B6B6B6",
    borderRadius: 10
  },
  rightSideText: {
    textAlign: 'center',
    alignItems: 'center',
    color: globalStyle.color.white,
    height: 24,
    lineHeight: 24,
  },
  row: { 
    flexDirection: "row",
    alignItems: "center"
  },
  section: {
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
  },
  sectionText: {
    color: globalStyle.color.weak,
    fontSize: globalStyle.fontSize.l,
    marginLeft: 20,
  },
  cityTextBox: {
    justifyContent: 'center',
    backgroundColor: globalStyle.color.white,
    marginLeft: 20,
  },
  cityTextStyle: {
    color: globalStyle.color.normal,
    fontSize: globalStyle.fontSize.n,
  },
  empty: {
    marginVertical: 20,
    alignSelf: "center"
  },
  line: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: globalStyle.px1,
    backgroundColor: globalStyle.color.border
  }
});
