/**
 * @desc search and list page
 *       对于无限下来列表的优化，对比了 RN 官方的ScrollView、Flatlist、SectionList
 *       发现都还有优化的空间，最终选择了 recyclerlistview ，使用详情如下：
 *       https://github.com/Flipkart/recyclerlistview 
 * @author heyanqiu 
 * @date 2020-3-24
 */
import * as React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";
import { NavigationDrawerProp } from 'react-navigation-drawer';
import LogoTitle from '@components/Navigator/headerTitle';
import HeaderRight from '@components/Navigator/headerRight';
import HeaderLeft from '@components/Navigator/headerLeft';
import searchStore from './store';
import { observer } from 'mobx-react';
import { IEvent } from '@I/search';
import styles from './style';
import EventItem from './EventItem';

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2
};

interface Props {
  navigation: NavigationDrawerProp<{}>;
}

interface State {
  clearFilter: boolean;
}

const { width } = Dimensions.get("window");

@observer
export default class Search extends React.Component<Props, State> {

  static navigationOptions = ({ navigation }) => {
    const navi = navigation;
    return {
      headerTitle: () => <LogoTitle />,
      headerRight: () => <HeaderRight navigation={navi}/>,
      headerLeft: () => <HeaderLeft navigation={navi} type="search" />
    };
  };

  _layoutProvider: LayoutProvider;

  constructor(props: Props) {
    super(props);

    const clearFilter = this.props.navigation.getParam('clearFilter', true);
    this._layoutProvider = new LayoutProvider(
      index => {
        return ViewTypes.FULL;
      },
      (type, dim) => {
        switch (type) {
          case ViewTypes.FULL:
            dim.width = width;
            dim.height = 230; // 设定为210的高度
            break;
          default:
            dim.width = 0;
            dim.height = 0;
        }
      }
    );

    // 重置筛选条件
    if (clearFilter) {
      searchStore.reset();
    }
    this.state = {
      clearFilter
    };
  }

  goDetail = (id: number) => {
    this.props.navigation.navigate('Detail', {
      eventId: id
    });
  }

  async componentDidMount() {
    const { clearFilter } = this.state;
    // 表示从登录页过来，需要重新拉取数据
    if (clearFilter) {
      await searchStore.getEvents();
      searchStore.eventsPool = searchStore.eventsPool.concat(searchStore.events.slice());
    }

    searchStore._dataProvider = searchStore.dataProvider.cloneWithRows(searchStore.eventsPool);
  }

  /**
   * 清除条件，刷新数据
   */
  clearSearch = async () => {
    searchStore.reset();
    await searchStore.getEvents();
    searchStore.eventsPool = searchStore.eventsPool.concat(searchStore.events.slice());
    searchStore._dataProvider = searchStore.dataProvider.cloneWithRows(searchStore.eventsPool);
  }

  lodeMore = async () => {
    if (searchStore.hasMore) {
      searchStore.filter.offset += searchStore.events.length;
      await searchStore.getEvents();
      searchStore.eventsPool = searchStore.eventsPool.concat(searchStore.events.slice());
      searchStore._dataProvider = searchStore.dataProvider.cloneWithRows(searchStore.eventsPool);
    }
  }

  renderFooter = () => {
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {searchStore.hasMore ? 'Loading...' : 'It\'s Bottom ~~'}
        </Text>
      </View>
    );
  }

  _renderItem = (evt: IEvent) => {
    return (
      <View style={styles.itemContainer}>
        <EventItem
          evt={evt}
          onEventPress={this.goDetail}
        />
      </View>
    );
  }

  _rowRenderer = (type: number, data: IEvent) => {
    switch (type) {
      case ViewTypes.FULL:
        return this._renderItem(data);
      default:
        return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          searchStore.resultSearchBar ?
          (
            <View style={styles.filterContainer}>
              <View style={styles.filterBar}>
                <Text style={styles.resultCount}>{searchStore.events.length} Results</Text>
                <TouchableOpacity onPress={this.clearSearch}>
                  <Text style={styles.filterClearBtn}>CLEAR SEARCH</Text>
                </TouchableOpacity>
              </View>
              <Text
                style={styles.filterSubText}
                numberOfLines={2}
                ellipsizeMode='tail'
              >
                {searchStore.searchString}
              </Text>
            </View>
          ) : null
        }
        {
          searchStore.events.length ?
          (
            <View style={styles.listContainer}>
              <RecyclerListView
                layoutProvider={this._layoutProvider}
                dataProvider={searchStore._dataProvider}
                rowRenderer={this._rowRenderer}
                onEndReachedThreshold={20}
                onEndReached={this.lodeMore}
                renderFooter={this.renderFooter}
              />
            </View>
          ) :
          (
            <View style={styles.emptyContainer}>
              <Image
                source={require('@assets/svg/no-activity.svg')}
                style={styles.emptyIcon}
              />
              <Text style={styles.emptyText}>No activity found</Text>
            </View>
          )
        }
      </View>
    );
  }
}
