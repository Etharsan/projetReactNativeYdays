import React from 'react';
var { View, Alert, Text, FlatList } = require('react-native');

import { AsyncStorage } from 'react-native';
import {Button, List, ListItem, Avatar, FormInput, FormLabel } from 'react-native-elements'
import {connect} from 'react-redux';

import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

import styles from "./styles"
import * as t from "../../../auth/actionTypes";

import { actions as actionApi } from "../../index"
const { getAllFriends, createFriend, getAllUser, confirmFriend, updateColor } = actionApi;

//FOR DIALOG POPUP
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
} from 'react-native-popup-dialog';

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });

//const { color } = theme;

class Account extends React.Component {
  constructor(){
    super();
    this.state = { user: {}, friends: [], enAttente: [], darkColor: "#fff", inviteFriend: "" };

    this.onError = this.onError.bind(this);
    this.getColorDark = this.getColorDark.bind(this);
    this.getIconByColor = this.getIconByColor.bind(this);
    this.onSubmitInviteFriend = this.onSubmitInviteFriend.bind(this);
    this.onSuccessGetAllUser = this.onSuccessGetAllUser.bind(this);
    this.onSuccessCreateFriend = this.onSuccessCreateFriend.bind(this);
    this.onPressInviteAttente = this.onPressInviteAttente.bind(this);
    this.onSuccessConfirmFriend = this.onSuccessConfirmFriend.bind(this);
    this.onSuccessGetAllFriends = this.onSuccessGetAllFriends.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.onSuccessColor = this.onSuccessColor.bind(this);

    AsyncStorage.getItem('user', (err, user) => {
      this.setState({ user: JSON.parse(user) });
      this.getColorDark();
      getAllFriends(this.state.user.uid, this.onSuccessGetAllFriends, this.onError)
    });
  }

  onSuccessGetAllFriends(data) {
    let arrayFriends = [];
    let arrayEnAttente = [];

    data.forEach(friend => {
      if (friend.val().attente === 1) {
        arrayEnAttente.push(friend.val());
      } else {
        arrayFriends.push(friend.val());
      }
    });

    this.setState({ friends: arrayFriends, enAttente: arrayEnAttente });
  }

  onError(error) {
    let errObj = [];
    //Alert.alert("Error", error.message);

    if (error.hasOwnProperty("message")) {
      errObj['general'] = error.message;
    } else {
      let keys = Object.keys(error);
      keys.map((key, index) => {
        errObj[key] = error[key];
      })
    }
  }

  renderHeader = () => {
    return <View style={{ alignItems: 'center', justifyContent: 'center', height: 40, backgroundColor: this.state.darkColor}}>
      <Text style={ styles.headerFlatListText }>Mes amis</Text>
    </View>;
  };

  renderHeader1 = () => {
    return <View style={{ alignItems: 'center', justifyContent: 'center', height: 40, backgroundColor: this.state.darkColor}}>
      <Text style={ styles.headerFlatListText }>En attente</Text>
    </View>;
  };

