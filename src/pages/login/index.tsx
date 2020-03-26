/**
 * @desc login page
 * @author heyanqiu 
 * @date 2020-3-24
 */
import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Picker,
  ImageBackground,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { observer } from 'mobx-react';
import { I18n } from '@utils/locale';
import { globalStyle } from '@styles/variables';
import Input from '@components/Input';
import { toast } from '@components/Toast';
import Cookies from '@utils/cookie-util';
import loginStore from './store';
import styles from './style';

interface Props {
  navigation: NavigationScreenProp<{}>;
}

interface State {
  localeLanguage: string;
}

@observer
export default class Login extends React.Component<Props, State> {

  static navigationOptions = {
    headerShown: false
  };

  state = {
    localeLanguage: 'en'
  };

  constructor(props: Props) {
    super(props);
  }

  langChange = (lang: string) => {
    this.setState({
      localeLanguage: lang
    });
    I18n.locale = lang;
  }

  renderLangPicker = () => {
    return (
      <Picker
        selectedValue={this.state.localeLanguage}
        style={styles.langChanger}
        itemStyle={styles.pickerItem}
        mode="dropdown"
        onValueChange={(itemValue, itemIndex) =>
          this.langChange(itemValue)
        }
      >
        {
          Object.keys(I18n.translations).map((item, index) => {
            return (
              <Picker.Item
                key={`${item}-${index}`}
                label={I18n.translations[item].id}
                value={item}
              />
            );
          })
        }
      </Picker>
    );
  }

  usernameChange = (username: string) => {
    loginStore.username = username;
  }

  passwordChange = (password: string) => {
    loginStore.password = password;
  }

  /**
   * 登录
   */
  doLogin = async () => {
    const { navigation } = this.props;

    if (!loginStore.username || !loginStore.password) {
      toast('用户名或密码不能为空!');
      return;
    }

    const res = await loginStore.doLogin();
    if (res) {
      const result  = res.data;
      Cookies.setCookie('x-token', result.token);
      Cookies.setCookie('user', JSON.stringify(result.user));
      navigation.navigate('Search', { clearFilter: true });
    } else {
      toast('登录失败!');
    }
  }

  getLeftIcon = (type: string) => {
    const iconStyle = {
      width: 14,
      height: 14,
      tintColor: globalStyle.color.border
    };

    if (type === 'username') {
      return (
        <Image
          style={iconStyle}
          source={require('@assets/svg/user.svg')}
        />
      );
    } else {
      return (
        <Image
          style={iconStyle}
          source={require('@assets/svg/password.svg')}
        />
      );
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('@assets/imgs/login-bg.jpg')}
          resizeMode='cover'
          style={styles.backgroundImage}
        >
          <View style={styles.mask}/>
          {this.renderLangPicker()}
          <Text style={[styles.textStyle, styles.slogon]}>{I18n.t('slogon')}</Text>
          <Text style={[styles.textStyle, styles.brand]}>{I18n.t('brand')}</Text>
          <View style={styles.logoWrap}>
            <Image
              style={styles.logo}
              source={require('@assets/svg/logo-cat.svg')}
            />
          </View>
          <View style={styles.btns}>
            <Input
              style={styles.input}
              showClearIcon
              textInputStyle={{
                color: globalStyle.color.white
              }}
              leftIconStyle={styles.leftIcon}
              placeholder="user@blackcat.co"
              onChangeText={this.usernameChange}
              leftIcon={this.getLeftIcon('username')}
            />
            <Input
              style={styles.input}
              textInputStyle={{
                color: globalStyle.color.white
              }}
              showClearIcon
              leftIconStyle={styles.leftIcon}
              placeholder="password"
              onChangeText={this.passwordChange}
              leftIcon={this.getLeftIcon('password')}
            />
          </View>
          <View style={styles.loginBtn}>
            <TouchableOpacity style={styles.pressWrap} onPress={this.doLogin}>
              <Text style={styles.loginText}>{I18n.t('sign')}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
