import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';
import { TextBox } from "./textbox";
import Icon from 'react-native-vector-icons/Entypo';

/* A component used to display each item in the ItemsScreen */
export default function ListItem({ item, navigation }) {

  const [increment, setIncrement] = React.useState(item.defaultIncrement);
  const [amount, setAmount] = React.useState(item.amount);
  return (
    <View style={listItemStyles.listItemBorder}>
      <Text style={listItemStyles.listItemText}>{item.name}</Text>
      <View style={listItemStyles.editAmount}>
        <Text style={listItemStyles.quantityText}>{amount}</Text>

        <TouchableOpacity
          style={listItemStyles.subtractButton}
          onPress={() => {
            const incrementAsNumber = parseInt(increment);
            if (!isNaN(incrementAsNumber) && item.trySave("amount", item.amount - incrementAsNumber)) {
              setAmount(item.amount.toString());
            }
          }}>
          <Icon name="minus" style={globalStyles.incrementButtonText}></Icon>
        </TouchableOpacity>

        <TextBox style={listItemStyles.amountText}
          value={increment}
          placeholder="Enter amount to change"
          keyboardType="numeric"
          onChangeText={setIncrement}
        />
      </View>
      <TouchableOpacity onPress={() =>
        navigation.navigate("ItemEditScreen", item)
      }>
        <Icon name='edit' size={20}></Icon>
      </TouchableOpacity>
    </View>
  );
}

const listItemStyles = StyleSheet.create({
  listItemBorder: {
    flexDirection: 'row',
    height: 70,
    padding: 10,
    borderWidth: 3,
    borderRadius: 10,
    margin: 5,
    borderColor: '#d975d2',
    backgroundColor: '#d0d0d0',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemText: {
    fontSize: 18,
    fontWeight: 'bold',

  },
  quantityText: {
    fontSize: 18,

  },
  editAmount: {
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtractButton: {
    height: '90%',
    aspectRatio: 1,
    borderRadius: 10000,
    backgroundColor: "#d975d2",
    marginLeft: "1%",
  },
  amountText: {
    width: "30%",
    marginRight: "2%",
  },
});