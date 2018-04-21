import React from 'react';
var { View, Alert, Picker, Item, Text, ActivityIndicator } = require('react-native');

import {Button, FormInput, FormLabel } from 'react-native-elements'
import {connect} from 'react-redux';

import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

import styles from "./styles"

import { actions as actionApi } from "../../index"
import {AsyncStorage} from "react-native";
const { getAllFriends, createItinerary } = actionApi;
import {Actions} from 'react-native-router-flux';

import { Permissions, Location } from 'expo';

//const { color } = theme;

class AddMyItinerary extends React.Component {
  constructor(){
    super();
    this.state = { user: {}, nameItinerary: "", address: "", friends: [], selectedFriend: null, inProgress: false };

    this.onError = this.onError.bind(this);
    this.onSuccessGetAllFriends = this.onSuccessGetAllFriends.bind(this);
    this.onPressBtnValider = this.onPressBtnValider.bind(this);
    this.setToFirebase = this.setToFirebase.bind(this);
    this.onSuccessCreate = this.onSuccessCreate.bind(this);

    AsyncStorage.getItem('user', (err, user) => {
      let _user = JSON.parse(user);
      this.setState({user: _user});
      getAllFriends(_user.uid, this.onSuccessGetAllFriends, this.onError)
    });
  }

  componentDidMount() {
    Permissions.askAsync(Permissions.LOCATION);
  }

  onSuccessGetAllFriends(data) {
    let arrayFriends = [];

    arrayFriends.push({friend: "Selectionner", id: null});
    data.forEach(friend => {
      arrayFriends.push(friend.val());
    });

    this.setState({ friends: arrayFriends });
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

  onPressBtnValider() {
    if (this.state.nameItinerary === "") { Alert.alert("Veuillez mettre un nom d'itinéraire !"); return }
    else if (this.state.address === "") { Alert.alert("Veuillez mettre une addresse !"); return }
    else if (this.state.selectedFriend == null) { Alert.alert("Veuillez sélectionner un amis !"); return }

    this._attemptGeocodeAsync();
  }

  _attemptGeocodeAsync = async () => {
    this.setState({ inProgress: true });
    try {
      let result = await Location.geocodeAsync(this.state.address);
      if (result != null && result !== []) {
        this.setToFirebase(result[0].longitude, result[0].latitude);
      } else {
        Alert.alert("Addresse non valide");
      }
    } catch (e) {
      Alert.alert(e.message);
    } finally {
      this.setState({ inProgress: false });
    }
  };

  setToFirebase(longitude, latitude) {
    let data = {
      name: this.state.nameItinerary,
      address: this.state.address,
      id: Math.floor(Math.random() * 10000) + 1,
      friendId: this.state.selectedFriend,
      longitude: longitude,
      latitude: latitude
    };

    createItinerary(this.state.user.uid, data, this.onSuccessCreate, this.onError)
  }

  onSuccessCreate() {
    Actions.pop({refresh: true});
  }

  render() {

    let friends = this.state.friends.map((item) =>
        <Item label={item.friend} value={item.id} key={item.id} />
    );

    if (this.state.inProgress) {
      return <ActivityIndicator style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }} />;
    } else {
      return (
          <View style={ styles.mainContainer }>
            <FormLabel>Nom de l'itinéraire</FormLabel>
            <FormInput onChangeText={(text) => {this.setState({ nameItinerary: text }); }}/>
            <FormLabel>Adresse</FormLabel>
            <FormInput onChangeText={(text) => {this.setState({ address: text }); }}/>
            <FormLabel>Mes amis</FormLabel>
            <Picker
                style={{marginLeft:10}}
                mode="dropdown"
                placeholder="List"
                onValueChange={(itemValue) => this.setState({selectedFriend: itemValue})}
                selectedValue={this.state.selectedFriend}
            >{friends}
            </Picker>
            <Button
                buttonStyle={styles.buttonStyle}
                title='VALIDER'
                onPress={this.onPressBtnValider}/>
          </View>
      );
    }
  }
}

export default connect(null, { getAllFriends, createItinerary })(AddMyItinerary);