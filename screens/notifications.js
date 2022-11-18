import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { itemsContext } from '../states/itemscontext';
import NotificationItem from '../components/notificationItem';

/**
 * 
 * @returns Notification screen with alerts of items whose levels are below notification level
 */
export default function Notifications() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const getNotifications = async () => {
    try {
      const response = await fetch('https://be-a-ruby.herokuapp.com/notifications') //fetch the database notifications
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
        <FlatList
          onRefresh={() => {
            setIsRefreshing(true);
            getNotifications().then(() => setIsRefreshing(false)); //refresh the list of current items that are low on inventory
          }}
          refreshing={isRefreshing}
          data={data}
          keyExtractor={(item) => `${item.name}:${item.quantity}`} // extracting info from json fetch
          renderItem={({ item }) => (
            // <Text>{item.iname} {item.quantity}</Text> //test that necessary information was reaching notification component
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