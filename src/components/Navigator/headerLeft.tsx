/**
 * @desc Header Left
 * @author heyanqiu
 * @date 2020-3-24
 */

import * as React from 'react';
import { 
  Image,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { globalStyle } from '@styles/variables';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<{}>;
  type: string;
}

export default class HeaderLeft extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  leftPress = () => {
    const { navigation, type } = this.props;

    if (type === 'search') {
      console.log('打开抽屉');
    } else {
      navigation.navigate('Home');
    }
  }

  render() {
    const { type } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={this.leftPress}>
          <Image
            source={type === 'search' ? require('@assets/svg/search.svg') : require('@assets/svg/home.svg')}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 20,
    height: 20,
    marginLeft: 10,
    tintColor: globalStyle.color.strong
  },
});
