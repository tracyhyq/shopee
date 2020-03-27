/**
 * @desc Home page
 *       Custom Navigation Drawer / Sidebar
 *       https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/
 * @author heyanqiu
 * @date 2020-3-10
 */

import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { DrawerContentComponentProps, NavigationDrawerProp } from 'react-navigation-drawer';
import { toast } from '@components/Toast';
import { observer } from 'mobx-react';
import searchStore from '../store';
import { getTimeByKey, getEarlyMorning, getLastest } from '@utils/date-util';
import { Channel } from '@I/search';
import { DateRangePicker } from '@components/DateRangePicker';
import { 
  startOfToday,
  endOfToday,
  format,
} from 'date-fns';
import styles from './style';

interface Props extends DrawerContentComponentProps {
  navigation: NavigationDrawerProp<{}>;
}

interface State {
  visible: boolean;
  dateValue: Date[];
}

const dateFilter: {
  [key: string]: string
} = {
  'ANYTIME': 'anytime',
  'TODAY': 'today',
  'TOMORROW': 'tomorrow',
  'THIS WEEK': 'week',
  'THIS MONTH': 'month',
  'LATER': 'later'
};

@observer
export default class SearchFilter extends React.Component<Props, State> {

  state = {
    visible: false,
    dateValue: [
      new Date(format(startOfToday(), 'yyyy/MM/dd')),
      new Date(format(endOfToday(), 'yyyy/MM/dd')),
    ]
  };

  /**
   * 时间filterItem press
   */
  datePress = (dateType: string) => {
    // 防止重复点击
    if (searchStore.dateSelect === dateType) {
      return;
    }
    const res = getTimeByKey(dateType);
    searchStore.dateSelect = dateType;
    searchStore.filter.after = res.after;
    searchStore.filter.before = res.before;
    searchStore.filter.afterText = res.afterText;
    searchStore.filter.beforeText = res.beforeText;
  }

  onDateRangePickerConfirm = (dateArr: string[]) => {
    // 注意⚠️： 在RN 中 Date 构造函数只接受 YYYY/MM/DD HH:mm:ss 格式的日期字符串，而不能接受 YYYY-MM-DD HH:mm:ss
    const [start, end] = dateArr;
    const startDate = new Date(start);
    const endDate = new Date(end);

    this.setState({
      dateValue: [startDate, endDate],
    });

    searchStore.filter.after = getEarlyMorning(startDate) + '';
    searchStore.filter.before = getLastest(endDate) + '';
    searchStore.filter.afterText = format(startDate, 'MM/dd/yyyy');
    searchStore.filter.beforeText = format(endDate, 'MM/dd/yyyy');
  }

  toggleDatePicker = () => {
    this.setState({
      visible: !this.state.visible
    });
  }

  /**
   * 全部channel
   */
  allChannelPress = () => {
    searchStore.filter.channels = [];
  }

  channelPress = (channel: Channel) => {
    const { filter } = searchStore;
    const currentId = channel.id;

    // 已选中的再次点击取消选中
    if (filter.channels) {
      const index = filter.channels.indexOf(currentId);
      if (index > -1) {
        filter.channels.splice(index, 1);
      } else {
        filter.channels.push(currentId);
      }
    }
  }

  async componentDidMount() {
    await searchStore.getChannels();
  }

  /**
   * do Search
   */
  doSearch = async () => {
    if (!searchStore.canSearch) {
      toast('请选择筛选条件!');
      return;
    }

    searchStore.eventsPool = [];
    await searchStore.getEvents();
    searchStore.eventsPool = searchStore.eventsPool.concat(searchStore.events.slice());
    searchStore._dataProvider = searchStore.dataProvider.cloneWithRows([]);
    searchStore.resultSearchBar = true;
    this.props.navigation.toggleDrawer();
  }

  renderRangeDateInput = () => {
    if (searchStore.dateSelect !== 'later') {
      return null;
    }

    return (
      <View style={styles.inputContainer}>
        <TouchableOpacity style={{flex: 1}} onPress={this.toggleDatePicker}>
          <View style={styles.trangle} />
          <View style={styles.input}>
            <Image
              source={require('@assets/svg/date-from.svg')}
              style={styles.inputLogo}
            />
            <Text style={styles.inputText}>{searchStore.filter.afterText}</Text>
            <Image
              source={require('@assets/svg/date-to.svg')}
              style={styles.inputLogo}
            />
            <Text style={styles.op}>-</Text>
            <Text style={styles.inputText}>{searchStore.filter.beforeText}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderDateItems = () => {
    return (
      <View style={styles.itemsContainer}>
        {
          Object.keys(dateFilter).map((key) => {
            const item = dateFilter[key];
            return (
              <TouchableOpacity
                key={key}
                onPress={() => this.datePress(item)}
              >
                <Text
                  style={[
                    styles.item,
                    styles.dateItem,
                    searchStore.dateSelect === item ?
                    styles.active :
                    null
                  ]}
                >
                  {key}
                </Text>
              </TouchableOpacity>
            );
          })
        }
      </View>
    );
  }

  renderChannelItems = () => {
    const { channels } = searchStore;
    return (
      <View style={styles.itemsContainer}>
        <TouchableOpacity
          key={0}
          onPress={() => this.allChannelPress()}
        >
          <Text
            style={[
              styles.item,
              styles.channelItem,
              searchStore.filter.channels.length === 0 ?
              styles.active :
              null
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {
          channels.map((channel, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => this.channelPress(channel)}
              >
                <Text
                  style={[
                    styles.item,
                    styles.channelItem,
                    searchStore.filter.channels
                    && searchStore.filter.channels.indexOf(channel.id) > -1 ?
                    styles.active :
                    null
                  ]}
                >
                  {channel.name}
                </Text>
              </TouchableOpacity>
            );
          })
        }
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <View>
            <Text style={styles.titleText}>DATE</Text>
            <View style={[styles.line, styles.dateLine]}/>
          </View>
          { this.renderDateItems() }
          { this.renderRangeDateInput() }
        </View>
        <View style={styles.channelContainer}>
          <View>
            <Text style={styles.titleText}>CHANNEL</Text>
            <View style={[styles.line, styles.channelLine]}/>
          </View>
          { this.renderChannelItems() }
        </View>
        <View
          style={[
            styles.searchBtn,
            searchStore.canSearch ? styles.searchBtnActive : null
          ]}
        >
          <TouchableOpacity style={styles.pressWrap} onPress={this.doSearch}>
            <Image
              source={require('@assets/svg/search.svg')}
              style={[
                styles.icon,
                searchStore.canSearch ? styles.logoActive : null,
              ]}
            />
            <Text
              style={[
                styles.searchText,
                searchStore.canSearch ? styles.btnActive : null
              ]}
            >
              SEARCH
            </Text>
          </TouchableOpacity>
        </View>
        {
          searchStore.canSearch && searchStore.searchString ?
          (
            <View style={styles.searchSubTextWrap}>
              <Text 
                style={styles.searchSubText}
                numberOfLines={1}
                ellipsizeMode="middle"
              >
                {searchStore.searchString}
              </Text>
            </View>
          ) : null
        }

        <DateRangePicker
          visible={this.state.visible}
          mode="date"
          title="请选择日期范围"
          value={this.state.dateValue}
          onOk={this.onDateRangePickerConfirm}
          onClose={this.toggleDatePicker}
        />
      </View>
    );
  }
}
