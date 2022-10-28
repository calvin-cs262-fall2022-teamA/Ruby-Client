import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';
import { TextBox } from "./textbox";
import Icon from 'react-native-vector-icons/Entypo';

/* A component used to display each item in the ItemsScreen */
export default function ListItem({ item, navigation, isAdmin }) {

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
      <View style={listItemStyles.editWrapper}>
        {isAdmin ?
          <TouchableOpacity onPress={() =>
            navigation.navigate("ItemEditScreen", item)
          }>
            <Icon name='edit' size={20}></Icon>
          </TouchableOpacity>
          :
          <View></View>
        }
      </View>
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
    borderColor: 'rgb(37,65,81)',
    backgroundColor: '#d0d0d0',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    width: "30%",
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
    backgroundColor: "rgb( 213,83,66)",
    marginLeft: "1%",
  },
  amountText: {
    width: "30%",
    marginRight: "2%",
  },
  editWrapper: {
    width: "30%",
    justifyContent: "flex-end",
    flexDirection: "row",
  }
});