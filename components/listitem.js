import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { globalStyles } from '../styles/global';
import Header from '../shared/header';
import items from "../testdata/testitems";
import {Item} from "../models/Item";
import { TextBox } from "../components/TextBox";
import { ItemEditScreen } from '../screens/ItemEditScreen';
import Icon from 'react-native-vector-icons/Entypo';

export default function ListItem({item, navigation}) {
    
    const [increment, setIncrement] = React.useState(item.defaultIncrement);
    const [amount, setAmount] = React.useState(item.amount);
    return(
        <View style={globalStyles.listItemBorder}>
         <Text style={globalStyles.listItemText}>{item.name}</Text>
         <View style={globalStyles.editAmount}>
         <Text style={globalStyles.quantityText}>{amount}</Text>
         
          <TouchableOpacity
            style={globalStyles.subtractButton}
            onPress={() => {
              const incrementAsNumber = parseInt(increment);
              if (!isNaN(incrementAsNumber) && item.trySave("amount", item.amount - incrementAsNumber)) {
                setAmount(item.amount.toString());
              }
            }}>
            <Icon name="minus" style={globalStyles.incrementButtonText}></Icon>
          </TouchableOpacity>

          <TextBox style={globalStyles.amountText}
            value={increment}
            placeholder="Enter amount to change"
            keyboardType="numeric"
            onChangeText={setIncrement}
          />
        </View> 
          <TouchableOpacity onPress={() => 
            navigation.navigate("ItemEditScreen", item)
          }>
            <Icon name='edit' size = {20}></Icon> 
          </TouchableOpacity>
        </View>
    );
    

}