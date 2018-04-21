import React from 'react';
import MapView, { Marker } from 'react-native-maps';
var { View, StyleSheet, Alert, Image, Dimensions, Text } = require('react-native');
import MapViewDirections from 'react-native-maps-directions';

import { Badge } from 'react-native-elements'
import {connect} from 'react-redux';

import { Location, Permissions } from 'expo';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"
const { signOut } = auth;

import { actions as actionApi } from "../../index"
import {AsyncStorage} from "react-native";
const { getAllItinerary, getUserById } = actionApi;

const { color } = theme;

// FOR ITINERARY
const GOOGLE_MAPS_APIKEY = 'AIzaSyA9fmB4CseLuYgx3VJosec3ayAQA5b472I';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 44.8377890;
const LONGITUDE = -0.5791800;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Home extends React.Component {
  constructor(){
    super();

    this.onSuccessGetAllItineraries = this.onSuccessGetAllItineraries.bind(this);
    this.onError = this.onError.bind(this);
    this.onSuccessGetUserId = this.onSuccessGetUserId.bind(this);
    this.getIconByColor = this.getIconByColor.bind(this);
    this.getStorageItinerary = this.getStorageItinerary.bind(this);

    this.state = { user: {}, marks: [], userLocation: {coords: { latitude: 37.78825, longitude: -122.4324}}, itinerary: null };

    this.mapView = null;

    AsyncStorage.getItem('user', (err, user) => {
      let _user = JSON.parse(user);
      this.setState({user: _user});
      getAllItinerary(_user.uid, this.onSuccessGetAllItineraries, this.onError);
      this.getStorageItinerary()
    });
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return;
    }

    let userLocation = await Location.getCurrentPositionAsync({});
    this.setState({ userLocation });
  };

  async getStorageItinerary() {
    try {
      const value = await AsyncStorage.getItem('itinerary');
      this.setState({ itinerary: JSON.parse(value) });
      AsyncStorage.removeItem('itinerary');
    } catch (error) {
      console.log("No itinerary");
    }
  }

  onError(error) {
    let errObj = [];

    if (error.hasOwnProperty("message")) {
      errObj['general'] = error.message;
    } else {
      let keys = Object.keys(error);
      keys.map((key, index) => {
        errObj[key] = error[key];
      })
    }
  }

  onSuccessGetAllItineraries(data) {
    data.forEach(itinerary => {
      if (itinerary.val().friendId) {
        getUserById(itinerary.val().friendId, itinerary.val(), this.onSuccessGetUserId, this.onError);
      }
    });
  }

  onSuccessGetUserId(user, itinerary) {
    let mark = {
      id: itinerary.id,
      name: itinerary.name,
      friendName: user.val().username,
      coordinate: {
        latitude: itinerary.latitude,
        longitude: itinerary.longitude,
      },
      address: itinerary.address,
      color: user.val().color
    };

    this.setState({ marks: [...this.state.marks, mark]});
  }

  getIconByColor(color) {
    switch (color) {
      case "#e74c3c": return require('../../../../assets/images/amis_logo_rouge.png');
      case "#3498db": return require('../../../../assets/images/amis_logo_bleu.png');
      case "#2ecc71": return require('../../../../assets/images/amis_logo_vert.png');
      case "#f1c40f": return require('../../../../assets/images/amis_logo_orange.png');
      case "#1abc9c": return require('../../../../assets/images/amis_logo_turquoise.png');
      case "#9b59b6": return require('../../../../assets/images/amis_logo_rouge.png');
      case "#34495e": return require('../../../../assets/images/amis_logo_noir.png');
      default: return require('../../../../assets/images/amis_logo_noir.png');
    }
  }

  render() {

    let marks = this.state.marks.map((mark) =>
        <Marker
            title={mark.name}
            description={"Amis : " + mark.friendName}
            coordinate={mark.coordinate}
            image={this.getIconByColor(mark.color)}>
        </Marker>
    );

    return (
        <View style={styles.viewMaps}>
        <MapView
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            style={styles.map}
            ref={c => this.mapView = c}
            showsUserLocation={true}>
          {marks}
          {(this.state.itinerary != null) && (
              <MapViewDirections
                  origin={this.state.itinerary.coordinates[0]}
                  waypoints={ (this.state.itinerary.coordinates.length > 2) ? this.state.itinerary.coordinates.slice(1, -1): null}
                  destination={this.state.itinerary.coordinates[this.state.itinerary.coordinates.length-1]}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={3}
                  strokeColor={this.state.itinerary.color}
                  onStart={(params) => {
                    console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                  }}
                  onReady={(result) => {
                    this.mapView.fitToCoordinates(result.coordinates, {
                      edgePadding: {
                        right: (width / 20),
                        bottom: (height / 20),
                        left: (width / 20),
                        top: (height / 20),
                      }
                    });
                  }}
                  onError={(errorMessage) => {
                    console.log('GOT AN ERROR');
                  }}
              />
          )}
        </MapView>
          {(this.state.itinerary != null) && (
              <View>
            <Badge containerStyle={[styles.badgeItinerary, {backgroundColor: this.state.itinerary.color}]} >
              <Text style={styles.textColorWhite}>Amis: {this.state.itinerary.friendName}</Text>
            </Badge>
              <Badge containerStyle={[styles.badgeItinerary, {backgroundColor: this.state.itinerary.color, top: 38}]} >
              <Text style={styles.textColorWhite}>Nom de l'itinéraire: {this.state.itinerary.name}</Text>
              </Badge>
                <Badge containerStyle={[styles.badgeItinerary, {backgroundColor: this.state.itinerary.color, top: 66}]} >
              <Text style={styles.textColorWhite}>Adresse: {this.state.itinerary.address}</Text>
                </Badge>
              </View>
          )}
        </View>
    );
  }
}

export default connect(null, { signOut, getAllItinerary, getUserById })(Home);