/**
 * @desc Detail page
 * @author heyanqiu
 * @date 2020-3-26
 */
import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
  LayoutRectangle
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import LogoTitle from '@components/Navigator/headerTitle';
import HeaderRight from '@components/Navigator/headerRight';
import HeaderLeft from '@components/Navigator/headerLeft';
import detailStore from './store';
import { observer } from 'mobx-react';
import styles from './style';
import Header from './Header';
import Tab, { TabItem } from './Tab';
import Content from './Content';

interface Props {
  navigation: NavigationScreenProp<{}>;
}

interface State {
  eventId: number;
  currentTab: string;
}

const TabMap: TabItem[] = [
  {
    name: 'Details',
    logoStr: require('@assets/svg/info-outline.svg')
  },
  {
    name: 'Participants',
    logoStr: require('@assets/svg/people-outline.svg')
  },
  {
    name: 'Comments',
    logoStr: require('@assets/svg/comment-outline.svg')
  }
];

const layoutRectangle: LayoutRectangle = {
  x: 0, y: 0, width: 0, height: 0
};
const layoutMap: {
  [key: string]: LayoutRectangle
} = {
  'Details': layoutRectangle,
  'Participants': layoutRectangle,
  'Comments': layoutRectangle,
  'Tab': layoutRectangle,
};

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

  private $scrollView = React.createRef<ScrollView>();

  constructor(props: Props) {
    super(props);

    // 通过路由获取 eventId
    const eventId = this.props.navigation.getParam('eventId', -1);
    this.state = {
      eventId,
      currentTab: 'Details',
    };
  }

  async componentDidMount() {
    await Promise.all([
      detailStore.getEvent(this.state.eventId),
      detailStore.getLikes(this.state.eventId),
      detailStore.getParticipants(this.state.eventId),
      detailStore.getComments(this.state.eventId)
    ]);
  }

  renderTabs = () => {
    const { currentTab } = this.state;
    return (
      <View
        style={[styles.tabsContainer, styles.line, styles.padding]}
        onLayout={(e: LayoutChangeEvent) => this.layout(e, 'Tab')}
      >
        <Tab
          tabs={TabMap}
          onTabPress={this.tabPress}
          currentTab={currentTab}
        />
      </View>
    );
  }

  renderDetail = () => {
    const { evt } = detailStore;
    if (!evt) return null;
    return (
      <View
        style={[styles.detailContainer, styles.line, styles.padding]}
        onLayout={(e: LayoutChangeEvent) => this.layout(e, 'Details')}
      >
        <Content evt={evt}/>
      </View>
    );
  }

  renderParticipants = () => {
    return (
      <View
        style={[styles.participantsContainer, styles.line, styles.padding]}
        onLayout={(e: LayoutChangeEvent) => this.layout(e, 'Participants')}
      >
        <Text>Participants Container</Text>
      </View>
    );
  }

  renderComments = () => {
    return (
      <View
        style={[styles.commentsContainer, styles.padding]}
        onLayout={(e: LayoutChangeEvent) => this.layout(e, 'Comments')}
      >
        <Text>Comments Container</Text>
      </View>
    );
  }

  renderBtns = () => {
    return (
      <View style={styles.btnsContainer} />
    );
  }
  
  onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    // const { y } = e.nativeEvent.contentOffset;
    // if (this.$scrollView.current) {
    //   if(y < 50){
    //     this.$scrollView.current.scrollTo({x: 0, y: 0, animated: true});
    //   } else if(y < 100){
    //     this.$scrollView.current.scrollTo({x: 0, y: 100, animated: true});
    //   }
    // }
  }

  layout = (e: LayoutChangeEvent, tabName: string) => {
    const { nativeEvent } = e;
    layoutMap[tabName] = nativeEvent.layout;
  }

  tabPress = (tabName: string) => {
    const currentLayout = layoutMap[tabName];
    const tabHeight = layoutMap.Tab.height;
    const scrollOffset = currentLayout.y - tabHeight;

    if (this.$scrollView.current) {
      this.$scrollView.current.scrollTo({x: 0, y: scrollOffset, animated: true});
    }
    
    this.setState({
      currentTab: tabName
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
          onScrollEndDrag={this.onScroll}
          ref={this.$scrollView}
        >
          <Header evt={detailStore.evt}/>
          { this.renderTabs() }
          { this.renderDetail() }
          { this.renderParticipants() }
          { this.renderComments() }
          { this.renderBtns() }
        </ScrollView>
      </View>
    );
  }
}
