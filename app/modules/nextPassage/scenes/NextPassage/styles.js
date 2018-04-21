import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const styles = StyleSheet.create({

  mainContainer:{
    backgroundColor:color.mainGrey,
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop:60,
    width:'100%',
    height:'100%'
  },

  textLabel: {
    textAlign: 'center',
    fontSize:fontSize.large,
    fontFamily: fontFamily.bold,
  },

  buttonStyle: {
    marginTop: 30,
    backgroundColor: color.greenButton
  }
});

export default styles;