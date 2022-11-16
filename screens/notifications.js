import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, StyleSheet, Text } from 'react-native';
import { itemsContext } from '../states/itemscontext';
import { NotificationItem } from '../components/notificationItem';


export default function Notifications({ navigation, route }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getNotifications = async () => {
    try {
      const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=jane%20austen')
      // console.log(response);
      const json = await response.json();
      // console.log(json.items);
      setData(json.items);
    } catch (error) {
      // console.log(error)
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
        keyExtractor={({ id }, index) => id} // TODO: also ID
        renderItem={({ item }) => (
          <Text>{item.volumeInfo.title}</Text>
          // <NotificationItem name={item.volumeInfo.title} amount={item.volumeInfo.authors}></NotificationItem>
        )}
      />
    </View>
  );
}

const notifStyles = StyleSheet.create({
  notifPage: {
    justifyContent: 'center'
  },

})