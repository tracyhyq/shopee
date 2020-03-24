/**
 * @desc Home page
 *       Switch Screen out of the Navigation Drawer with Latest Navigation V4+
 *       https://aboutreact.com/switch-screen-out-of-the-navigation-drawer-in-react-native/
 * @author heyanqiu
 * @date 2020-3-10
 */

import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import HomeScreen from './home';
import DetailScreen from './detail';
import SelectCityScreen from './select-city';
import SearchScreen from './search';
import SearchFilter from './search/searchFilter';
import LoginScreen from './login';
import commonStyle from '@styles/common';

const searchStackNavigator = createStackNavigator({
  Search: SearchScreen,
},{
  defaultNavigationOptions: {
    headerStyle: commonStyle.navHeader,
    headerTitleAlign: 'center',
  }
});

const drawerNavigator = createDrawerNavigator({
  SearchDrawer: searchStackNavigator,
}, {
  navigationOptions: {
    headerShown: false
  },
  contentComponent: SearchFilter,
  drawerWidth: Dimensions.get('window').width - 130,
});

const AppNavigator = createStackNavigator({
  Drawer: drawerNavigator,
  Home: HomeScreen,
  Detail: DetailScreen,
  SelectCity: SelectCityScreen,
  Login: LoginScreen
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: commonStyle.navHeader,
    headerTitleAlign: 'center',
  }
});

export default createAppContainer(AppNavigator);
