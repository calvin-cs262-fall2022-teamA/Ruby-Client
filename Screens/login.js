import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { globalStyles } from '../styles/global';

export default function LoginScreen({ navigation }) {
    
     return (
          <View>
              {/* Get rid of that ugly button and, instead, display our list of movies. */}
            
                 <TouchableOpacity onPress={() => navigation.navigate('Site')}>
                     <Text> Site View</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => navigation.navigate('Admin')}>
                     <Text> Admin View</Text>
                  </TouchableOpacity>
                  

         </View> 
    );
 }