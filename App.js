// From https://reactnavigation.org/docs/auth-flow/

import * as React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';

import HomeScreen from './screens/home';
import SplashScreen from './screens/login/splash';
import SignInScreen from './screens/login/login';
import RegisterScreen from './screens/login/register';
import { AuthContext } from './states/auth';


const Stack = createStackNavigator();

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
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
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
      } catch (e) {
        // Restoring token failed
        
      }

      // After restoring token, we may need to validate it in production apps
      // if (userToken) {

      // } else {

      // }
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
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
          dispatch({ type: 'SIGN_IN', token: username });
        } else {
          alert('Invalid password or username');
          // Investigate way to update text/show bad password
        }

        
      },
      signOut: () => {
        // Simulate logout by deleting saved userToken
        SecureStore.deleteItemAsync('userToken');
        dispatch({ type: 'SIGN_OUT' })
      },
      register: async (data) => {
        // Eventually call server API to save login
        SecureStore.setItemAsync('username', data.username);
        SecureStore.setItemAsync('password', data.password);

        // Save user token 
        SecureStore.setItemAsync('userToken', data.username);
        dispatch({ type: 'SIGN_IN', token: data.username }); 
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <>
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
            </>
          ) : (
            // User is signed in: Put all the app screens between the <> and </>
            // This homescreen gives an example how to access state variables 
            <>
              <Stack.Screen 
                name="Home" 
                component={HomeScreen}
                initialParams={{ userToken: state.userToken }} />
            </>
            
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
