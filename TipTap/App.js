/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
// import React, { Component } from 'react';
// import {ActivityIndicator, StyleSheet, View, StatusBar, AsyncStorage} from 'react-native';
import {createSwitchNavigator,createStackNavigator, createAppContainer} from 'react-navigation';
import SplashScreen from './screens/splash';
import LoginScreen from './screens/login';
import ForgotPasswordScreen from './screens/forgot-password';
import ResetPasswordScreen from './screens/resetPassword';
import SignupScreen from './screens/signup/signup';
import TipperDashboard from './screens/tipper-dashboard';
import Search from './screens/search';
import SelectedPerson from './screens/selected-person';
import PaymentMethods from './screens/payment-methods';
import ReceiverDashboard from './screens/Receiver/ReceiverDashboard';
import QrCodeReceiver from './screens/Receiver/QrCodeReceiver';
import TranasctionHistory from './screens/Receiver/TransactionHistory';
//import console = require('console');
//import { View } from 'native-base';


// const authStack = createStackNavigator({Home : LoginScreen});

// class AuthLoadingScreen extends Component {
//   constructor(props) {
//     super(props);
//     this._loadData()
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator/>
//         <StatusBar barStyle= "default"/>
//       </View>
//     );
//   }
//   _loadData = async() => {
//     console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
//     const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
//     this.props.navigation.navigate(isLoggedIn !== '1' ? 'Auth' : 'App');
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center'

//   }
// });

// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       AuthLoading: AuthLoadingScreen,
//       App: Navigation,
//       Auth: authStack,
//     }
//     // {
//     //   initialRouteName: 'AuthLoading',
//     // }
//   )
// );
 
const Navigation = createStackNavigator({
  splash: {screen: SplashScreen},
  login: {screen: LoginScreen},
  forgotPassword:{screen : ForgotPasswordScreen},
  resetPassword:{screen : ResetPasswordScreen}
})

const MainNavigator = createSwitchNavigator({
  login: {screen: LoginScreen},
  splash: {screen: SplashScreen},
  signup: {screen: SignupScreen},
  forgotPassword:{screen : ForgotPasswordScreen},
  resetPassword:{screen : ResetPasswordScreen},
  tipperDashboard:{screen: TipperDashboard},
  search:{screen: Search},
  selectedPerson:{screen:SelectedPerson},
  paymentMethods:{screen:PaymentMethods},
  ReceiverDashboard:{screen:ReceiverDashboard},
  qrcodereceiver:{screen:QrCodeReceiver},
  tranasctionhistory:{screen:TranasctionHistory}
});

const App = createAppContainer(MainNavigator, Navigation);

export default App;
