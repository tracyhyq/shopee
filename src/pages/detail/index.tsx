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
  LayoutChangeEvent,
  LayoutRectangle,
  TouchableOpacity,
  Image
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
import Liker from './Liker';
import CommentComponent from './Comment';
import { Comment } from '@I/detail';

interface Props {
  navigation: NavigationScreenProp<{}>;
}

interface State {
  eventId: number;
  currentTab: string;
  btnStyle: string;
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
      btnStyle: 'join',
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
    const { likes, participants } = detailStore;
    return (
      <View
        style={[styles.participantsContainer, styles.line, styles.padding]}
        onLayout={(e: LayoutChangeEvent) => this.layout(e, 'Participants')}
      >
        <Liker
          dataSource={participants}
          logo={require('@assets/svg/check-outline.svg')}
          title="going"
        />
        <View style={styles.marginLine} />
        <Liker
          dataSource={likes}
          logo={require('@assets/svg/like-outline.svg')}
          title="likes"
        />
      </View>
    );
  }

  renderComments = () => {
    const { comments } = detailStore;
    return (
      <View
        style={[styles.commentsContainer, styles.padding]}
        onLayout={(e: LayoutChangeEvent) => this.layout(e, 'Comments')}
      >
        {
          comments.map((item, index) => {
            return (
              <CommentComponent
                key={`${item.id}-${index}`}
                c={item}
                onCommentPress={this.replyComment}
              />
            );
          })
        }
      </View>
    );
  }

  renderBtns = () => {
    const { btnStyle } = this.state;
    return (
      <View>
        {
          btnStyle === 'join' ? 
          (
            <View style={styles.btnsContainer}>
              <View style={[styles.joinContainer, styles.joinLeftContainer]}>
                <TouchableOpacity onPress={() => this.replyComment()}>
                  <Image
                    source={require('@assets/svg/comment-single.svg')}
                    style={styles.btnIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.like()}>
                  <Image
                    source={require('@assets/svg/like-outline.svg')}
                    style={[styles.btnIcon, styles.likeIcon]}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.joinContainer, styles.joinRightContainer]}>
                <TouchableOpacity
                  onPress={() => this.join()}
                  style={[styles.joinContainer, styles.joinRightContainer]}
                >
                  <Image
                    source={require('@assets/svg/check-outline.svg')}
                    style={styles.btnIcon}
                  />
                  <Text style={styles.joinText}>Join</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : 
          (
            <View></View>
          )
        }
      </View>
    );
  }

  /**
   * reply this event or somebody's comment
   */
  replyComment = (comment?: Comment) => {
    this.setState({
      btnStyle: 'reply'
    });
  }

  /**
   * like event
   */
  like = () => {

  }

  /**
   * join event
   */
  join = () => {

  }

  /**
   * Section Layout init position
   */
  layout = (e: LayoutChangeEvent, tabName: string) => {
    const { nativeEvent } = e;
    layoutMap[tabName] = nativeEvent.layout;
  }

  /**
   * tab switch
   */
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
