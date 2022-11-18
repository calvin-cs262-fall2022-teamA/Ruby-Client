// From https://reactnavigation.org/docs/auth-flow/

import * as React from 'react';
import { Alert, Button, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SplashScreen from './screens/login/splash';
import SignInScreen from './screens/login/login';
import RegisterScreen from './screens/login/register';
import ItemEditScreen from './screens/itemedit';
import ItemsScreen from "./screens/items";
import { AuthContext } from './states/auth';
import { ItemsContext } from './states/itemscontext';
import Notifications from './screens/notifications';
import { Item } from "./models/item";
import { ItemsStack } from './stacks/itemsstack';
import About from './screens/about';


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
        // In the example, we'll use a dummy token

        // Only have 1 password stored in secure storage for now, switch
        let username, password
        try {
          // Restore token stored in `SecureStore` or any other encrypted storage

          username = await SecureStore.getItemAsync("username");
          password = await SecureStore.getItemAsync("password");
        } catch (e) {
          // Restoring token failed

        }

        if (username == data.username && password == data.password) {
          SecureStore.setItemAsync('userToken', username);
          SecureStore.setItemAsync('type', data.selected);
          dispatch({ type: 'SIGN_IN', token: username, selected: data.selected });
        } else {
          alert('Invalid password or username');
          // Investigate way to update text/show bad password
        }


      },
      signOut: () => {
        // Simulate logout by deleting saved userToken
        SecureStore.deleteItemAsync('userToken');
        SecureStore.deleteItemAsync('type');
        dispatch({ type: 'SIGN_OUT' })
      },
      register: async (data) => {
        // Eventually call server API to save login
        SecureStore.setItemAsync('username', data.username);
        SecureStore.setItemAsync('password', data.password);

        // Save user token
        SecureStore.setItemAsync('userToken', data.username);
        SecureStore.setItemAsync('type', data.selected);
        dispatch({ type: 'SIGN_IN', token: data.username, selected: data.selected });
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
          <Tabs.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Item List') {
                  iconName = 'now-widgets';
                } else if (route.name === 'Notifications') {
                  iconName = 'notifications';
                } else if (route.name === 'Logout') {
                  iconName = 'logout'
                } else if (route.name === 'About') {
                  iconName = 'info'
                }

                return <Icon name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'rgb(213,83,66)',
              tabBarInactiveTintColor: 'gray',
            })}>
            {state.type === "Volunteer" ?
              <></> :
              <>
                <Tabs.Screen name="Item List" component={ItemsStack} initialParams={{ userType: state.type, username: state.userToken }} options={{ headerShown: false }} />
                <Tabs.Screen name="Notifications" component={Notifications} initialParams={{ userType: state.type }} />
              </>
            }
            <Tabs.Screen name="About" component={About} />
            <Tabs.Screen name="Logout" component={SplashScreen}
              options={() => ({
                tabBarButton: (props) => {
                  console.log(props);
                  return (
                    <TouchableOpacity {...props}
                      onPress={() => { authContext.signOut(); }}
                    >
                      {props.children}
                    </TouchableOpacity>
                  );
                }
              })}
            />
          </Tabs.Navigator>
        )}

      </NavigationContainer>
    </AuthContext.Provider>
  );
}