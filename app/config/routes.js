import React from 'react';
import { Scene, Router, ActionConst, Stack, Modal, Tabs, Drawer } from 'react-native-router-flux';

//Splash Component
import Splash from '../components/Splash/Splash';
import SideMenu from '../components/SideMenu/SideMenu';

//Authentication Scenes
import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import CompleteProfile from '../modules/auth/scenes/CompleteProfile';
import Login from '../modules/auth/scenes/Login';
import ForgotPassword from '../modules/auth/scenes/ForgotPassword';
import Home from '../modules/home/scenes/Home';
import NextPassage from '../modules/nextPassage/scenes/NextPassage';
import MyTransports from '../modules/myTransports/scenes/MyTransports/MyTransports';
import Account from '../modules/account/scenes/Account/Account';
import AddMyTransports from '../modules/myTransports/scenes/AddMyTransport/AddMyTransport';
import AddMyItinerary from '../modules/myItinerary/scenes/AddMyItinerary/AddMyItinerary';
import MyItinerary from '../modules/myItinerary/scenes/MyItinerary/MyItinerary';

//Import Store, actions
import store from '../redux/store'
import { checkLoginStatus } from "../modules/auth/actions";

import { color, navTitleStyle } from "../styles/theme";

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      isLoggedIn: false
    }
  }

  componentDidMount() {
    let _this = this;
    store.dispatch(checkLoginStatus((isLoggedIn) => {
      _this.setState({isReady: true, isLoggedIn});
    }));
  }

  render() {
    if (!this.state.isReady)
      return <Splash/>

    return (
        <Router>
          <Scene key="root" hideNavBar
                 navigationBarStyle={{backgroundColor: color.mainGrey}}
                 titleStyle={navTitleStyle}
                 backButtonTintColor={color.black}
                 tintColor={color.black}>

            <Stack key="Auth" initial={!this.state.isLoggedIn}>
              <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar/>
              <Scene key="Register" component={Register} title="Register" back/>
              <Scene key="CompleteProfile" component={CompleteProfile} title="Select Username" back={false}/>
              <Scene key="Login" component={Login} title="Login"/>
              <Scene key="ForgotPassword" component={ForgotPassword} title="Forgot Password"/>
            </Stack>

            <Drawer
                hideNavBar
                drawerWidth={250}
                drawerPosition="left"
                contentComponent={SideMenu}
                initial={this.state.isLoggedIn}
                type={ActionConst.REPLACE}>
              <Stack key="Main" initial={this.state.isLoggedIn}>
                <Scene key="Home" component={Home} title="Home" initial={true} type={ActionConst.REPLACE}/>
                <Scene key="NextPassage" component={NextPassage} title="NextPassage" type={ActionConst.REPLACE}/>
                <Scene key="MyTransports" component={MyTransports} title="MyTransports" type={ActionConst.REPLACE}/>
                <Scene key="Account" component={Account} title="Account" type={ActionConst.REPLACE}/>
                <Scene key="AddMyTransports" component={AddMyTransports} title="AddMyTransports" back/>
                <Scene key="AddMyItinerary" component={AddMyItinerary} title="AddMyItinerary" back/>
                <Scene key="MyItinerary" component={MyItinerary} title="MyItinerary" type={ActionConst.REPLACE}/>
              </Stack>
            </Drawer>

          </Scene>
        </Router>
    )
  }
}