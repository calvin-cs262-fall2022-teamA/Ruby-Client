import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { itemsContext } from '../states/itemscontext';
import NotificationItem from '../components/notificationItem';


export default function Notifications() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getNotifications = async () => {
    try {
      const response = await fetch('https://be-a-ruby.herokuapp.com/notifications')
      // console.log(response);
      const json = await response.json();
      // console.log(json);
      setData(json);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);

    }
  }

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <View style={notifStyles.notifPage}>
      {isLoading ? <ActivityIndicator /> : (
        <FlatList data={data}
          keyExtractor={(item) => `${item.name}:${item.quantity}`} // TODO: also ID
          renderItem={({ item }) => (
            // <Text>{item.iname} {item.quantity}</Text>
            <NotificationItem item={item.iname} amount={item.quantity}></NotificationItem>
          )}>
        </FlatList>
      )}
    </View>
  );
}

const notifStyles = StyleSheet.create({
  notifPage: {
    justifyContent: 'center'
  },

})