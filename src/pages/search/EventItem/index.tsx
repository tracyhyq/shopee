/**
 * @desc EventItem Comment
 */

import * as React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import { IEvent } from '@I/search';

interface Props {
  evt: IEvent;
  onEventPress: (id: number) => void;
  liked?: boolean;
  gone?: boolean;
  past?: boolean;
}

export default class EventItem extends React.PureComponent<Props, {}> {
  render() {
    const { evt, onEventPress, liked, gone, past } = this.props;
    if (!evt) return null;
    return (
      <TouchableOpacity onPress={() => onEventPress(evt.id)}>
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
            {
              !past ?
              (
                <View style={styles.likesBar}>
                  <Image
                      source={
                        gone ? 
                        require('@assets/svg/check.svg') :
                        require('@assets/svg/check-outline.svg')
                      }
                      style={[
                        styles.likeBarIcon,
                        gone ? styles.goneIcon : null
                      ]}
                  />
                  <Text 
                    style={[
                      styles.likeBarText,
                      styles.likeText,
                      gone ? styles.goneText : null
                    ]}
                  >
                    { gone ? 'I am going!' : `${evt.goings_count} Going` }
                  </Text>
                  <Image
                    source={
                      liked ?
                      require('@assets/svg/like.svg') :
                      require('@assets/svg/like-outline.svg')
                    }
                    style={[
                      styles.likeBarIcon,
                      liked ? styles.likedIcon : null
                    ]}
                  />
                  <Text
                    style={[
                      styles.likeBarText,
                      liked ? styles.likedText : null
                    ]}
                  >
                    { liked ? 'I like it!' : `${evt.likes_count} Likes` }
                  </Text>
                </View>
              ): null
            }
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
    );
  }
}
