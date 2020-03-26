/**
 * @desc Detail Liker
 */

import * as React from 'react';
import {
  Text,
  View,
  Image,
  ImageSourcePropType
} from 'react-native';
import styles from './style';

interface Props {
  dataSource: any[];
  logo: ImageSourcePropType;
  title: string;
}

export default class DetailHeader extends React.PureComponent<Props, {}> {
  render() {
    const { dataSource, logo, title } = this.props;
    if (!dataSource || dataSource.length === 0) return null;
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          {
            logo ? 
            (
              <Image
                source={logo}
                style={styles.logo}
              />
            ) : null
          }
          <Text style={styles.text}>{dataSource.length}</Text>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.ataversContainer}>
          {
            dataSource.map((item, index) => {
              return (
                <Image
                  key={index}
                  source={require('@assets/imgs/gmap.png')}
                  style={styles.ataver}
                />
              );
            })
          }
        </View>
      </View>
    );
  }
}
