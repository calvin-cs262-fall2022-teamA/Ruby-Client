import React from 'react';
import { View, Button, TextInput } from 'react-native';
import { AuthContext } from '../../states/auth';

export default function RegisterScreen({navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

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
      <Button title="Register" onPress={() => register({ username, password })} />
      <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
    </View>
  );
}