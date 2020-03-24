/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import * as React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { NavigationScreenProp } from 'react-navigation';

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2
};

interface Props {
  navigation: NavigationScreenProp<{}>;
}

interface State {
  dataProvider: DataProvider
}

/***
 * To test out just copy this component and render in you root component
 */
export default class Search extends React.Component<Props, State> {

  static navigationOptions = {
    headerTitle: 'Search List'
  };

  _layoutProvider: LayoutProvider;
  constructor(props: Props) {
    super(props);

    let { width } = Dimensions.get("window");

    //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
    //THIS IS VERY IMPORTANT, FORGET PERFORMANCE IF THIS IS MESSED UP
    let dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });

    //Create the layout provider
    //First method: Given an index return the type of item e.g ListItemType1, ListItemType2 in case you have variety of items in your list/grid
    //Second: Given a type and object set the exact height and width for that type on given object, if you're using non deterministic rendering provide close estimates
    //If you need data based check you can access your data provider here
    //You'll need data in most cases, we don't provide it by default to enable things like data virtualization in the future
    //NOTE: For complex lists LayoutProvider will also be complex it would then make sense to move it to a different file
    this._layoutProvider = new LayoutProvider(
      index => {
        if (index % 3 === 0) {
          return ViewTypes.FULL;
        } else if (index % 3 === 1) {
          return ViewTypes.HALF_LEFT;
        } else {
          return ViewTypes.HALF_RIGHT;
        }
      },
      (type, dim) => {
        switch (type) {
          case ViewTypes.HALF_LEFT:
            dim.width = width / 2;
            dim.height = 160;
            break;
          case ViewTypes.HALF_RIGHT:
            dim.width = width / 2;
            dim.height = 160;
            break;
          case ViewTypes.FULL:
            dim.width = width;
            dim.height = 140;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
        }
      }
    );

    this._rowRenderer = this._rowRenderer.bind(this);

    //Since component should always render once data has changed, make data provider part of the state
    this.state = {
      dataProvider: dataProvider.cloneWithRows(this._generateArray(3000))
    };
  }

  _generateArray(n: number) {
      let arr = new Array(n);
      for (let i = 0; i < n; i++) {
          arr[i] = i;
      }
      return arr;
  }

  //Given type and data return the view component
  _rowRenderer(type: number, data: number) {
    //You can return any view here, CellContainer has no special significance
    switch (type) {
      case ViewTypes.HALF_LEFT:
        return (
          <View style={styles.containerGridLeft}>
            <Text>Data: {data}</Text>
          </View>
        );
      case ViewTypes.HALF_RIGHT:
        return (
          <View style={styles.containerGridRight}>
            <Text>Data: {data}</Text>
          </View>
        );
      case ViewTypes.FULL:
        return (
          <View style={styles.container}>
            <Text>Data: {data}</Text>
          </View>
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <RecyclerListView
        layoutProvider={this._layoutProvider}
        dataProvider={this.state.dataProvider}
        rowRenderer={this._rowRenderer}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#00a1f1"
  },
  containerGridLeft: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffbb00"
  },
  containerGridRight: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#7cbb00"
  }
});