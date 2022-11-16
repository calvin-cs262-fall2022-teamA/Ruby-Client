import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, StyleSheet, Text } from 'react-native';
import { itemsContext } from '../states/itemscontext';
import { NotificationItem } from '../components/notificationItem';


export default function Notifications({ navigation, route }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getNotifications = async () => {
    try {
      const response = await fetch('https://be-a-ruby.herokuapp.com/notifications')
      const json = await response.json();
      setData(json.items);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <View style={notifStyles.notifPage}>
      <FlatList data={data}
        keyExtractor={({ id }) => id} // TODO: also ID
        renderItem={({ item }) => (
          <NotificationItem name={item.iname} amount={item.quantity}></NotificationItem>
        )}>
      </FlatList>
    </View>
  );
}

const notifStyles = StyleSheet.create({
  notifPage: {
    justifyContent: 'center'
  },

})