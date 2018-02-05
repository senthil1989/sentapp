import React, { Component } from 'react';
import { Platform,View, Button, Text, TextInput, Image,StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import { StackNavigator } from 'react-navigation';

const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';
const instructions = Platform.select({
  ios: 'Share your live mokka current location\n' +
    'with your friends at any time',
  android: 'Share your live current location\n' +
    'with your friends at any time',
});

export default class PhoneAuthTest extends Component {

  constructor(props) {
    super(props);
    this.unsubscribe = null;
    nav = this.props.navigation;
    this.phoneNumberr ='';
    this.confirmResultts ='';
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '',
      confirmResult: null,
    };
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          phoneNumber: '',
          confirmResult: null,
        });
      }
    });

  }

  componentWillUnmount() {
     if (this.unsubscribe) this.unsubscribe();
  }

  signIn = () => {
    const { phoneNumber } = this.state;
    this.setState({ message: 'Sending code ...' });

            let formdata = [];
            let encodedKey = encodeURIComponent('mobile_number');
            let encodedValue = encodeURIComponent(phoneNumber);
             this.phoneNumberr=  phoneNumber;
          formdata.push(encodedKey + "=" + encodedValue);
          formdata = formdata.join("&");
    // let formdata = new FormData();
    // formdata.append("mobile_number", phoneNumber)
    this._fetchApi(formdata)
  }

_fetchApi(formdata){
    fetch('http://192.168.1.12:80/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body:formdata
  })
  .then(res => {
      var tony = JSON.parse(res._bodyText);
      console.log(tony.available)
      if (res.status == 200) {
        if(tony.available == true){
        nav.navigate('Password', {mobile_number: this.phoneNumberr});
      }
      else if(tony.available == false)  {
        firebase.auth().signInWithPhoneNumber(this.phoneNumberr)
          .then(confirmResult => {this.setState({ confirmResult, message: 'Code has been sent!' }); nav.navigate('Otp',{confirmResultts: confirmResult,mobile_number: this.phoneNumberr})})
          .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));

      }
    }
  }).catch(err => {
      console.log("error")
  });
}
    //9944649143
    // firebase.auth().signInWithPhoneNumber(phoneNumber)
    //   .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
    //   .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
    //   this._fetchApi(phoneNumber)

  // _fetchApi = () => {
  //   const { phoneNumber } = this.state;
  //
  //   fetch('http://192.168.1.16/check', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: JSON.stringify({
  //     mobile_number: 'phoneNumber',
  //   }),
  // })
  // .then(response => {
  //     console.log(response)
  //     if (response.status == 200) {
  //       this._showAlert(response._bodyText)
  //     } else {
  //       this._showAlert(response._bodyText)
  //     }
  // }).catch(err => {
  //     this._showAlert(err)
  //     console.log(err)
  // });
  // }

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          this.setState({ message: 'Code Confirmed!' });
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    }
  };
// idTok =() => {
//   firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
// console.log(idToken)
//   // Send token to your backend via HTTPS
//   // ...
// }).catch(function(error) {
//   // Handle error
// });
// }
  signOut = () => {

    firebase.auth().signOut();
  }

  renderPhoneNumberInput() {
   const { phoneNumber,confirmResult } = this.state;

    return (
      <View style={styles.container}>

        <Text style={styles.instructions}>
          {instructions}
        </Text>

        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15,color: 'white' }}
          onChangeText={value => this.setState({ phoneNumber: value })}
          placeholder={'Phone number ... '}
          value={phoneNumber}
        />
        <Button style={styles.addProductBtn} title="Sign In" color="#FF7214" onPress={this.signIn} />
      </View>

    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!!message.length) return null;

    return (
      <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
    );
  }

  renderVerificationCodeInput() {
    const { codeInput,confirmResult } = this.state;

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
        <Button title="Confirm Code" color="#FF7214" onPress={this.confirmCode} />
      </View>
    );
  }
  // renderpassword() {
  //   console.log("thejlkjkdsj");
  //   const { codeInput } = this.state;
  //
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.instructions}>
  //         {instructions}
  //       </Text>
  //       <View >
  //       <TextInput
  //         autoFocus
  //         style={{ height: 40, marginTop: 15, marginBottom: 15 }}
  //         onChangeText={value => this.setState({ codeInput: value })}
  //         placeholder={'Enter Password'}
  //         value={codeInput}
  //       />
  //       </View>
  //       <Button title="Confirm Code" color="#FF7214" onPress={this.confirmCode} />
  //     </View>
  //   );
  // }
  render() {
    const { user, confirmResult } = this.state;
    return (
      <View style={{ flex: 1 }}>

        {user &&  this.renderPhoneNumberInput()}

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
    height:90,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'#FF7214',
    fontSize: 14,
    flex:2,
    color: 'white',
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
