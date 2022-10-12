import React from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../states/auth';
import RadioGroup from 'react-native-radio-buttons-group';

import { globalStyles } from '../../styles/global';

export default function RegisterScreen({navigation }) {
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

  const { register } = React.useContext(AuthContext);

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
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
  );
}