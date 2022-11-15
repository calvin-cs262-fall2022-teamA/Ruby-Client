import React from 'react';
import { View, Button, FlatList, StyleSheet, Text } from 'react-native';
import { itemsContext } from '../states/itemscontext';
import { NotificationItem } from '../components/notificationItem';


export default function Notifications({ navigation, route }) {

  const notifyItem = [];
  const { items } = React.useContext(itemsContext);

  for (let item of items) {
    console.log({ item })
    if (item.amount <= item.minimumAmount) {
      notifyItem.push(item);
    }
  }


  return (
    <View style={notifStyles.notifPage}>
      <FlatList data={notifyItem}
        keyExtractor={(item) => `${item.name}:${item.amount}`} // TODO: also ID
        renderItem={({ item }) => (
          <NotificationItem item={item} ></NotificationItem>
        )}>
      </FlatList>
      <Text> {items.length}</Text>

    </View>
  );
}

const notifStyles = StyleSheet.create({
  notifPage: {
    justifyContent: 'center'
  },

})