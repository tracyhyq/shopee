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
  StyleSheet,
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
import { globalStyle } from '@styles/variables';
import { IEvent } from '@I/search';

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

const { width, height } = Dimensions.get("window");

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
    console.log(id);
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
        <TouchableOpacity onPress={() => this.goDetail(evt.id)}>
          <View style={styles.itemHeader}>
            <View style={styles.leftWrap}>
              <Image
                source={require('@assets/imgs/gmap.png')}
                style={styles.userIcon}
              />
              <Text style={styles.username}>{evt.creator.username}</Text>
            </View>
            <View style={styles.rightWrap}>
              <Text style={styles.channelText}>{evt.channel.name}</Text>
            </View>
          </View>
          <View style={styles.itemBody}>
            <View 
              style={[
                styles.bodyLeft,
                {
                  width: evt.images && evt.images.length ? '80%' : '100%'
                }
              ]}
            >
              <Text
                style={styles.title}
                numberOfLines={2}
                ellipsizeMode='tail'
              >
                {evt.name}
              </Text>
              <View style={styles.timeBar}>
                <Image
                  source={require('@assets/svg/time.svg')}
                  style={styles.timeIcon}
                />
                <Text style={styles.timeText}>
                  {evt.begin_time} - {evt.end_time}
                </Text>
              </View>
              <Text
                style={styles.content}
                numberOfLines={3}
                ellipsizeMode='tail'
              >
                {evt.description}
              </Text>
              <View style={styles.likesBar}>
                <Image
                  source={require('@assets/svg/check-outline.svg')}
                  style={styles.likeBarIcon}
                />
                <Text style={[styles.likeBarText, styles.likeText]}>
                  {evt.goings_count} Going
                </Text>
                <Image
                  source={require('@assets/svg/like-outline.svg')}
                  style={styles.likeBarIcon}
                />
                <Text style={styles.likeBarText}>
                  {evt.likes_count} Likes
                </Text>
              </View>
            </View>
            {
              evt.images && evt.images.length ?
              (
                <View style={styles.bodyRight}>
                  <Image
                    source={require('@assets/imgs/gmap.png')}
                    style={styles.eventImg}
                  />
                </View>
              ) : null
            }
          </View>
        </TouchableOpacity>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    backgroundColor: globalStyle.color.white,
    minHeight: height,
    minWidth: width
  },
  filterContainer: {
    paddingLeft: globalStyle.scale.scaleWidth(30),
    paddingRight: globalStyle.scale.scaleWidth(30),
    paddingTop: globalStyle.scale.scaleHeight(14),
    paddingBottom: globalStyle.scale.scaleHeight(14),
    backgroundColor: '#FAF9FC',
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultCount: {
    color: globalStyle.color.tint,
    fontSize: globalStyle.fontSize.n
  },
  filterClearBtn: {
    color: globalStyle.color.normal,
    fontSize: globalStyle.fontSize.xs,
    paddingTop: globalStyle.scale.scaleHeight(6),
    paddingBottom: globalStyle.scale.scaleHeight(6),
    paddingLeft: globalStyle.scale.scaleWidth(10),
    paddingRight: globalStyle.scale.scaleWidth(10),
    backgroundColor: globalStyle.color.lighter,
    borderRadius: 15,
    overflow: 'hidden'
  },
  filterSubText: {
    color: globalStyle.color.normal,
    fontSize: globalStyle.fontSize.xs,
    marginTop: globalStyle.scale.scaleHeight(10),
    marginBottom: globalStyle.scale.scaleHeight(10),
  },
  itemContainer: {
    paddingLeft: globalStyle.scale.scaleWidth(30),
    paddingRight: globalStyle.scale.scaleWidth(30),
    paddingTop: globalStyle.scale.scaleHeight(18),
    paddingBottom: globalStyle.scale.scaleHeight(18),
    borderBottomColor: globalStyle.color.border,
    borderBottomWidth: globalStyle.px1,
    flex: 1
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightWrap: {},
  userIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: globalStyle.scale.scaleWidth(10)
  },
  username: {
    fontSize: globalStyle.fontSize.xs,
    color: globalStyle.color.normal,
  },
  channelText: {
    color: globalStyle.color.normal,
    fontSize: globalStyle.fontSize.xs,
    paddingTop: globalStyle.scale.scaleHeight(6),
    paddingBottom: globalStyle.scale.scaleHeight(6),
    paddingLeft: globalStyle.scale.scaleWidth(10),
    paddingRight: globalStyle.scale.scaleWidth(10),
    borderColor: globalStyle.color.normal,
    borderWidth: globalStyle.px1,
    borderRadius: 15,
  },
  itemBody: {
    flexDirection: 'row',
    marginTop: globalStyle.scale.scaleHeight(10),
  },
  bodyLeft: {
    paddingRight: globalStyle.scale.scaleWidth(15)
  },
  bodyRight: {},
  eventImg: {
    width: 64,
    height: 64,
  },
  title: {
    fontSize: globalStyle.fontSize.l,
    color: globalStyle.color.strong
  },
  timeBar: {
    flexDirection: 'row',
    marginTop: globalStyle.scale.scaleHeight(12),
    alignItems: 'center'
  },
  timeIcon: {
    width: 12,
    height: 12,
    tintColor: globalStyle.color.tint,
    marginRight: globalStyle.scale.scaleWidth(8),
  },
  timeText: {
    fontSize: globalStyle.fontSize.xs,
    color: globalStyle.color.tint,
  },
  content: {
    marginTop: globalStyle.scale.scaleHeight(12),
    fontSize: globalStyle.fontSize.s,
    color: globalStyle.color.normal,
  },
  likesBar: {
    flexDirection: 'row',
    marginTop: globalStyle.scale.scaleHeight(12),
    alignItems: 'center'
  },
  likeBarIcon: {
    width: 12,
    height: 12,
    tintColor: globalStyle.color.weak,
    marginRight: globalStyle.scale.scaleWidth(8),
  },
  likeBarText: {
    fontSize: globalStyle.fontSize.xs,
    color: globalStyle.color.weak,
  },
  likeText: {
    marginRight: globalStyle.scale.scaleWidth(30),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    width: 60,
    height: 60,
    tintColor: globalStyle.color.border
  },
  emptyText: {
    fontSize: globalStyle.fontSize.n,
    color: globalStyle.color.disable,
  },
  footer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerText: {
    fontSize: globalStyle.fontSize.s,
    color: globalStyle.color.strong
  }
});
