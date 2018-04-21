import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  bottomContainer:{
    backgroundColor:"white",
    paddingVertical: padding * 3,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },

  buttonContainer:{
    justifyContent:"center",
    alignItems:"center"
  },

  badgeItinerary: {
    backgroundColor: "rgba(00,00,00,0.8)",
    position: 'absolute',
    top: 10,
    right:10,
    justifyContent:"flex-end",
    alignItems:"flex-end"
  },

  viewMaps: {
    width:'100%',
    height: '100%'
  },

  textColorWhite: {
    color: "white"
  }
});

export default styles;