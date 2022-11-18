// From https://reactnavigation.org/docs/auth-flow/

import * as React from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import bcrypt from "react-native-bcrypt";
import isaac from "isaac";

bcrypt.setRandomFallback((len) => {
  const buf = new Uint8Array(len);

  return buf.map(() => Math.floor(isaac.random() * 256));
});

import HomeScreen from './screens/home';
import SplashScreen from './screens/login/splash';
import SignInScreen from './screens/login/login';
import RegisterScreen from './screens/login/register';
import ItemEditScreen from './screens/itemedit';
import ItemsScreen from "./screens/items";
import { AuthContext } from './states/auth';
import { itemsContext } from './states/itemscontext';
import Notifications from './screens/notifications';
import { Item } from "./models/item";


const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();



export default function App({ navigation }) {
  // Handles state transitions for Authorization: calls only made by useMemo
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            type: action.selected,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            type: action.selected,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      // Defaults
      isLoading: true,
      isSignout: false,
      userToken: null,
      type: 'Admin',
    }
  );

  // Run a loading effect (not sure how yet)
  // while waiting for server to authenticate the user
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await SecureStore.getItemAsync('userToken');
        type = await SecureStore.getItemAsync('type');
      } catch (e) {
        // Restoring token failed

      }
      // Alert(type);
      // After restoring token, we may need to validate it in production apps
      // if (userToken) {

      // } else {

      // }
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken, selected: type });
    };

    bootstrapAsync();
  }, []);

  // Functions to update login state
  // EX:
  // const { signIn } = React.useContext(AuthContext);
  // signIn( {username, password} );
  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage

        // Request user type for person
        let json;
        try {
          const hash = bcrypt.hashSync(data.password, '$2a$10$eJFQzk1zl6FoX4.E31XdZe');
          console.log(hash);
          const res = await fetch(`https://be-a-ruby.herokuapp.com/users/${data.username}/${hash}`);
          json = await res.json();
          console.log(json);

        } catch (error) {
          console.error('Error:', error);
        }

        // Save username and user type and login
        if (json.usertype) {
          SecureStore.setItemAsync('userToken', data.username);
          SecureStore.setItemAsync('type', json.usertype);
          dispatch({ type: 'SIGN_IN', token: data.username, selected: json.usertype });
        } else {
          alert('Invalid password or username');
        }


      },
      signOut: () => {
        // Logout by deleting saved userToken
        SecureStore.deleteItemAsync('userToken');
        SecureStore.deleteItemAsync('type');
        dispatch({ type: 'SIGN_OUT' })
      },
      register: async (data) => {
        // Verify unique login
        let json;
        try {
          const res = await fetch(`https://be-a-ruby.herokuapp.com/users/${data.username}`);
          json = await res.json();
          console.log('Success:', json);
        } catch (error) {
          console.error('Error:', error);
        }

        if (json.count == 1) {
          // Non-unique username
          alert('Please try a different username');
        } else {
          // unique username
          const defaultType = 'Volunteer';
          // Add hash username salt -- currently hardcoded
          const hash = bcrypt.hashSync(data.password, '$2a$10$eJFQzk1zl6FoX4.E31XdZe');


          // Post username 
          try {
            const res = await fetch('https://be-a-ruby.herokuapp.com/users/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username: data.username, pswd: hashedPassword, type: defaultType })
            })
            json = await res.json();
          } catch (error) {
            console.error('Error:', error);
          }

          // Save user token
          SecureStore.setItemAsync('userToken', data.username);
          SecureStore.setItemAsync('type', defaultType);
          dispatch({ type: 'SIGN_IN', token: data.username, selected: defaultType });
        }


      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.isLoading ? (
          <Stack.Navigator>
            {/* // We haven't finished checking for the token yet */}
            <Stack.Screen name="Splash" component={SplashScreen} />
          </Stack.Navigator>
        ) : state.userToken == null ? (
          // No token found, user isn't signed in
          <Stack.Navigator>

            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }} />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                title: 'Register',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }} />

          </Stack.Navigator>
        ) : (
          // User is signed in: Put all the app screens between the <> and </>
          // This homescreen gives an example how to access state variables

          /* <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            initialParams={{ userToken: state.userToken }} /> */
          /* <Stack.Screen name= "ItemEdit" component={ItemEdit}  /> */
          <Tabs.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Item List') {
                  iconName = 'now-widgets';

                } else if (route.name === 'Notifications') {
                  iconName = 'notifications';
                }

                // You can return any component that you like here!
                return <Icon name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'rgb(213,83,66)',
              tabBarInactiveTintColor: 'gray',
            })}>
            <Tabs.Screen name="Item List" component={ItemEdit} initialParams={{ userType: state.type }} options={{ headerShown: false }} />
            <Tabs.Screen name="Notifications" component={Notifications} initialParams={{ userType: state.type }} />
          </Tabs.Navigator>
        )}

      </NavigationContainer>
    </AuthContext.Provider>
  );
}
function ItemEdit({ route, navigation }) { //TODO: Put elsewhere
  const userType = route.params.userType;
  const [items, setItems] = React.useState(
    /* Test data to use without database */
    [(new Item({
      id: 1,
      name: "Cups",
      amount: 200,
      defaultIncrement: 20,
      minimumAmount: 10,
    })),
    (new Item({
      id: 2,
      name: "Forks",
      amount: 300,
      defaultIncrement: 10,
      minimumAmount: 10,
    })),
    (new Item({
      id: 3,
      name: "Knives",
      amount: 300,
      defaultIncrement: 10,
      minimumAmount: 10,
    })),
    (new Item({
      id: 4,
      name: "Spoons",
      amount: 300,
      defaultIncrement: 15,
      minimumAmount: 10,
    }))]);
  const deleteItem = (id) => setItems(items.filter(i => i.id !== id));

  return (
    <itemsContext.Provider value={{ items, deleteItem }}>
      <Stack.Navigator>
        <Stack.Screen name="Items" component={ItemsScreen} initialParams={{ userType: userType }} />
        <Stack.Screen name="ItemEditScreen" component={ItemEditScreen} />
      </Stack.Navigator>
    </itemsContext.Provider>
  );
}