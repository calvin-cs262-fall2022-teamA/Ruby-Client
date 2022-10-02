import React from 'react';
import { View, Button, TextInput } from 'react-native';
import { AuthContext } from '../../states/auth';

export default function SignInScreen({navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

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
      <Button title="Sign in" onPress={() => signIn({ username, password })} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}


