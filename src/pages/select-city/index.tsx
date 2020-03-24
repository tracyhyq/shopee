/**
 * @desc City select page
 * @author heyanqiu
 * @date 2020-3-16
 */

import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import { observer } from 'mobx-react';
import { NavigationScreenProp } from 'react-navigation';
import CityList from '@components/CityList';
import { ICity } from '@I/home';
import selectCityStore from './store';

interface IProps {
  navigation: NavigationScreenProp<{}>;
}

interface IState {
  currentCityText: string;
  isLocation: boolean;
}

@observer
export default class SelectCity extends React.Component<IProps, IState> {
  /**
   * navigation config https://reactnavigation.org/docs/4.x/headers
   */
  static navigationOptions = {
    headerTitle: 'Select City'
  };

  constructor(props: IProps) {
    super(props);
  }

  state = {
    currentCityText: 'Locating...',
    isLocation: false
  };

  async componentDidMount() {
    await Promise.all([
      selectCityStore.getHotCities(),
      selectCityStore.getVistedCities(),
      selectCityStore.getCities()
    ]);
    this.setState({
      currentCityText: selectCityStore.currentCity.name,
      isLocation: true
    });
  }

  currentLocationClick = () => {
    console.log('change location');
  }

  cityClick = (city: ICity) => {
    console.log(`${city.name} selected`);
  }

  renderVisitedOrHotCities = (cities: ICity[]) => {
    return (
      <View style={styles.hotView}>
        {
          cities.map((city) => {
            return (
              <TouchableOpacity 
                key={city.code}
                onPress={() => { this.cityClick(city); }}
              >
                <Text style={styles.textItem}>{city.name}</Text>
              </TouchableOpacity>
            );
          })
        }
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={{backgroundColor: "#FFFFFF", flex: 1}}>
          <Text style={styles.titleText}>Current Location</Text>
          <View style={styles.currentView}>
            <TouchableOpacity 
              onPress={this.currentLocationClick}
            >
              <Text style={styles.currentText}>
                {this.state.currentCityText}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.titleText}>Recent Visit</Text>
          {this.renderVisitedOrHotCities(selectCityStore.visitedCities)}

          <Text style={styles.titleText}>Popular Cities</Text>
          {this.renderVisitedOrHotCities(selectCityStore.hotCities)}

          <Text style={styles.titleText}>All Cities</Text>
          <View>
            <CityList
              data={selectCityStore.cityList}
              onCityPress={this.cityClick}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    paddingLeft: 16,
    paddingTop: 15,
    paddingBottom: 15,
    color: "#A8A8A8",
    fontSize: 13,
    backgroundColor: "#F5F5F5",
  },
  currentText: {
    paddingLeft: 30,
    color: "#333",
    fontSize: 14,
  },
  currentView: {
    paddingTop: 15,
    paddingBottom: 15
  },
  textItem: {
    color: "#333",
    fontSize: 14,
    width: 118,
    height: 36,
    lineHeight: 36,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    textAlign: "center",
    marginBottom: 10,
    marginRight: 8,
  },
  hotView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginTop: 15,
    marginLeft: 18,
    marginRight: 18,
    marginBottom: 5,
  }
}); 
