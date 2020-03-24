/**
 * @desc Home page
 * @author heyanqiu
 * @date 2020-3-10
 */

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './home';
import DetailScreen from './detail';
import SelectCityScreen from './select-city';
import SearchScreen from './search';
import LoginScreen from './login';
import commonStyle from '@styles/common';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Detail: DetailScreen,
  SelectCity: SelectCityScreen,
  Search: SearchScreen,
  Login: LoginScreen
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: commonStyle.navHeader,
    headerTitleAlign: 'center',
  }
});

export default createAppContainer(AppNavigator);
