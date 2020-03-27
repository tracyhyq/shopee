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
import SearchFilter from './search/SearchFilter';
import LoginScreen from './login';
import ProfileScreen from './profile';
import commonStyle from '@styles/common';

const DrawerWidth = Dimensions.get('window').width * 0.7;

const searchStackNavigator = createStackNavigator({
  Search: SearchScreen,
},{
  defaultNavigationOptions: {
    headerStyle: commonStyle.navHeader,
    headerTitleAlign: 'center',
  }
});

/**
 *  more drawer config
 *  https://reactnavigation.org/docs/4.x/drawer-navigator
 */
const drawerNavigator = createDrawerNavigator({
  SearchDrawer: searchStackNavigator,
}, {
  navigationOptions: {
    headerShown: false
  },
  drawerType: "slide",
  overlayColor: "transparent",
  contentComponent: SearchFilter,
  drawerWidth: DrawerWidth,
});

const AppNavigator = createStackNavigator({
  Drawer: drawerNavigator,
  Home: HomeScreen,
  Detail: DetailScreen,
  SelectCity: SelectCityScreen,
  Login: LoginScreen,
  Profile: ProfileScreen,
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: commonStyle.navHeader,
    headerTitleAlign: 'center',
  }
});

export default createAppContainer(AppNavigator);
