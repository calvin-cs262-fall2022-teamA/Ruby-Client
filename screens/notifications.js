import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import NotificationItem from '../components/notificationItem';

/**
 * A screen to show notifications about low inventory of items.
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
      const json = await response.json();
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
          keyExtractor={(item) => `${item.iname}:${item.quantity}`} // extracting info from json fetch
          renderItem={({ item }) => (
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