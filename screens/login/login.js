import { Text, View, ImageBackground } from 'react-native';
import { globalStyles } from '../../styles/global';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../states/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as React from 'react';
import { TextInput } from 'react-native-paper';

/**
 * A screen with a sign in form for users.
 *
 * @param {object} navigation - object for changing screens in the stack navigator
 * @returns Component for login screen with image background
 */
export default function SignInScreen({ navigation }) {
  const backgroundImage = require("../../images/bearuby.jpg");
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPasswordSecure, setIsPasswordSecure] = React.useState(true);

  const { signIn } = React.useContext(AuthContext);

  return (
    <ImageBackground source={backgroundImage} resizeMode='repeat' style={globalStyles.image}>
      <View style={globalStyles.loginBlock}>
        <Text style={globalStyles.loginText}>Username: </Text>
        <TextInput style={globalStyles.userCredentials}
          value={username}
          onChangeText={(value) => setUsername(value.trim())}
        />
        <Text style={globalStyles.loginText}>Password: </Text>
        <TextInput style={globalStyles.userCredentials}
          value={password}
          onChangeText={(value) => setPassword(value.trim())}
          secureTextEntry={isPasswordSecure}
          right={
            <TextInput.Icon
              name={() => <MaterialCommunityIcons name={isPasswordSecure ? "eye-off" : "eye"} size={22} />} // where <Icon /> is any component from vector-icons or anything else
              onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
            />
          }
        />
        <TouchableOpacity style={globalStyles.loginAction} onPress={() => signIn({ username, password })}>
          <Text style={globalStyles.loginActionText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.loginNav} onPress={() => navigation.navigate('Register')}>
          <Text style={globalStyles.loginNavText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}


