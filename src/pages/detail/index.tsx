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
import Input from '@components/Input';
import { toast } from '@components/Toast';
import detailStore from './store';
import { observer } from 'mobx-react';
import styles from './style';
import Header from './Header';
import Tab, { TabItem } from './Tab';
import Content from './Content';
import Liker from './Liker';
import CommentComponent from './Comment';
import { Comment } from '@I/detail';
import { User } from '@I/login';
import Cookies from '@utils/cookie-util';

interface Props {
  navigation: NavigationScreenProp<{}>;
}

interface State {
  eventId: number;
  currentTab: string;
  btnStyle: string;
  commentPlaceHolder: string;
  commentVal: string;
  liked: boolean;
  gone: boolean;
  user: User | undefined;
}

const DEFAULT_PLACEHOLDER = 'Leave you comment here';

const TabMap: TabItem[] = [
  {
    name: 'Details',
    logoStr: require('@assets/svg/info-outline.svg'),
    activeLogo: require('@assets/svg/info.svg')
  },
  {
    name: 'Participants',
    logoStr: require('@assets/svg/people-outline.svg'),
    activeLogo: require('@assets/svg/people.svg')
  },
  {
    name: 'Comments',
    logoStr: require('@assets/svg/comment-outline.svg'),
    activeLogo: require('@assets/svg/comment.svg')
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
      commentPlaceHolder: DEFAULT_PLACEHOLDER,
      commentVal: '',
      liked: false,
      gone: false,
      user: undefined,
    };
  }

  async componentDidMount() {
    const u = await Cookies.getCookie('user');
    await Promise.all([
      detailStore.getEvent(this.state.eventId),
      detailStore.getLikes(this.state.eventId),
      detailStore.getParticipants(this.state.eventId),
      detailStore.getComments(this.state.eventId)
    ]);

    if (u) {
      const user: User = JSON.parse(u);
      this.setState({
        user
      });
    }
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
    const { btnStyle, liked, gone } = this.state;
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
                    source={
                      liked ?
                      require('@assets/svg/like.svg') : 
                      require('@assets/svg/like-outline.svg')
                    }
                    style={[
                      styles.btnIcon,
                      styles.likeIcon,
                      liked ? styles.unlike : null
                    ]}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.joinContainer, styles.joinRightContainer]}>
                <TouchableOpacity
                  onPress={() => this.join()}
                  style={[styles.joinContainer, styles.joinRightContainer]}
                >
                  <Image
                    source={
                      gone ?
                      require('@assets/svg/check.svg') :
                      require('@assets/svg/check-outline.svg')
                    }
                    style={[
                      styles.btnIcon,
                      gone ? styles.gone : null
                    ]}
                  />
                  <Text style={styles.joinText}>
                    {gone ? 'I am going' : 'Join'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : 
          (
            <View style={styles.btnsContainer}>
              <View style={[styles.joinContainer, styles.replyLeftContainer]}>
                <TouchableOpacity onPress={() => this.cancelReply()}>
                  <Image
                    source={require('@assets/svg/cross.svg')}
                    style={styles.crossIcon}
                  />
                </TouchableOpacity>
                <Input
                  style={styles.input}
                  value={this.state.commentVal}
                  placeholderTextColor='#D3C1E5'
                  textInputStyle={styles.textInputStyle}
                  placeholder={this.state.commentPlaceHolder}
                  onChangeText={this.commentInputChange}
                />
              </View>
              <View style={styles.replyRightContainer}>
                <TouchableOpacity
                  onPress={() => this.sendComment()}
                  style={styles.replyRightContainer}
                >
                  <Image
                    source={require('@assets/svg/send.svg')}
                    style={styles.sendIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
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
      btnStyle: 'reply',
      commentPlaceHolder: comment ? `@${comment?.author.username}` : DEFAULT_PLACEHOLDER,
    });
  }

  cancelReply = () => {
    this.setState({
      btnStyle: 'join',
      commentPlaceHolder: DEFAULT_PLACEHOLDER
    });
  }

  commentInputChange = (txt: string) => {
    this.setState({
      commentVal: txt
    });
  }

  sendComment = async () => {
    const { commentVal, commentPlaceHolder, eventId } = this.state;
    const { navigation } = this.props;
    let val = '';

    if (!commentVal) {
      toast('回复不能为空!');
      return;
    }
    val = commentPlaceHolder.startsWith('@')
          ? `${commentPlaceHolder} ${commentVal}`
          : commentVal;
    
    const res = await detailStore.addComment(val, eventId, navigation);
    if (res) {
      detailStore.comments.unshift(res.data);
      this.setState({
        commentPlaceHolder: DEFAULT_PLACEHOLDER,
        commentVal: ''
      });
      this.tabPress('Comments');
    }
  }

  /**
   * like event
   */
  like = async () => {
    const { liked, eventId, user } = this.state;
    const { navigation } = this.props;

    // 已经点赞，需要取消
    if (liked) {
      await detailStore.cancelLike(eventId, navigation);
      detailStore.likes.pop();
    } else {
      const res = await detailStore.addLike(eventId, navigation);
      if (res && user) {
        detailStore.likes.push(user);
      }
    }

    this.setState({
      liked: !liked
    });
  }

  /**
   * join event
   */
  join = async () => {
    const { gone, eventId, user } = this.state;
    const { navigation } = this.props;
    // 已经参加，需要取消
    if (gone) {
      await detailStore.cancelGoing(eventId, navigation);
      detailStore.participants.pop();
    } else {
      const res = await detailStore.addGoing(eventId, navigation);
      if (res && user) {
        detailStore.participants.push(user);
      }
    }

    this.setState({
      gone: !gone
    });
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
        </ScrollView>
        { this.renderBtns() }
      </View>
    );
  }
}
