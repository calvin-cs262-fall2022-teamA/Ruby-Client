import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextBox } from "./textbox";
import Icon from 'react-native-vector-icons/Entypo';
import { ItemsContext } from '../states/itemscontext';
import { ActionButton } from './actionbutton';

/***
 * A component used to display each item in the ItemsScreen
 *
 * @param {Item} item - object for changing screens in the stack navigator
 * @param {object} navigation - object for changing screens in the stack navigator
 * @param {boolean} isAdmin - whether the list item is for admin (shows edit button)
 * @returns Component that displays an item
 */

export default function ListItem({ item, navigation, isAdmin }) {

  const [increment, setIncrement] = React.useState(item.defaultIncrement);
  const [amount, setAmount] = React.useState(item.amount);
  const { saveItem } = React.useContext(ItemsContext);

  return (
    <View style={listItemStyles.listItemBorder}>
      <Text style={listItemStyles.listItemText}>{item.name}</Text>
      <View style={listItemStyles.editAmount}>
        <Text style={listItemStyles.quantityText}>{amount}</Text>

        <ActionButton
          style={listItemStyles.subtractButton}
          iconName="minus"
          onPress={() => {
            const incrementAsNumber = parseInt(increment);
            if (!isNaN(incrementAsNumber) && item.editProperty("amount", item.amount - incrementAsNumber)) {
              saveItem(item.id);
            }
            setAmount(item.amount.toString());
          }}>
        </ActionButton>

        <TextBox style={listItemStyles.amountText}
          value={increment}
          placeholder="Enter amount to change"
          keyboardType="numeric"
          onChangeText={setIncrement}
        />
      </View>
      <View style={listItemStyles.editWrapper}>
        {isAdmin ?
          <TouchableOpacity style={listItemStyles.editButton}
            onPress={() =>
              navigation.navigate("ItemEditScreen", item)
            }>
            <Icon name='edit' style={listItemStyles.editIcon}></Icon>
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
    paddingLeft: 10,
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
    justifyContent: 'flex-end',
  },
  subtractButton: {
    height: 50,
    aspectRatio: 1,
    marginHorizontal: "10%",
  },
  amountText: {
    width: "30%",
    marginRight: "4%",
  },
  editWrapper: {
    width: "30%",
    height: "100%",
  },
  editButton: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  editIcon: {
    marginRight: 10,
    textAlignVertical: "center",
    fontSize: 30,
  }
});