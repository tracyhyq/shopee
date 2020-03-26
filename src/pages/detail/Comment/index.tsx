/**
 * @desc Detail Comment
 */

import * as React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import { Comment } from '@I/detail';

interface Props {
  c: Comment;
  onCommentPress: (c: Comment) => void;
}

export default class DetailComment extends React.PureComponent<Props, {}> {
  render() {
    const { c, onCommentPress } = this.props;
    if (!c) return null;
    return (
      <View style={styles.container}>
        <View style={styles.ataversContainer}>
          <Image
            source={require('@assets/imgs/gmap.png')}
            style={styles.ataver}
          />
        </View>
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => onCommentPress(c)}>
            <View style={styles.nameWrap}>
              <Text style={styles.username}>{c.author.username}</Text>
              <Text style={styles.time}>{c.create_time}</Text>
            </View>
            <Text style={styles.comment}>{c.comment}</Text>
            <Image
              source={require('@assets/svg/reply.svg')}
              style={styles.reply}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
