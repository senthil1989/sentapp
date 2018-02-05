/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet,  Text,  View,  TouchableHighlight,  Image, DeviceEventEmitter} from 'react-native';
 import firebase from 'react-native-firebase';
import PTTextInput from '../components/PTTextInput';
 import PhoneAuthTest from './firebase';
const instructions = Platform.select({
  ios: 'Share your live mokka current location\n' +
    'with your friends at any time',
  android: 'Share your live current location\n' +
    'with your friends at any time',
});

export default class LoginScreen extends Component<{}> {

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

  // RNFirebasePhoneauth.initFirebase(
  //       appId,
  //       projectId,
  //       appKey,
  //       databaseURL,
  //       (resp)=>{ console.log(resp) },
  //       (error)=>{
  //           //alert(error); console.log(error);
  //           },
  //   );

  onButtonPress(){

      firebase.auth().signInWithPhoneNumber(this.refs.mob_num.state.phoneNumber)
        .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
        .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
  }
  render() {
      const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <Text style={styles.instructions}>
          {instructions}
        </Text>

        <PTTextInput placeHolder="Enter Mobile Number" ref="mob_num" keyboardType="numeric"/>

            <TouchableHighlight
            style={styles.addProductBtn} onPress={() => this.onButtonPress(),navigate('Otp')}>

              <Text style={styles.addProduct}>
                Submit
              </Text>
          </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  logo : {
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom : 20
  },
  addProductBtn:{
    marginTop:40,
    marginRight:25,
    marginLeft:25,
    height:50,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'#FF7214',
  },
  addProduct: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  instructions: {
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 5,
  },
});
