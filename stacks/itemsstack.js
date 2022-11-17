import * as React from 'react';
import ItemEditScreen from '../screens/itemedit';
import ItemsScreen from "../screens/items";
import { ItemsProvider } from '../states/itemscontext';
import { createStackNavigator } from '@react-navigation/stack';

export function ItemsStack({ route }) {
  const Stack = createStackNavigator();

  return (
    <ItemsProvider username={route.params.username}>
      <Stack.Navigator>
        <Stack.Screen name="Items" component={ItemsScreen} initialParams={{ userType: route.params.userType }} />
        <Stack.Screen name="ItemEditScreen" component={ItemEditScreen} />
      </Stack.Navigator>
    </ItemsProvider>
  );
}