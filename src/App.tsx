/**
 * @desc entry page
 * @author heyanqiu
 * @date 2020-3-9
 */
// import * as React from 'react';
import { AppRegistry, Platform } from 'react-native';
// import page from './pages';
import App from './pages';

// interface Props {
//   webAPIDomain: string;
//   cloudAPIDomain: string;
//   rootTag: number;
// }

// tslint:disable-next-line:no-any
// function createApp(Component: any) {
//   return class App extends React.Component<Props, {}> {
//     constructor(props: Props) {
//       super(props);
//       NetworkService.setWebAPIDomain(props.webAPIDomain);
//       NetworkService.setCloudAPIDomain(props.cloudAPIDomain);
//       PerformanceService.taskRecord('rn.loadtime', 'loadjs');
//       if (Platform.OS === 'ios' && StatisticsService) {
//         StatisticsService.setChannel('eco');
//       }
//       AppService.rootTag = this.props.rootTag;
//     }
//     componentDidMount() {
//       PerformanceService.taskRecord('rn.loadtime', 'firstRender');
//       PerformanceService.taskReport('rn.loadtime');
//     }
//     render() {
//       return (
//         <View style={commonStyle.page}>
//           <Component rootTag={this.props.rootTag} />
//         </View>
//       );
//     }
//   };
// }

// for (const [name, Component] of Object.entries(page)) {
//   AppRegistry.registerComponent(name, () => createApp(Component()));
// }

AppRegistry.registerComponent('shopee', () => App);
if (Platform.OS === 'web') {
  AppRegistry.runApplication('shopee', {
    initialProps: {
    },
    rootTag: document.getElementById('app'),
  });
}
