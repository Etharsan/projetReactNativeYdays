import React from 'react';
var { View, Alert, Text, FlatList } = require('react-native');
import { AsyncStorage } from 'react-native';

import {Button, List, ListItem, Avatar, FormInput, FormLabel, Badge } from 'react-native-elements'
import {connect} from 'react-redux';

import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

import Swipeout from 'react-native-swipeout';
import {Actions} from 'react-native-router-flux';

import styles from "./styles"

import { actions as actionApi } from "../../index"
const { getAllItinerary, removeItinerary, getUserById } = actionApi;

//const { color } = theme;

class MyItinerary extends React.Component {
  constructor(){
    super();

    this.state = { user: {}, data: [] };
    this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);
    this.onError = this.onError.bind(this);
    this.onSuccessGetAllItineraries = this.onSuccessGetAllItineraries.bind(this);
    this.onSuccessRemoveItinerary = this.onSuccessRemoveItinerary.bind(this);
    this.goToHome = this.goToHome.bind(this);
    this.onPressListAction = this.onPressListAction.bind(this);

    AsyncStorage.getItem('user', (err, user) => {
      let _user = JSON.parse(user);
      this.setState({user: _user});
      getAllItinerary(_user.uid, this.onSuccessGetAllItineraries, this.onError)
    });
  }

  componentWillReceiveProps() {
    getAllItinerary(this.state.user.uid, this.onSuccessGetAllItineraries, this.onError)
  }

  onSuccessGetAllItineraries(data) {
    let array = [];

    data.forEach(itinerary => {
      array.push(itinerary.val());
    });

    this.setState({ data: array });
  }

  onError(error) {
    let errObj = [];
    Alert.alert("Information", "Pas de données");

    if (error.hasOwnProperty("message")) {
      errObj['general'] = error.message;
    } else {
      let keys = Object.keys(error);
      keys.map((key, index) => {
        errObj[key] = error[key];
      })
    }
  }

  showDeleteConfirmation(item) {
    Alert.alert(
        'Supprimer',
        'Supprimer mon itinéraire',
        [
          {
            text: 'Annuler', onPress: () => { },
            style: 'cancel'
          },
          {
            text: 'Oui', onPress: () => {
              removeItinerary(this.state.user.uid, item, this.onSuccessRemoveItinerary, this.onError);
            }
          },
        ],
        { cancelable: true }
    );
  };

  onSuccessRemoveItinerary(item) {
    let filteredArray = this.state.data.filter(_item => _item.id !== item.id);
    this.setState({data: filteredArray});
  }

  onPressListAction(value) {
    getUserById(value.friendId, value, this.goToHome, this.onError);
  }

  async goToHome(user, value) {
    try {
      let itinerary = {
        id: value.id,
        address: value.address,
        name: value.name,
        color: user.val().color,
        friendName: user.val().username,
        coordinates: [
          {
            latitude: 44.8377890,
            longitude: -0.5791800,
          },
          {
            latitude: value.latitude,
            longitude: value.longitude,
          }
        ]
      };
      await AsyncStorage.setItem('itinerary', JSON.stringify(itinerary));
      Actions.Home();
    } catch (error) {
      Alert.alert("Error saving data" + error);
    }
  }

  render() {

    return (
        <View>
          <Badge containerStyle={{ backgroundColor: color.transparentBlack, marginRight:80, marginLeft:80, marginTop:10}}
                 onPress={Actions.AddMyItinerary} >
            <Text>Ajouter un itinéraire</Text>
          </Badge>
          <List>
            <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                    <Swipeout right={[
                      {
                        text: 'Delete',
                        backgroundColor: 'rgb(217, 80, 64)',
                        onPress: () => this.showDeleteConfirmation(item)
                      }
                    ]} autoClose={true}>
                      <ListItem
                          title={item.name}
                          subtitle={item.address}
                          hideChevron="true"
                          onPress={() => {this.onPressListAction(item)}}
                      />
                    </Swipeout >
                )}
            />
          </List>
        </View>
    );
  }
}


export default connect(null, { getAllItinerary, removeItinerary, getUserById })(MyItinerary);