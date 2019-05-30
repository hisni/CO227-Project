import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';


const post = (props) => {

  return(
    <TouchableOpacity onPress={props.postClicked} style={styles.containerStyle}>
      <Text style={styles.comName}>{props.name}</Text>
      <Text  style={{textAlign: 'center'}}>{props.district}</Text>
    </TouchableOpacity>
  )

};

const styles = StyleSheet.create({
  containerStyle: {
    elevation:6,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    width: '90%',
    padding: 16,
    margin: 5,
    backgroundColor: '#b3ffcc',
    shadowColor: '#cc0000',
    shadowOpacity: 10
  },
  bigBlue: {
    width: '90%',
    padding: 16,
    margin: 5,
    backgroundColor: '#b3ffcc',
    shadowColor: '#cc0000',
    shadowOpacity: 10,
  },
  comName:{
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  }
});

export default post;
