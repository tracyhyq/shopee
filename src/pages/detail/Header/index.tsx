/**
 * @desc Detail Header
 */

import * as React from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import { IEvent } from '@I/search';
import styles from './style';
import commonStyle from '../style';

interface Props {
  evt: IEvent | null;
}

export default class DetailHeader extends React.PureComponent<Props, {}> {
  render() {
    const { evt } = this.props;
    if (!evt) return null;
    return (
      <View style={[styles.headerContainer, commonStyle.line, commonStyle.padding]}>
        <Text style={styles.headerChannelText}>{evt.channel.name}</Text>
        <Text style={styles.headerTitleText}>{evt.name}</Text>
        <View style={styles.headerAvatarWrap}>
          <Image
            source={require('@assets/imgs/gmap.png')}
            style={styles.headerAvatar}
          />
          <View style={styles.headerTextWrap}>
            <Text style={styles.headerUsername}>{evt.creator.username}</Text>
            <Text style={styles.headerPublish}>{evt.begin_time}</Text>
          </View>
        </View>
      </View>
    );
  }
}
