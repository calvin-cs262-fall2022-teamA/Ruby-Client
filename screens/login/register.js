import React from 'react';
import { Text, View, Button, TextInput, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../states/auth';
import RadioGroup from 'react-native-radio-buttons-group';

import { globalStyles } from '../../styles/global';

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
  // Temporary before Database
  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    setSelected(radioButtons.find(e => e.selected == true).value);
  }

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
          secureTextEntry
        />
        {/* remove selected when migrating to database */}
        <TouchableOpacity style={globalStyles.loginAction} onPress={() => register({ username, password, selected })}>
          <Text style={globalStyles.loginActionText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.loginNav} onPress={() => navigation.navigate('SignIn')}>
          <Text style={globalStyles.loginNavText}>Sign In</Text>
        </TouchableOpacity>
        {/* Temporary before database */}
        <RadioGroup
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
        />
      </View>
    </ImageBackground>
  );
}