import * as React from 'react';
import Help from '../screens/help';
import HelpSection from "../screens/helpsection";
import { createStackNavigator } from '@react-navigation/stack';
import { globalStyles } from '../styles/global';
/**
 * The stack of screens shown in the help tab (help, and help section)
 *
 * @returns The stack for the help tab
 */
export function HelpStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Help TOC" component={Help} options={{ headerTitle: "Help", headerTitleStyle: globalStyles.headerText }} />
      <Stack.Screen name="Help Section" component={HelpSection} options={{ headerTitle: "Help", headerTitleStyle: globalStyles.headerText }} />
    </Stack.Navigator>
  );
}