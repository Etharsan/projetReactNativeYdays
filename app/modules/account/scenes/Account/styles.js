import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const styles = StyleSheet.create({

  topContent:{
    flex:1,
    flexDirection: 'column'
  },

  imageUser: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: color.mainGrey,
    borderRadius: 10
  },

  headerFlatListText: {
    fontSize:18,
    fontFamily: fontFamily.bold
  },

  buttonAddFriend: {
    position: 'absolute',
    bottom:0,
    right:0,
    marginBottom:5,
    marginRight:5
  },

  buttonColor: {
    position: 'absolute',
    bottom:0,
    right:30,
    marginBottom:5,
    marginRight:5
  },

  dialogContentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;