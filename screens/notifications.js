import React from 'react';
import { View, Button, FlatList, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function Notifications({navigation, route}) {


  return (
    <View style={notifStyles.notifPage}>
      <View style={notifStyles.notifObj}>
        <Icon name="priority-high" size={35} style={notifStyles.notifIcon}></Icon>
      
        <View style={notifStyles.notifContainer}>
           <Text style={notifStyles.notifText}>The intentory of an Item is too low. Restock Soon.</Text>
        </View>
      </View>
      
    </View>
  );
}

const notifStyles = StyleSheet.create({
  notifPage: {
    justifyContent: 'center'
  },
  notifContainer: {
    borderColor: "rgb(37,65,81)",
    borderWidth: 5,
    backgroundColor: 'rgb(37,65,81)',

    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 270,
    borderRadius: 25,
    marginLeft: 0,
    marginRight: 0,
    marginVertical: 0, 

  },
  notifObj: {
    borderColor: "rgb(37,65,81)",
    borderWidth: 5,
    backgroundColor: 'grey',

    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginLeft: '7.5%',
    borderRadius: 30,
    margin: 10,

  },
  notifIcon: {
    padding: 5,
    marginLeft: 10,
    alignSelf: 'center',
    backgroundColor: 'rgb(255, 0, 102)',
    borderRadius: 25,
    
  },
  notifText: {
    padding: 5,
    marginLeft:"2%",
    color: 'white',
    fontSize: 15,
    
  }


})