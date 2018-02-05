/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {  Platform,  StyleSheet,  Text,  View} from 'react-native';
 import { NavigationActions ,StackNavigator } from 'react-navigation';
 import HomeScreen from './src/pages/SimpleApp';
 import PhoneAuthTest from './src/pages/firebase';
 import PassScreen from './src/pages/passwor';
 import OtpScreen from './src/pages/otppage';
 import AboutScreen from './src/pages/about';
 import NewpassScreen from './src/pages/newPassword';
 import ProfilePic from './src/pages/profile';
  import GeolocationApp from './src/pages/Geolocat';



 const SimpleApp = StackNavigator({
   Home: { screen: HomeScreen },
    Login: { screen: PhoneAuthTest },
      Otp: { screen: OtpScreen },
      Password: { screen: PassScreen},
        NewPassword: { screen: NewpassScreen},
        Profile:{screen:ProfilePic},
        Mapsa:{screen:GeolocationApp },
        About: { screen: AboutScreen }

 });

 export default class App extends React.Component {
   // componentWillMount() {
   //   firebase.initializeApp({
   //     apiKey: 'AIzaSyC5PsyF7OF93Wj3-gwjqg4HZQ6NJGzZv0k',
   //     authDomain: 'thala-1f1fa.firebaseapp.com',
   //     databaseURL: 'https://thala-1f1fa.firebaseio.com',
   //     projectId: 'thala-1f1fa',
   //     storageBucket: 'thala-1f1fa.appspot.com',
   //     messagingSenderId: '190476598844'
   //   });
   //
   // }
   render() {
     return <SimpleApp style={styles.iconContainer} />;
   }
 }
 const styles = StyleSheet.create({
   container: {
     flex: 1,
   },

 });
