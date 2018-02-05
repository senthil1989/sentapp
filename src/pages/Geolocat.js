import React, { Component } from 'react';
import { View, Text ,StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Drawer from '../components/Drawers';
// import Message from '../components/Message';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "80%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
},
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
class GeolocationApp extends Component {
  constructor(props) {
      super(props);

      this.state = {
    markers: [{
      title: 'hello',
      coordinates: {
        latitude: 3.148561,
        longitude: 101.652778
      },
    },
    {
      title: 'hi',
      coordinates: {
        latitude: 3.149771,
        longitude: 101.655449
      },
    }]
  }
    }

    componentWillMount() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
          console.log('latitude':latitude);
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    }

    render() {
        const { region} = this.props;
        const{latitude,longitude} = this.state;

        return (
          <View style ={styles.container}>
            <MapView   style={styles.map} showsUserLocation={true}  followUserLocation={true}  zoomEnabled={true}  >
            {this.state.markers.map(marker => ( <MapView.Marker  coordinate={marker.coordinates}  title={marker.title}  /> ))}
            <Drawer/>
            </MapView>

          </View>
        );
      }
}

export default GeolocationApp;
// Google current_location-key:AIzaSyBAAyllQJuo6jEx71Oeaociq7lpVEc8ENE
