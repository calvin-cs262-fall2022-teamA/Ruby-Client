import React from 'react';
import { View, Button, FlatList, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function Notifications({navigation, route}) {


  return (
    <View style={notifStyles.notifPage}>
      <View style={notifStyles.notifContainer}>
        <Icon name="priority-high" size={35} style={notifStyles.notifIcon}></Icon>
        <Text style={notifStyles.notifText}>This will house the notifications for item quantity alerts.</Text>
      </View>
      
      
    </View>
  );
}

const notifStyles = StyleSheet.create({
  notifPage: {
    justifyContent: 'center'
  },
  notifContainer: {
    borderColor: "red",
    borderWidth: 5,

    flexDirection: 'row',
    width: '85%',
    marginLeft: '7.5%',
    borderRadius: 25,
    margin: 10,

  },
  notifIcon: {
    padding: 5,
    alignSelf: 'center',
    
  },
  notifText: {
    padding: 5,
    
  }


})