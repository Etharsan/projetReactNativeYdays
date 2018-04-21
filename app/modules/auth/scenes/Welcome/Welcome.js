import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

import {Button, SocialIcon, Divider} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux';

import {actions as auth} from "../../index"
const {} = auth;

import styles from "./styles"

class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Image style={[styles.image, {backgroundColor: 'transparent'}]} source={require('../../../../assets/images/Logo_ios_App.png')}/>
            <Text style={styles.title}>Travel Transport</Text>
          </View>

          <View style={styles.bottomContainer}>
            <View style={[styles.buttonContainer]}>

              <Button
                  raised
                  borderRadius={4}
                  title={"S'INSCRIRE"}
                  containerViewStyle={[styles.containerView]}
                  buttonStyle={[styles.button]}
                  textStyle={styles.buttonText}
                  onPress={Actions.Register}/>
            </View>
            <View style={styles.bottom}>
              <Text style={styles.bottomText}>
                As-tu déja un compte ?
              </Text>

              <TouchableOpacity onPress={Actions.Login}>
                <Text style={styles.signInText}>
                  Se connecter
                </Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
    );
  }
}


export default connect(null, {})(Welcome);