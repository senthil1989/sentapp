/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {  Platform,Button,  StyleSheet,  Text,  View,  ScrollView, TextInput, Image} from 'react-native';
import PTTextInput from '../components/PTTextInput';
import DefaultPreference from 'react-native-default-preference';

const instructions = Platform.select({
  ios: 'Enter Your Password',
  android: 'Enter Your Password',
});

export default class PassScreen extends Component<{}> {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    nav = this.props.navigation;
    this.state = {
      phoneNumber: '',
      passWor:'',
    };
  }

  setPasswor = () => {
    const { phoneNumber,passWor } = this.state;
     const {state} = this.props.navigation;
    this.setState({ message: 'Sending code ...' });
            let formdata = [];
            let encodedKey = encodeURIComponent('mobile_number');
            let encodedValue = encodeURIComponent(state.params.mobile_number);
            let encodedPassword = encodeURIComponent("password");
            let encodedPassword_value = encodeURIComponent(passWor);
          formdata.push(encodedKey + "=" + encodedValue );
          formdata.push(encodedPassword + "=" + encodedPassword_value );
          formdata = formdata.join("&");
          console.log(formdata)
    // let formdata = new FormData();
    // formdata.append("mobile_number", phoneNumber)
    this._fetchApi(formdata)
  }

_fetchApi(formdata){
    fetch('http://192.168.1.12:80/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body:formdata
  })
  .then(res => {
      var tony = JSON.parse(res._bodyText);
      console.log(tony.token)
      if (res.status == 200) {
        if(tony.token != false){
          DefaultPreference.set('token', tony.token).then(function() {console.log("done")});
          DefaultPreference.get('token').then(function(value) {console.log(value)});
          nav.navigate("Profile");
        }
        else {
          console.log("Login Failed")
        }
      } else {
        nav.navigate('Otp');
      }
  }).catch(err => {
      console.log("error")
  });
}
  render() {
      const { navigate } = this.props.navigation;
      const { passWor} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <View style={styles.otpCon}>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15,color: 'white' }}
          onChangeText={value => this.setState({ passWor: value })}
          placeholder={'password ... '}
          value={passWor}
        />
        </View>
          <Button style={styles.addProductBtn} title="Sign In" color="#FF7214" onPress={this.setPasswor} />
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
