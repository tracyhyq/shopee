/**
 * @desc Detail Content
 */

import * as React from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { IEvent } from '@I/search';
import styles from './style';
import commonStyle from '../style';

interface Props {
  evt: IEvent | null;
}

export default class DetailContent extends React.PureComponent<Props, {}> {
  render() {
    const { evt } = this.props;
    if (!evt) return null;
    return (
      <View>
        <View style={styles.swiperContainer}>
          <Swiper loop={true} height={200}>
            <View style={styles.slide}>
              <Image style={styles.slideImage} source={require('@assets/imgs/1.jpg')} />
            </View>
            <View style={styles.slide}>
              <Image style={styles.slideImage} source={require('@assets/imgs/2.jpg')} />
            </View>
            <View style={styles.slide}>
              <Image style={styles.slideImage} source={require('@assets/imgs/3.jpg')} />
            </View>
            <View style={styles.slide}>
              <Image style={styles.slideImage} source={require('@assets/imgs/4.jpg')} />
            </View>
          </Swiper>
        </View>
        <View style={styles.describeContainer}>
          <Text style={styles.describe}>
            {evt.description}
          </Text>
        </View>
        <View style={commonStyle.marginLine} />
        <View style={styles.timeContainer}>
          <View style={styles.titleWrap}>
            <View style={styles.boldLine}/>
            <Text style={styles.H1}>When</Text>
          </View>
          <View style={styles.timeWrap}>
            <View>
              <View style={styles.timeHor}>
                <Image
                  source={require('@assets/svg/date-from.svg')}
                  style={styles.timeLogo}
                />
                <Text style={styles.timeText}>{evt.begin_time}</Text>
              </View>
              <View style={styles.timestamp}>
                <Text style={styles.bigTime}>8:30</Text>
                <Text style={styles.smallUnit}>am</Text>
              </View>
            </View>
            <View style={styles.longSplit}/>
            <View>
              <View style={styles.timeHor}>
                <Image
                  source={require('@assets/svg/date-to.svg')}
                  style={styles.timeLogo}
                />
                <Text style={styles.timeText}>{evt.begin_time}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={commonStyle.marginLine} />
        <View style={styles.addrContainer}>
          <View style={styles.titleWrap}>
            <View style={styles.boldLine}/>
            <Text style={styles.H1}>Where</Text>
          </View>
          <Text style={styles.addr}>{evt.location}</Text>
          <Image
            source={require('@assets/imgs/gmap.png')}
            style={styles.locationImg}
          />
        </View>
      </View>
    );
  }
}
