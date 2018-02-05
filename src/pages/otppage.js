/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  ScrollView,
  TouchableHighlight,
  Image
} from 'react-native';
 import firebase from 'react-native-firebase';
 import PhoneAuthTest from './firebase';
import PTTextInput from '../components/PTTextInput';
import LoginScreen from './login';


const instructions = Platform.select({
  ios: 'Enter Your Otp Number',
  android: 'Enter Your Otp Number',
});

export default class OtpScreen extends Component<{}> {

    constructor(props) {
      super(props);
      this.unsubscribe = null;
      nav = this.props.navigation;
      this.state = {
        user: null,
        message: '',
        codeInput: '',
      };
    }
  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;
    const {state} = this.props.navigation;
    console.log(state.params.confirmResultts)
    if (state.params.confirmResultts && codeInput.length) {
      state.params.confirmResultts.confirm(codeInput)
        .then((user) => {
          this.setState({ message: 'Code Confirmed!' });
          firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
            console.log(idToken)
            nav.navigate('NewPassword',{token: idToken,phoneNumber:state.params.mobile_number})
            // Send token to your backend via HTTPS
            // ...
          }).catch(function(error) {
            // Handle error
          });
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    }
  };

  render() {
    const { codeInput } = this.state;
    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ codeInput: value })}
          placeholder={'Code ... '}
          value={codeInput}
        />
        <Button title="Confirm" color="#FF7214" onPress={this.confirmCode} />
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
  // otpContainer:{
  //   width:40,
  //   height:40,
  // },
  // otpCon:{
  //   alignItems: 'center',
  //   justifyContent:'center',
  // },
  // otpCon1:{
  //   flexDirection: 'row',
  // }
});
