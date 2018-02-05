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
  View,
  ScrollView,
  TouchableHighlight,
  Image,TextInput,Button
} from 'react-native';
import PTTextInput from '../components/PTTextInput';
import DefaultPreference from 'react-native-default-preference';

const instructions = Platform.select({
  ios: 'Create User',
  android: 'Create User',
});

export default class NewpassScreen extends Component<{}> {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    nav = this.props.navigation;
    this.state = {
      Cpassword:'',
      passWor:'',
      UserName:'',
      EmailId:''

    };
  }
  // componentDidMount() {
  //   this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       this.setState({ user: user.toJSON() });
  //     } else {
  //       // User has been signed out, reset the state
  //       this.setState({
  //         user: null,
  //         message: '',
  //         codeInput: '',
  //         phoneNumber: '',
  //         confirmResult: null,
  //       });
  //     }
  //   });
  //
  // }
  newPasswor = () => {
    const {Cpassword, passWor,UserName,EmailId} = this.state;
     const {state} = this.props.navigation;
    this.setState({ message: 'Sending code ...' });
    if(passWor == Cpassword){
            let formdata = [];
            let encodedKey = encodeURIComponent('mobile_number');
            let encodedValue = encodeURIComponent(state.params.phoneNumber);
            let encodedPassword = encodeURIComponent("password");
            let encodedPasswordvalue = encodeURIComponent(passWor);
            let encodedName = encodeURIComponent('name');
            let encodedNameValue = encodeURIComponent(UserName);
            let encodedEmail = encodeURIComponent("email");
            let encodedEmailvalue = encodeURIComponent(EmailId);
            let encodedToken = encodeURIComponent("idtoken");
            let encodedTokenvalue = encodeURIComponent(state.params.token);
          formdata.push(encodedKey + "=" + encodedValue );
          formdata.push(encodedPassword + "=" + encodedPasswordvalue );
          formdata.push(encodedName + "=" + encodedNameValue );
          formdata.push(encodedEmail + "=" + encodedEmailvalue );
          formdata.push(encodedToken + "=" + encodedTokenvalue );
          formdata = formdata.join("&");
          console.log(formdata)
    // let formdata = new FormData();
    // formdata.append("mobile_number", phoneNumber)
    this._fetchApi(formdata)
  }
  else{
    console.log("password and confirmPassword not match");
  }
}

_fetchApi(formdata){
    fetch('http://192.168.1.12:80/verifyIdToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body:formdata
  })
  .then(res => {
      var tony = JSON.parse(res._bodyText);
      console.log(tony)
      if (res.status == 200) {
        console.log("hi Buddy ");
      DefaultPreference.set('token', tony.token).then(function() {console.log("done")});
      DefaultPreference.get('token').then(function(value) {console.log(value)});
      nav.navigate("Profile");
      } else {
        // nav.navigate('Otp');
      }
  }).catch(err => {
      console.log("error")
  });
}
  render() {
      const { navigate } = this.props.navigation;
      const {state} = this.props.navigation;
       const {Cpassword, passWor,UserName,EmailId} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <View style={styles.otpCon}>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15,color: 'red' }}
          onChangeText={value => this.setState({ EmailId: value })}
          placeholder={'Enter your Email ID'}
          value={EmailId}
        />
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15,color: 'red' }}
          onChangeText={value => this.setState({ UserName: value })}
          placeholder={'Enter Your UserName'}
          value={UserName}
        />
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15,color: 'red' }}
          onChangeText={value => this.setState({ passWor: value })}
          placeholder={'Enter Your Password'}
          value={passWor}
        />
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15,color: 'red' }}
          onChangeText={value => this.setState({ Cpassword: value })}
          placeholder={'Enter Your Confirm Password'}
          value={Cpassword}
        />

        </View>
          <Button style={styles.addProductBtn} title="Sign In" color="#FF7214" onPress={this.newPasswor} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
