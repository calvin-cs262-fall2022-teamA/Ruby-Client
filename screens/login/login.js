// import React from 'react';
import { Text, View, ActivityIndicator, ImageBackground } from 'react-native';
import { globalStyles } from '../../styles/global';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../states/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as React from 'react';
import { TextInput } from 'react-native-paper';

/**
 *
 * @param {object} navigation - object for changing screens in the stack navigator
 * @returns Component for login screen with image background
 */
export default function SignInScreen({ navigation }) {
  const backgroundImage = require("../../images/bearuby.jpg");
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPasswordSecure, setIsPasswordSecure] = React.useState(true);
  const [isSigningIn, setIsSigningIn] = React.useState(false);

  const { signIn } = React.useContext(AuthContext);

  return (
    <ImageBackground source={backgroundImage} resizeMode='repeat' style={globalStyles.image}>
      <View style={globalStyles.loginBlock}>
        <Text style={globalStyles.loginText}>Username: </Text>
        <TextInput style={globalStyles.userCredentials}
          value={username}
          onChangeText={setUsername}
        />
        <Text style={globalStyles.loginText}>Password: </Text>
        <TextInput style={globalStyles.userCredentials}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={isPasswordSecure}
          right={
            <TextInput.Icon
              name={() => <MaterialCommunityIcons name={isPasswordSecure ? "eye-off" : "eye"} size={22} />} // where <Icon /> is any component from vector-icons or anything else
              onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
            />
          }
        />
        <TouchableOpacity style={globalStyles.loginAction}
          onPress={() => {
            if (!isSigningIn) {
              setIsSigningIn(true);
              signIn({ username, password })
                .then(() => setIsSigningIn(false));
            }
          }}>
          {isSigningIn ?
            <ActivityIndicator style={globalStyles.loginActionText} /> :
            <Text style={globalStyles.loginActionText}>Sign In</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.loginNav} onPress={() => navigation.navigate('Register')}>
          <Text style={globalStyles.loginNavText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground >
  );
}


