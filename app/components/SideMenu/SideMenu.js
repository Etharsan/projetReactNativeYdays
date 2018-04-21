import React from 'react';
import {Actions} from 'react-native-router-flux';
import { View, Text, Image, ImageBackground } from 'react-native';

import styles from './styles'
import {connect} from "react-redux";

import { actions as auth, theme } from "../../modules/auth/index"
const { signOut } = auth;

class SideMenu extends React.Component<{}> {
  constructor(props) {
    super(props);

    this.onSignOut = this.onSignOut.bind(this);
  };

  onSignOut() {
    this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
  }

  onSuccess() {
    Actions.reset("Auth")
  }

  onError(error) {
    Alert.alert('Oops!', error.message);
  }

  render() {
    return (
        <View style={styles.allContent}>
        <Image
            source={require('../../assets/images/Logo_ios_App.png')}
            style={styles.imageHeader}
        />
        <View style={styles.container}>
          <Text onPress={Actions.Home}>Map</Text>
          <Text onPress={Actions.NextPassage}>Next Passage</Text>
          <Text onPress={Actions.MyTransports}>Mes Transports</Text>
          <Text onPress={Actions.MyItinerary}>Mes Itinéraires</Text>
          <Text onPress={Actions.Account}>Mon compte</Text>
          <Text onPress={this.onSignOut}>Déconnexion</Text>
        </View>

          <ImageBackground
              source={require('../../assets/images/fond_ville.png')}
              style={styles.imageFooter}>
            <Text style={styles.textCopyright}>Copyright 2018 - TravelTransport</Text>
          </ImageBackground>
        </View>
    );
  }
}

export default connect(null, { signOut })(SideMenu);
