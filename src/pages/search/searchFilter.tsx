/**
 * @desc Home page
 *       Custom Navigation Drawer / Sidebar
 *       https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/
 * @author heyanqiu
 * @date 2020-3-10
 */

import * as React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet
} from "react-native";
import { DrawerContentComponentProps } from 'react-navigation-drawer';
import { globalStyle } from '@styles/variables';

export default class SearchFilter extends React.Component<DrawerContentComponentProps, {}> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Custom Drawer Component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.color.strong
  }
});
