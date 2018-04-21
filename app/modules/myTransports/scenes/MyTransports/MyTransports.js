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
import AddMyTransports from "../AddMyTransport/AddMyTransport";

//import { updateTodoList, deleteTodoList, queryAllTodoLists, insertNewTodoList } from "../../realm/allSchemas"
//import realm from "../../realm/allSchemas"

//const { color } = theme;

class MyTransports extends React.Component {
  constructor(){
    super();

    this.state = { data: [] };
    this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);

    this.getData()

    /*const newTransportList = {
      id: Math.floor(Date.now() / 1000),
      name: "test",
      creationDate: new Date()
    };

    this.reloadData();
    realm.addListener('change', () => {
      this.reloadData();
    });*/
  }

  componentWillReceiveProps() {
    this.getData()
  }

  async getData() {
    try {
      const value = await AsyncStorage.getItem('mytransport');
      this.setState({data: JSON.parse(value)});
    } catch (error) {
      Alert.alert("Error retrieving data : " + error);
    }
  }

  async setData(value) {
    try {
      await AsyncStorage.setItem('mytransport', value);
    } catch (error) {
      Alert.alert("Error saving data" + error);
    }
  }

  /*reloadData = () => {
    queryAllTransportLists().then((todoLists) => {
      this.setState({ todoLists });
    }).catch((error) => {
      this.setState({ todoLists: [] });
    });
  };*/

  showDeleteConfirmation(item) {
    Alert.alert(
        'Supprimer',
        'Supprimer mon transport',
        [
          {
            text: 'Annuler', onPress: () => { },
            style: 'cancel'
          },
          {
            text: 'Oui', onPress: () => {
              let filteredArray = this.state.data.filter(_item => _item.id !== item.id);
              this.setData(JSON.stringify(filteredArray));
              this.getData();
            }
          },
        ],
        { cancelable: true }
    );
  };

  render() {

    return (
        <View>
          <Badge containerStyle={{ backgroundColor: color.transparentBlack, marginRight:80, marginLeft:80, marginTop:10}}
                 onPress={Actions.AddMyTransports} >
            <Text>Ajouter un transport</Text>
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
                          title={item.ligne}
                          subtitle={item.direction}
                          avatar={(item.transport === "bus") ? require('../../../../assets/images/bus_icon.png') : require('../../../../assets/images/tram_icon.png') }
                          hideChevron="true"
                      />
                    </Swipeout >
                )}
            />
          </List>
        </View>
    );
  }
}




export default connect(null, { })(MyTransports);