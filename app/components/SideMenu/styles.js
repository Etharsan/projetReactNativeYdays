import { StyleSheet } from 'react-native';

import { color, fontFamily, padding, fontSize } from "../../styles/theme"

const styles = StyleSheet.create({
  allContent: {
    backgroundColor: color.mainGrey,
    height: '100%'
  },
  imageHeader: {
    height: 100,
    width: '35%',
    alignSelf: 'center',
    marginTop: 20
  },
  container: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 30
  },
  imageFooter: {
    position: 'absolute',
    bottom:0,
    height: 150,
    width:'100%',
    alignSelf: "stretch",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  textCopyright: {
    fontFamily: fontFamily.extrabold,
    paddingBottom: 5
  }

});

export default styles;