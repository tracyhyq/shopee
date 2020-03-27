/**
 * @desc Profile page
 * @author heyanqiu
 * @date 2020-3-27
 */
import * as React from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  ScrollView
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import LogoTitle from '@components/Navigator/headerTitle';
import HeaderRight from '@components/Navigator/headerRight';
import HeaderLeft from '@components/Navigator/headerLeft';
import profileStore from './store';
import { observer } from 'mobx-react';
import styles from './style';
import Tab, { TabItem } from '@pages/detail/Tab';
import EventItem from '@pages/search/EventItem';
import { IEvent } from '@I/search';

interface Props {
  navigation: NavigationScreenProp<{}>;
}

interface State {
  currentTab: string;
}

const TabMap: TabItem[] = [
  {
    name: 'Liked',
    logoStr: require('@assets/svg/like-outline.svg'),
    activeLogo: require('@assets/svg/like.svg')
  },
  {
    name: 'Going',
    logoStr: require('@assets/svg/check-outline.svg'),
    activeLogo: require('@assets/svg/check.svg')
  },
  {
    name: 'Past',
    logoStr: require('@assets/svg/past-outline.svg'),
    activeLogo: require('@assets/svg/past.svg')
  }
];

@observer
export default class Detail extends React.Component<Props, State> {
  /**
   * header config https://reactnavigation.org/docs/4.x/headers
   */
  static navigationOptions = ({ navigation }) => {
    const navi = navigation;
    return {
      headerTitle: () => <LogoTitle />,
      headerRight: () => <HeaderRight navigation={navi}/>,
      headerLeft: () => <HeaderLeft navigation={navi} type="home" />
    };
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      currentTab: 'Liked',
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    await Promise.all([
      profileStore.getUserInfo(navigation),
      profileStore.getUserEvents(navigation),
    ]);
    profileStore.eventsPool = profileStore.eventsPool.concat(profileStore.events.slice());
  }

  renderHeader = () => {
    const { userInfo } = profileStore;

    if (!userInfo) return null;
    return (
      <View style={[styles.headerContainer, styles.line, styles.padding]}>
        <Image
          source={require('@assets/imgs/atavar.jpg')}
          style={styles.atavarImg}
        />
        <Text style={styles.username}>{userInfo.username}</Text>
        <Text style={styles.email}>{userInfo.email}</Text>
      </View>
    );
  }

  renderTabs = () => {
    const { currentTab } = this.state;
    const { userInfo } = profileStore;

    if (!userInfo) return null;

    TabMap[0].count = userInfo.likes_count;
    TabMap[1].count = userInfo.goings_count;
    TabMap[2].count = userInfo.past_count;

    return (
      <View style={[styles.tabsContainer, styles.line, styles.padding]}>
        <Tab
          tabs={TabMap}
          onTabPress={this.tabPress}
          currentTab={currentTab}
        />
      </View>
    );
  }

  goDetail = (id: number) => {
    this.props.navigation.navigate('Detail', {
      eventId: id
    });
  }

  renderItem = (evt: IEvent) => {
    const curTab = this.state.currentTab.toLocaleLowerCase();
    return (
      <View style={[styles.line, styles.padding]}>
        <EventItem
          evt={evt}
          onEventPress={this.goDetail}
          liked={curTab === 'liked'}
          gone={curTab === 'going'}
          past={curTab === 'past'}
        />
      </View>
    );
  }

  renderEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={require('@assets/svg/no-activity.svg')}
          style={styles.emptyIcon}
        />
        <Text style={styles.emptyText}>No activity found</Text>
      </View>
    );
  }

  renderFooter = () => {
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {profileStore.hasMore ? 'Loading...' : 'It\'s Bottom ~~'}
        </Text>
      </View>
    );
  }

  /**
   * tab switch
   */
  tabPress = async (tabName: string) => {
    const { navigation } = this.props;

    profileStore.eventsPool = [];
    profileStore.filter.type = tabName.toLocaleLowerCase();
    await profileStore.getUserEvents(navigation);
    profileStore.eventsPool = profileStore.eventsPool.concat(profileStore.events.slice());
    this.setState({
      currentTab: tabName
    });
  }

  loadMore = async () => {
    const { navigation } = this.props;

    if (profileStore.hasMore) {
      profileStore.filter.offset += profileStore.events.length;
      await profileStore.getUserEvents(navigation);
      profileStore.eventsPool = profileStore.eventsPool.concat(profileStore.events.slice());
    }
  }

  renderHeaderComponent = () => {
    return (
      <View>
        { this.renderHeader() }
        { this.renderTabs() }
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <FlatList
          data={profileStore.eventsPool}
          renderItem={({ item }) => this.renderItem(item)}
          ListEmptyComponent={this.renderEmpty}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.loadMore}
          ListHeaderComponent={this.renderHeaderComponent}
        /> */}
        <ScrollView
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
        >
          { this.renderHeader() }
          { this.renderTabs() }
          <FlatList
            data={profileStore.eventsPool}
            renderItem={({ item }) => this.renderItem(item)}
            ListEmptyComponent={this.renderEmpty}
            ListFooterComponent={this.renderFooter}
            onEndReached={this.loadMore}
          />
        </ScrollView>
      </View>
    );
  }
}
