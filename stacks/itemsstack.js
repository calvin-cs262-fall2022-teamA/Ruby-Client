import * as React from 'react';
import ItemEditScreen from '../screens/itemedit';
import ItemsScreen from "../screens/items";
import { ItemsProvider } from '../states/itemscontext';
import { createStackNavigator } from '@react-navigation/stack';
import { StateContext } from '../states/state';
import { globalStyles } from '../styles/global';
import HelpSection from "../screens/helpsection";

/**
 * The stack of screens shown in the items tab (item list, item edit, and item edit fields help)
 *
 * @returns The stack for the Items tab
 */
export function ItemsStack() {
  const Stack = createStackNavigator();
  const { userToken } = React.useContext(StateContext);

  return (
    <ItemsProvider username={userToken}>
      <Stack.Navigator>
        <Stack.Screen name="Items" component={ItemsScreen} />
        <Stack.Screen name="ItemEditScreen" component={ItemEditScreen} />
        <Stack.Screen name="Help Section" component={HelpSection} options={{ headerTitle: "Help", headerTitleStyle: globalStyles.headerText }} />
      </Stack.Navigator>
    </ItemsProvider>
  );
}