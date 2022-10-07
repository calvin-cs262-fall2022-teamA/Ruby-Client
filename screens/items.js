import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { globalStyles } from '../styles/global';
import Header from '../shared/header';
import items from "../testdata/testitems";
import {Item} from "../models/Item";
import { TextBox } from "../components/TextBox";
import ListItem from '../components/listitem';


export default function ItemScreen({ navigation }) {
    // Leave the remainder of the component unchanged.
    React.useEffect(() => {
        navigation.setOptions({ headerTitle: Header }); 
      }, [navigation]);

    const items = [(new Item({
        name: "Cups",
        amount: 200, 
        defaultIncrement: 20,
        minimumAmount: 10,
    })),
    (new Item({
        name: "Forks",
        amount: 300, 
        defaultIncrement: 10,
        minimumAmount: 10,
    })),
    (new Item({
        name: "Knives",
        amount: 300, 
        defaultIncrement: 10,
        minimumAmount: 10,
    })),
    (new Item({
        name: "Spoons",
        amount: 300, 
        defaultIncrement: 10,
        minimumAmount: 10,
    }))];
    

    return (
        
        <View> 
             <FlatList data={items} renderItem={({item})=>(
        <ListItem item={item} navigation={navigation}></ListItem>
    )}>
                
             </FlatList>
            
         </View>
    );
}

function showItem({item}) {
    return (
        <ListItem item={item} navigation={navigation}></ListItem>
    )
    
}