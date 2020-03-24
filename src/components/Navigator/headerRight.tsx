/**
 * @desc Header Right
 * @author heyanqiu
 * @date 2020-3-24
 */

import * as React from 'react';
import { 
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import { globalStyle } from '@styles/variables';
import { NavigationScreenProp } from 'react-navigation';
import { User } from '@I/login';
import Cookies from '@utils/cookie-util';

interface Props {
  navigation: NavigationScreenProp<{}>;
}

export default class HeaderRight extends React.Component<Props, {}> {
  user: User | undefined = undefined;
  constructor(props: Props) {
    super(props);

    Cookies.getCookie<User>('user').then((u) => {
      this.user = u;
    });
  }

  userInfoPress = () => {
    const { user } = this;
    const { navigation } = this.props;

    if (user) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('Login');
    }
  }

  render() {
    const { user } = this;
    return (
      <View>
        <TouchableOpacity onPress={this.userInfoPress}>
          {
            user ?
            (
              <Image
                source={{uri: user.avatar}}
                style={styles.logo}
              />
            ) :
            <Text style={styles.text}>login</Text>
          }
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10
  },
  text: {
    fontSize: globalStyle.fontSize.n,
    color: globalStyle.color.lighter,
    marginRight: 10
  }
});
