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
import commonStyle from '@styles/common';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Detail: DetailScreen,
  SelectCity: SelectCityScreen
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: commonStyle.navHeader,
    headerTitleStyle: commonStyle.navTitle,
  }
});

export default createAppContainer(AppNavigator);
