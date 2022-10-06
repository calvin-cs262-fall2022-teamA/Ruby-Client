import React from 'react';
import { View, Button, Text } from 'react-native';
import { AuthContext } from '../states/auth';

export default function HomeScreen({route}) {
  const { signOut } = React.useContext(AuthContext);
  const { userToken } = route.params;

  return (
    <View>
      <Text>{JSON.stringify(userToken)} signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}