  getColorDark() {
    if (this.state.user.color == null) { return; }
     switch (this.state.user.color) {
       case "#e74c3c": this.setState({ darkColor: "#c0392b"}); break;
       case "#3498db": this.setState({ darkColor: "#2980b9"}); break;
       case "#2ecc71": this.setState({ darkColor: "#27ae60"}); break;
       case "#f1c40f": this.setState({ darkColor: "#f39c12"}); break;
       case "#1abc9c": this.setState({ darkColor: "#16a085"}); break;
       case "#9b59b6": this.setState({ darkColor: "#8e44ad"}); break;
       case "#34495e": this.setState({ darkColor: "#2c3e50"}); break;
     }
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

  // FOR DIALOG POPUP
  onSubmitInviteFriend() {
    if (this.state.user == null) { return; }

    if (this.state.inviteFriend === "") {
      this.refs.inviteFriend.shake();
      return;
    }
    else if (this.state.inviteFriend.toLowerCase() === this.state.user.username) {
      Alert.alert("Veuillez mettre un autre username que celui du votre !");
      this.refs.inviteFriend.shake();
      return;
    }

    getAllUser(this.onSuccessGetAllUser, this.onError);
  }

  onSuccessGetAllUser(data) {
    let isFinded = false;
    data.forEach(user => {
      if (user.val().username === this.state.inviteFriend.toLowerCase()) {
        let friend = {
          friend: user.val().username,
          color: user.val().color,
          attente: 1,
          id: user.key
        };
        let userData = {
          friend: this.state.user.username,
          color: this.state.user.color,
          attente: 1,
          id: this.state.user.uid
        };
        isFinded = true;
        createFriend(userData, friend, this.onSuccessCreateFriend, this.onError);
        return;
      }
    });

    if (!isFinded) {
      Alert.alert("Cette amis n'existe pas !");
    }
  }

  onSuccessCreateFriend() {
    this.refs.inviteFriend.clearText();
    this.slideAnimationDialog.dismiss();
    Alert.alert("Une demande vient d'être envoyer à votre amis");
    let friend = "";
    this.setState({inviteFriend: friend});
  }

  onPressInviteAttente(friend) {
    let userData = {
      friend: this.state.user.username,
      color: this.state.user.color,
      attente: 0,
      id: this.state.user.uid
    };
    Alert.alert(
        'Accepter la demande',
        'Voulez-vous que ' + friend.friend + ' soit votre amis ?',
        [
          {text: 'Oui', onPress: () => confirmFriend(userData, friend, this.onSuccessConfirmFriend, this.onError)},
          {text: 'Annuler', style: 'cancel'}
        ],
    )
  }

  onSuccessConfirmFriend(friend) {
    let filteredArray = this.state.enAttente.filter(item => item.id !== friend.id);
    this.setState({enAttente: filteredArray, friends: [...this.state.friends, friend]});
  }

  changeColor() {
    let RandomNumber = Math.floor(Math.random() * 7) + 1 ;
    let selectColor = () => {
      switch (RandomNumber) {
        case 1: return "#e74c3c";
        case 2: return "#3498db";
        case 3: return "#2ecc71";
        case 4: return "#f1c40f";
        case 5: return "#1abc9c";
        case 6: return "#9b59b6";
        case 7: return "#34495e";
        default: return "#34495e";
      }
    };

    updateColor(this.state.user.uid, selectColor(), this.onSuccessColor, this.onError);
  }

  onSuccessColor(color) {
    let user = this.state.user;
    user.color = color;
    this.getColorDark();
    let friends = this.state.friends;
    let enAttente = this.state.enAttente;
    this.setState({user: user, friends: [], enAttente: []});
    this.setState({friends: friends, enAttente: enAttente});

    AsyncStorage.multiSet([
      ['user', JSON.stringify(user)]
    ]);
  }

  render() {

    _keyExtractor = (item, index) => item.id;

    return (

      <View style={[styles.topContent, {backgroundColor: this.state.user.color}]}>

        <View style={{ height: 200, backgroundColor: this.state.user.color, justifyContent: 'center',
          alignItems: 'center' }} >
          <Avatar
              width={120}
              rounded
              source={require('../../../../assets/images/me.png')}
              overlayContainerStyle={"none"}
          />
          <Text style={{fontSize: fontSize.large, fontFamily: fontFamily.bold}}>{ this.state.user.username }</Text>
          <View style={styles.buttonAddFriend}>
            <Avatar
                width={28}
                rounded
                title="+"
                onPress={() => this.slideAnimationDialog.show()}
                activeOpacity={0.7}
            />
          </View>
          <View style={styles.buttonColor}>
            <Avatar
                width={28}
                rounded
                title="C"
                onPress={() => this.changeColor() }
                activeOpacity={0.7}
            />
          </View>
        </View>


        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{ flex:1, backgroundColor: color.mainGrey, marginRight:4}}>
            <List>
              <FlatList
                  data={this.state.friends}
                  renderItem={({ item }) => (
                      <ListItem
                          roundAvatar
                          title={item.friend}
                          avatar={this.getIconByColor(item.color)}
                          hideChevron="true"
                      />
                  )}
                  ListHeaderComponent={this.renderHeader}
                  keyExtractor={_keyExtractor}
              />
            </List>
          </View>
          <View style={{ flex:1, backgroundColor: color.mainGrey, marginLeft:4}}>
            <List>
              <FlatList
                  data={this.state.enAttente}
                  renderItem={({ item }) => (
                      <ListItem
                          roundAvatar
                          title={item.friend}
                          avatar={this.getIconByColor(item.color)}
                          hideChevron="true"
                          onPress={() => this.onPressInviteAttente(item) }
                      />
                  )}
                  ListHeaderComponent={this.renderHeader1}
                  keyExtractor={_keyExtractor}
              />
            </List>
          </View>
        </View>

        <PopupDialog
            ref={(popupDialog) => {
              this.slideAnimationDialog = popupDialog;
            }}
            dialogAnimation={slideAnimation}
            dialogTitle={<DialogTitle title="Inviter un amis" />}
            actions={[
              <DialogButton
                  text="Valider"
                  onPress={() => {
                    this.onSubmitInviteFriend()
                  }}
                  key="button-2"
              />,
              <DialogButton
                  text="Annuler"
                  onPress={() => {
                    this.slideAnimationDialog.dismiss();
                  }}
                  key="button-1"
              />
            ]}
        >
          <View style={styles.dialogContentView}>
            <FormLabel>Veuillez rentrer le username de votre amis</FormLabel>
            <FormInput ref="inviteFriend" onChangeText={(value) => this.setState({inviteFriend: value})} />
          </View>
        </PopupDialog>

      </View>
    );
  }
}

export default connect(null, { getAllFriends, createFriend, getAllUser, confirmFriend, updateColor })(Account);