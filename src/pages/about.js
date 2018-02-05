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


export default class AboutScreen extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
        We help startups launch their products </Text>
        <Text style={styles.instructions}>
        At Astranix, our primary focus is on understanding
        the problem statement.
        We focus on your needs and write software that fulfills
        it.
         We provide software solutions for TouchableHighlight
        kinds of interfacesfrom web to mobile</Text>

        <Text style={styles.instructions}>Contact us</Text>

        <Text style={styles.instructions}>9994737123</Text>

        <Text style={styles.instructions}>prithvi.naren@gmail.com
        </Text>

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
  instructions: {
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  });
