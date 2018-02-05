
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
var ImagePicker = require('react-native-image-picker');
import DefaultPreference from 'react-native-default-preference';
// More info on all the options is below in the README...just some common use cases shown here



export default class ProfilePic extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: '',

    };
  }
_handleButtonPress = () =>{
  var options = {
    title: 'Select Avatar',
    customButtons: [
      {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
    var token = DefaultPreference.get('token').then(function(value) {console.log("check type:")});
        //   let formdata = [];
        //   let encodedKey = encodeURIComponent('mobile_number');
        //   let encodedValue = encodeURIComponent(token);
        // formdata.push(encodedKey + "=" + encodedValue );
        // formdata = formdata.join("&");
        // console.log(formdata)
  // let formdata = new FormData();
  // formdata.append("mobile_number", phoneNumber)
  this._fetchApi(token)
  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info below in README)
   */
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      let source = { uri: response.uri };

      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      console.log(response.data);
      this.setState({
        avatarSource: source
      });
    }
  });
}
_fetchApi(token){
    fetch('http://192.168.1.12:80/setprofilepic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'token':token,
    },
  })
  .then(res => {
      var tony = JSON.parse(res._bodyText);
      console.log(tony)
      if (res.status == 200) {
        console.log("hi Buddy ");
      nav.navigate("Profile");
      } else {
        // nav.navigate('Otp');
      }
  }).catch(err => {
      console.log("error")
  });
}
// More info on all the options is below in the README...just some common use cases shown here
render() {
  const { avatarSource } = this.state;
  const { navigate } = this.props.navigation;
 return (
   <View>
     <Button title="Load Images" onPress={this._handleButtonPress} />
     <ScrollView>
    <Image source={this.avatarSource} style ={{ height: 100, width: 100, marginTop:30 }}  />
     </ScrollView>
      <Button title="Load Images" onPress={() => navigate('Mapsa')} />
   </View>
 );
}
}
