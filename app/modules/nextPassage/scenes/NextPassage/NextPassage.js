import React from 'react';
var { View, Alert, Picker, Item, Text } = require('react-native');

import {Button} from 'react-native-elements'
import {connect} from 'react-redux';

import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

import styles from "./styles"

import { actions as actionApi } from "../../index"
const { getTransport, getNextPassage } = actionApi;

//const { color } = theme;

class NextPassage extends React.Component {
  constructor(){
    super();
    this.state = { data: null, ligne: [], direction: [], arret: [], selectLigne: null, selectDirection: null, selectArret: null };
    this.emptyDataPicker = {name: "Selectionner", id: null};

    this.onPressBtnValider = this.onPressBtnValider.bind(this);
    this.onSuccessGetTransport = this.onSuccessGetTransport.bind(this);
    this.onError = this.onError.bind(this);
    this.onRefreshDirection = this.onRefreshDirection.bind(this);
    this.onSuccessNextPassage = this.onSuccessNextPassage.bind(this);

    getTransport(this.onSuccessGetTransport, this.onError);
  }

  onSuccessGetTransport(data) {
    let array = [];
    array.push(this.emptyDataPicker);
    data.child('bus').forEach(message => {
      if (message.val().name) {
        array.push({name: message.val().name, id: message.key});
      }
    });
    this.setState({ data: data, ligne: array });
  }

  onError(error) {
    let errObj = [];
    Alert.alert("Error", "Pas d'horaire");

    if (error.hasOwnProperty("message")) {
      errObj['general'] = error.message;
    } else {
      let keys = Object.keys(error);
      keys.map((key, index) => {
        errObj[key] = error[key];
      })
    }
  }

  onRefreshDirection() {
    let arrayDirection = [];
    arrayDirection.push(this.emptyDataPicker);
    this.setState({ direction: arrayDirection, arret: [] });

    if (this.state.data == null) { return; }

    this.state.data.child('bus').forEach(data => {
        if (data.key === this.state.selectLigne) {
          data.child('direction').forEach(direction => {
            arrayDirection.push({name: direction.val(), id: direction.key});
          });
        }
    });

    this.setState({direction: arrayDirection});
  }

  onRefreshArret() {
    let arrayArret = [];
    arrayArret.push(this.emptyDataPicker);
    this.setState({ arret: arrayArret });

    if (this.state.data == null) { return; }

    this.state.data.child('bus').forEach(data => {
      if (data.key === this.state.selectLigne) {
        data.child('arret').forEach(arret => {
          arrayArret.push({name: arret.val().name, id: arret.val().id});
        });
      }
    });

    this.setState({arret: arrayArret});
  }

  onPressBtnValider() {
    if (this.state.selectLigne == null) { Alert.alert("Veuillez sélectionner une ligne !"); return }
    else if (this.state.selectArret == null) { Alert.alert("Veuillez sélectionner un arret !"); return }

    getNextPassage(this.state.selectArret, this.onSuccessNextPassage, this.onError)
  }

  onSuccessNextPassage(data) {
    let today = new Date();
    let todayHour = ("0" + today.getHours()).slice(-2);
    let msghours = "";
    let count = 0;

    data.forEach(horaire => {
      let hour = horaire.val().split("h");
      if (hour[0] != null) {
        if ((parseInt(hour[0]) >= parseInt(todayHour)) && count <= 3) {
          count++;
          msghours += "- " + horaire.val() + "\n";
        }
      }
    });

    Alert.alert("Vos prochains passages", (msghours !== "") ? msghours : "Vous n'avez pas de prochain passage");
  }

  render() {

    let ligne = this.state.ligne.map((item) =>
        <Item label={item.name} value={item.id} key={item.id} />
    );

    let direction = this.state.direction.map((item) =>
        <Item label={item.name} value={item.id} key={item.id} />
    );

    let arret = this.state.arret.map((item) =>
        <Item label={item.name} value={item.id} key={item.id} />
    );

    return (
        <View style={ styles.mainContainer }>
          <Text style={ styles.textLabel }>Ligne</Text>
          <Picker
              mode="dropdown"
              placeholder="List"
              onValueChange={(itemValue) => this.setState({selectLigne: itemValue}, () => { this.onRefreshDirection() })}
              selectedValue={this.state.selectLigne}
          >{ligne}
          </Picker>

          <Text style={ styles.textLabel }>Direction</Text>
          <Picker
              mode="dropdown"
              placeholder="List"
              onValueChange={(itemValue) => this.setState({selectDirection: itemValue}, () => { this.onRefreshArret() })}
              selectedValue={this.state.selectDirection}
          >{direction}
          </Picker>

          <Text style={ styles.textLabel }>Arret</Text>
          <Picker
              mode="dropdown"
              placeholder="List"
              onValueChange={(itemValue) => this.setState({selectArret: itemValue})}
              selectedValue={this.state.selectArret}
          >{arret}
          </Picker>

          <Button
              buttonStyle={styles.buttonStyle}
              title='VALIDER'
              onPress={this.onPressBtnValider}/>
        </View>

    );
  }
}

export default connect(null, { getTransport, getNextPassage })(NextPassage);