// From https://reactnavigation.org/docs/auth-flow/

import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import bcrypt from "react-native-bcrypt";
import isaac from "isaac";


import SplashScreen from './screens/login/splash';
import SignInScreen from './screens/login/login';
import RegisterScreen from './screens/login/register';
import { AuthContext } from './states/auth';
import Notifications from './screens/notifications';
import About from './screens/about';
import { StateContext } from "./states/state"
import { ItemsStack } from "./stacks/itemsstack";


const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

bcrypt.setRandomFallback((len) => {
  const buf = new Uint8Array(len);

  return buf.map(() => Math.floor(isaac.random() * 256));
});

/**
 * The root of the app
 *
 * Handles authorization and sets up the tabs/screens
 * @returns The apps root component
 */
export default function App() {
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
        return new Promise((resolve, reject) => {
          if (data.username === '') {
            alert('Please enter a username');
            resolve();
            return;
          }
          if (data.password === '') {
            alert('Please enter a password');
            resolve();
            return;
          }
          // In a production app, we need to send some data (usually username, password) to server and get a token
          // We will also need to handle errors if sign in failed
          // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
          bcrypt.hash(data.password, '$2a$10$eJFQzk1zl6FoX4.E31XdZe', async (error, hash) => {
            if (error) {
              console.error('Error:', error);
              alert('An error occurred');
              resolve();
              return;
            }

            let json;
            try {
              // Request user type for person
              const res = await fetch(`https://be-a-ruby.herokuapp.com/users/${encodeURIComponent(data.username)}/${encodeURIComponent(hash)}`);
              json = await res.json();
              // Save username and user type and login
              if (json.usertype) {
                SecureStore.setItemAsync('userToken', data.username);
                SecureStore.setItemAsync('type', json.usertype);
                dispatch({ type: 'SIGN_IN', token: data.username, selected: json.usertype });
              } else {
                alert('Invalid password or username');
              }

            } catch (error) {
              console.error('Error:', error);
              alert('An error occurred');
            }
            resolve();
          });
        });
      },
      signOut: () => {
        // Logout by deleting saved userToken
        SecureStore.deleteItemAsync('userToken');
        SecureStore.deleteItemAsync('type');
        dispatch({ type: 'SIGN_OUT' })
      },
      register: async (data) => {
        if (data.username === '') {
          alert('Please enter a username');
          return;
        }
        if (data.password === '') {
          alert('Please enter a password');
          return;
        }

        // Verify unique login
        let json;
        try {
          const res = await fetch(`https://be-a-ruby.herokuapp.com/users/${encodeURIComponent(data.username)}`);
          json = await res.json();
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
            const res = await fetch('https://be-a-ruby.herokuapp.com/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username: data.username, pswd: hash, type: defaultType })
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
      <StateContext.Provider value={state}>

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
                  <Tabs.Screen name="Item List" component={ItemsStack} options={{ headerShown: false }} />
                  <Tabs.Screen name="Notifications" component={Notifications} />
                </>
              }
              <Tabs.Screen name="About" component={About} />
              <Tabs.Screen name="Logout" component={SplashScreen}
                options={() => ({
                  tabBarButton: (props) => {
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
      </StateContext.Provider>
    </AuthContext.Provider>
  );
}