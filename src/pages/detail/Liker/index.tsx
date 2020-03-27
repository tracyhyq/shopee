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

interface State {
  data: any[];
}

export default class DetailHeader extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      data: this.props.dataSource
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { dataSource } = nextProps;

    this.setState({
      data: dataSource
    });
  }

  render() {
    const { logo, title } = this.props;
    const { data } = this.state;

    if (!data || data.length === 0) return null;
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
          <Text style={styles.text}>{data.length}</Text>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.ataversContainer}>
          {
            data.map((item, index) => {
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
