import React from 'react';
import { Text, View, Button, TextInput, ImageBackground } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { globalStyles } from '../../styles/global';

import { AuthContext } from '../../states/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
 * 
 * @param {object} navigation - object for changing screens in the stack navigator
 * @returns Component for login screen with image background
 */
export default function SignInScreen({ navigation }) {
  const backgroundImage = require("../../images/bearuby.jpg");
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Temporary before database
  const [radioButtons, setRadioButtons] = React.useState([
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Admin',
      value: 'Admin',
      selected: true // Defaults to admin
    },
    {
      id: '2',
      label: 'Site',
      value: 'Site',
      selected: false
    },
    {
      id: '3',
      label: 'Volunteer',
      value: 'Volunteer',
      selected: false
    }
  ]);
  const [selected, setSelected] = React.useState(radioButtons[0].value);

  // Temporary before database
  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    setSelected(radioButtons.find(e => e.selected == true).value);
  }

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
          secureTextEntry
        />
        {/* remove selected when migrating to database */}
        <TouchableOpacity style={globalStyles.loginAction} onPress={() => signIn({ username, password, selected })}>
          <Text style={globalStyles.loginActionText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.loginNav} onPress={() => navigation.navigate('Register')}>
          <Text style={globalStyles.loginNavText}>Register</Text>
        </TouchableOpacity>
        {/* Temporary before database */}
        <View style={globalStyles.loginButtons}>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
          />
        </View>
      </View>
    </ImageBackground>
  );
}


