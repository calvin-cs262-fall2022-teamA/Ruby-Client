import React from "react";
import { Keyboard, KeyboardAvoidingView, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { TextBox } from "../components/textbox";
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { globalStyles } from '../styles/global';
import { itemsContext } from '../states/itemscontext';

/* A screen used to edit an item in inventory */
export default function ItemEditScreen({ navigation, route }) {
  const item = route.params;
  const [name, setName] = React.useState(item.name);
  const [amount, setAmount] = React.useState(item.amount);
  const [increment, setIncrement] = React.useState(item.defaultIncrement);
  const [defaultIncrement, setDefaultIncrement] = React.useState(item.defaultIncrement);
  const [minimumAmount, setMinimumAmount] = React.useState(item.minimumAmount);
  const [deleteConfirmationShown, setDeleteConfirmationShown] = React.useState(false);

  const { items, deleteItem } = React.useContext(itemsContext);

  const header = (itemName, siteName) => (
    <View style={globalStyles.header}>
      <Text style={globalStyles.headerText} numberOfLines={1}>Edit {siteName}'s {itemName}</Text>
      <View>
        <TouchableOpacity onPress={() => setDeleteConfirmationShown(true)}>
          <MaterialIcon name="delete" size={30}></MaterialIcon>
        </TouchableOpacity>
      </View>
    </View>
  );

  React.useEffect(
    () => navigation.setOptions({ headerTitle: () => header(name, "Trailer 1") }, [navigation]) // TODO: don't hardcode site name
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView>

        {/* Name */}
        <TextBox style={{ ...styles.row, ...styles.textBox }}
          value={name}
          placeholder="Enter Name"
          label="Name"
          onChangeText={(name) => {
            setName(name);
          }}
          onEndEditing={() => {
            item.trySave.bind(item)("name", name);
            setName(item.name);
          }}
        />

        <View style={{ ...styles.row, ...styles.amountRow }}>
          {/* Amount */}
          <TextBox style={{ ...styles.textBox, ...styles.amountTextBox }}
            value={amount}
            placeholder="Enter Amount"
            label="Amount"
            suffix={name}
            keyboardType="numeric"
            onChangeText={setAmount}
            onEndEditing={() => {
              item.trySave.bind(item)("amount", amount);
              setAmount(item.amount.toString());
            }}
          />

          {/* Increment Amount */}
        
          <TouchableOpacity
            style={styles.incrementButton}
            onPress={() => {
              const incrementAsNumber = parseInt(increment);
              if (!isNaN(incrementAsNumber) && item.trySave("amount", item.amount + incrementAsNumber)) {
                setAmount(item.amount.toString());
              }
            }}>
            <Icon name="plus" style={globalStyles.incrementButtonText}></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.incrementButton}
            onPress={() => {
              const incrementAsNumber = parseInt(increment);
              if (!isNaN(incrementAsNumber) && item.trySave("amount", item.amount - incrementAsNumber)) {
                setAmount(item.amount.toString());
              }
            }}>
            <Icon name="minus" style={globalStyles.incrementButtonText}></Icon>
          </TouchableOpacity>

          <TextBox style={{ ...styles.textBox, ...styles.incrementTextBox }}
            value={increment}
            placeholder="Enter amount to change"
            keyboardType="numeric"
            onChangeText={setIncrement}
          />
        </View>

        {/* Default Increment */}
        < TextBox style={{ ...styles.row, ...styles.textBox }}
          value={defaultIncrement}
          placeholder="Enter Increment"
          label="Default Increment"
          suffix={name}
          keyboardType="numeric"
          onChangeText={setDefaultIncrement}
          onEndEditing={() => {
            item.trySave.bind(item)("defaultIncrement", defaultIncrement);
            setDefaultIncrement(item.defaultIncrement.toString());
          }}
        />

        {/* Minimum Amount */}
        <TextBox style={{ ...styles.row, ...styles.textBox }}
          value={minimumAmount}
          placeholder="Enter Notification Level"
          label="Notification Level"
          suffix={name}
          keyboardType="numeric"
          onChangeText={setMinimumAmount}
          onEndEditing={() => {
            item.trySave.bind(item)("minimumAmount", minimumAmount);
            setMinimumAmount(item.minimumAmount.toString());
          }}
        />

        {/* Deletion Confirmation */}
        <Modal
          visible={deleteConfirmationShown}
          transparent={true}
          onRequestClose={() => setDeleteConfirmationShown(false)}
        >
          <View style={styles.deleteConfirmationBackground}>
            <View style={styles.deleteConfirmation}>
              <Text style={styles.deleteConfirmationText}>Are you sure you want to delete this item?</Text>
              <View style={styles.deleteConfirmationButtons}>
                <TouchableOpacity style={styles.deleteConfirmationButton}
                  onPress={() => {
                    item.archive();
                    setDeleteConfirmationShown(false);
                    deleteItem(item.id);
                    navigation.pop();
                  }}
                >
                  <Text style={{ ...styles.deleteConfirmationButtonText, ...styles.deleteConfirmationText }}>
                    Yes, delete
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.canceldeleteConfirmationButton}
                  onPress={() => setDeleteConfirmationShown(false)}
                >
                  <Text style={{ ...styles.canceldeleteConfirmationButtonText, ...styles.deleteConfirmationText }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </KeyboardAvoidingView>
    </TouchableWithoutFeedback >
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: 15
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    
    
  },
  textBox: {
    width: "90%",
    marginLeft: 20,
  },
  amountTextBox: {
    width: "50%",
    marginRight: "2%",
    
  },
  incrementButton: {
    width: "10%",
    aspectRatio: 1,
    borderRadius: 10000,
    backgroundColor: "rgb(213,83,66)",
    marginLeft: 2,
    marginRight: 2,
    justifyContent: "center",
  },
  incrementTextBox: {
    marginLeft: "1%",
    width: "15%"
  },
  deleteConfirmationBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  deleteConfirmation: {
    width: "100%",
    backgroundColor: "white",
    marginTop: 350,
    borderTopColor: "rgb(213,83,66)",
    borderLeftColor: "rgb(213,83,66)",
    borderRightColor: "rgb(213,83,66)",
    borderBottomColor: "rgb(213,83,66)",
    borderWidth: 3,
    borderRadius: 10,
    alignItems: "center",
    width: '90%',
    alignSelf: 'center',
  },
  deleteConfirmationText: {
    fontSize: 18,
    textAlign: "center",
    padding: 8,
  },
  deleteConfirmationButtons: {
    flexDirection: "row",
  },
  deleteConfirmationButton: {
    backgroundColor: "rgb(213,83,66)",
    borderRadius: 10,
    marginBottom: 14,
    marginHorizontal: 8,
  },
  canceldeleteConfirmationButton: {
    backgroundColor: "grey",
    borderRadius: 10,
    marginBottom: 14,
    marginHorizontal: 8,
  },
  canceldeleteConfirmationButtonText: {
    color: 'white'
  },
  deleteConfirmationButtonText: {
    color: "white",
  },
});
