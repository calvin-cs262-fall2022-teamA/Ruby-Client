import React from 'react';
import { View, Button, FlatList, StyleSheet, Text } from 'react-native';
import { itemsContext } from '../states/itemscontext';
import { NotificationItem } from '../components/notificationItem';


export default function Notifications({ navigation, route }) {

  const notifyItem = [];
  const { items } = React.useContext(itemsContext);

  for (let item of items) {
    if (item.amount <= item.minimumAmount) {
      notifyItem.push(item);
    }
  }


  return (
    <View style={notifStyles.notifPage}>
      <FlatList data={notifyItem.pop(item)}
        keyExtractor={(item) => `${item.name}:${item.amount}`} // TODO: also ID
        renderItem={({ item }) => (
          <NotificationItem item={item} navigation={navigation}></NotificationItem>
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