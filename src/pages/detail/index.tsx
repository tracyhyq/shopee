import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<{}>;
}

export default class Detail extends React.Component<Props, {}> {
  /**
   * header config https://reactnavigation.org/docs/4.x/headers
   */
  static navigationOptions = {
    headerTitle: 'Detail'
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}
