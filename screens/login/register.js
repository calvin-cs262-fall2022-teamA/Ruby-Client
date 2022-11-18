import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../states/auth';
import PasswordStrengthMeterBar from 'react-native-password-strength-meter-bar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyles } from '../../styles/global';
import { TextInput } from 'react-native-paper';

/**
 * 
 * @param {object} navigation - object for changing screens in the stack navigator
 * @returns Component for register screen with image background
 */
export default function RegisterScreen({ navigation }) {
  // State variables
  const backgroundImage = require("../../images/bearuby.jpg");
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPasswordSecure, setIsPasswordSecure] = React.useState(true);

  // Access global authorization state
  const { register } = React.useContext(AuthContext);

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
        <PasswordStrengthMeterBar password={password} />
        <TouchableOpacity style={globalStyles.loginAction} onPress={() => register({ username, password })}>
          <Text style={globalStyles.loginActionText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.loginNav} onPress={() => navigation.navigate('SignIn')}>
          <Text style={globalStyles.loginNavText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}