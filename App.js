import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SiteScreen from "./Screens/site";
import LoginScreen from "./Screens/login";
import AdminScreen from "./Screens/admin";
import Header from "./shared/header";

const Stack = createNativeStackNavigator();

 function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options=
      {({ navigation }) => ({
     headerRight: () => (
    <Header navigation={navigation}/>
    )})}/>
        <Stack.Screen name="Site" component={SiteScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

