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
  Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import PhoneAuthTest from './firebase';

const instructions = Platform.select({
  ios: 'Share your live current location\n' +
    'with your friends at any time',
  android: 'Share your live current location\n' +
    'with your friends at any time',
});

export default class HomeScreen extends Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <TouchableHighlight
            style={styles.addProductBtn} onPress={() => navigate('Login')}>

              <Text style={styles.addProduct}>
                Login / Register
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
