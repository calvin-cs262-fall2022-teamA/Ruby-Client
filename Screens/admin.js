import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { globalStyles } from '../styles/global';

export default function AdminScreen({ navigation }) {
    // Leave the remainder of the component unchanged.
    return (
        <View> 
             <Text> 
                This is the screen that is viewable to the Admin
             </Text>
         </View>
    );
}