/**
 * @desc Detail Tab
 */

import * as React from 'react';
import {
  Text,
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity
} from 'react-native';
import styles from './style';

interface Props {
  tabs: TabItem[];
  onTabPress: (tabName: string) => void;
  currentTab: string;
}

export interface TabItem {
  name: string;
  logoStr: ImageSourcePropType;
  activeLogo: ImageSourcePropType;
  count?: number;
}

export default class DetailTab extends React.PureComponent<Props, {}> {
  render() {
    const { tabs, onTabPress, currentTab } = this.props;
    return (
      <View style={styles.tabsContainer}>
        {
          tabs.map((tab, index) => {
            return (
              <View key={`${tab.name}-${index}`}>
                <TouchableOpacity
                  style={styles.tabTouchContainer}
                  onPress={() => onTabPress(tab.name)}
                >
                  <Image
                    source={currentTab === tab.name ? tab.activeLogo : tab.logoStr}
                    style={[
                      styles.tabLogo,
                      currentTab === tab.name ? styles.logoActive : null
                    ]}
                  />
                  <Text
                    style={[
                      styles.tabText,
                      currentTab === tab.name ? styles.textActive : null
                    ]}
                  >
                    {tab.count ? `${tab.count}  ${tab.name}` : tab.name}
                  </Text>
                  {
                    index !== 0 && index % 2 === 0 ? null : <Text style={styles.tabSplit}>|</Text>
                  }
                </TouchableOpacity>
              </View>
            );
          })
        }
      </View>
    );
  }
}
