import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, View, Text } from 'react-native';

import { globalStyles } from '../styles/global';
import Icon from 'react-native-vector-icons/MaterialIcons';



export default function Header({ navigation }) {
    return (
        <View style={itemStyles.headerStyle}>
            <Text style={itemStyles.textStyle}>Item List</Text>
            <View style = {itemStyles.iconStyle}>
            <Icon name = "sort" size={30}></Icon>
            <Icon name = "search" size={30}></Icon>
            </View>

        </View>
    );
};

const itemStyles = StyleSheet.create({
    headerStyle: {
        flexDirection: 'row', 
        justifyContent: "space-between",
        width: '100%',
    
    },
    textStyle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    iconStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "20%",
        
    },

});

