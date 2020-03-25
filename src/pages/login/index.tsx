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
  Dimensions,
  StyleSheet
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { observer } from 'mobx-react';
import { I18n } from '@utils/locale';
import { globalStyle } from '@styles/variables';
import Input from '@components/Input';
import { toast } from '@components/Toast';
import Cookies from '@utils/cookie-util';
import { User } from '@I/login';
import loginStore from './store';

interface Props {
  navigation: NavigationScreenProp<{}>;
}

interface State {
  localeLanguage: string;
}

const { height } = Dimensions.get('screen');

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
      const u = await Cookies.getCookie<User>('user');
      console.log(u);
      navigation.navigate('Search');
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

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height
  },
  mask: {
    position: 'absolute',
    width: '100%',
    height,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: globalStyle.color.tint,
    opacity: 0.7,
  },
  langChanger: {
    flex: 1,
    position: 'absolute',
    width: 150,
    height: globalStyle.scale.scaleHeight(80),
    top: 0,
    left: 10,
    color: globalStyle.color.lighter,
    fontSize: globalStyle.fontSize.n,
    justifyContent: 'center',
  },
  pickerItem: {
    color: globalStyle.color.lighter,
    fontSize: globalStyle.fontSize.n
  },
  textStyle: {
    color: globalStyle.color.lighter,
    width: '100%',
    textAlign: 'center'
  },
  slogon: {
    height: globalStyle.scale.scaleHeight(20),
    lineHeight: globalStyle.scale.scaleHeight(20),
    marginTop: globalStyle.scale.scaleHeight(100),
    fontSize: globalStyle.fontSize.n
  },
  brand: {
    height: globalStyle.scale.scaleHeight(32),
    lineHeight: globalStyle.scale.scaleHeight(32),
    marginTop: globalStyle.scale.scaleHeight(20),
    fontSize: globalStyle.fontSize.l
  },
  logoWrap: {
    marginTop: globalStyle.scale.scaleHeight(30),
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  logo: {
    width: 64,
    height: 64,
    tintColor: globalStyle.color.lighter,
  },
  leftIcon: {
    marginLeft: 12,
    marginRight: 12
  },
  btns: {
    flex: 1,
    marginTop: globalStyle.scale.scaleHeight(-100)
  },
  input: {
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20,
    height: globalStyle.scale.scaleHeight(40),
    borderStyle: "solid",
    borderWidth: globalStyle.px1,
    borderColor: globalStyle.color.white,
    borderRadius: 20
  },
  loginBtn: {
    width: '100%',
    height: globalStyle.scale.scaleHeight(64),
    backgroundColor: globalStyle.color.lighter,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  pressWrap: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    fontSize: globalStyle.fontSize.n,
    color: globalStyle.color.strong
  }
});
