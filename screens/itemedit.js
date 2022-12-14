import React from "react";
import { Keyboard, KeyboardAvoidingView, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { TextBox } from "../components/textbox";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { globalStyles } from '../styles/global';
import { ItemsContext } from '../states/itemscontext';
import { ActionButton } from "../components/actionbutton";
import { helpTexts } from '../data/helpTexts';

/**
 * A screen used to edit an item in inventory
 *
 * @param {object} navigation - property used to shift from screen to screen
 * @param {object} route - change screens and transmit the data of the objects between screens
 * @returns the item edit screen
 */
export default function ItemEditScreen({ navigation, route }) {
  const item = route.params;
  const [name, setName] = React.useState(item.name);
  const [amount, setAmount] = React.useState(item.amount);
  const [increment, setIncrement] = React.useState(item.defaultIncrement);
  const [defaultIncrement, setDefaultIncrement] = React.useState(item.defaultIncrement);
  const [minimumAmount, setMinimumAmount] = React.useState(item.minimumAmount);
  const [deleteConfirmationShown, setDeleteConfirmationShown] = React.useState(false);

  const { deleteItem, saveItem } = React.useContext(ItemsContext);

  const header = (itemName, siteName) => (
    <View style={globalStyles.header}>
      <Text style={globalStyles.headerText} numberOfLines={1}>Edit {siteName}&apos;s {itemName}</Text>
      <View style={globalStyles.headerIcons}>
        <TouchableOpacity onPress={() => navigation.navigate("Help Section", { helpText: helpTexts.find((helpText) => helpText.topic == "What are the Item Edit Fields") })}>

          <MaterialIcon name="help" size={30} color={"grey"}></MaterialIcon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDeleteConfirmationShown(true)}>
          <MaterialIcon name="delete" size={30}></MaterialIcon>
        </TouchableOpacity>
      </View>
    </View>
  );

  React.useEffect(
    () => navigation.setOptions({ headerTitle: () => header(name, item.trailerName) }, [navigation])
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
            if (item.editProperty.bind(item)("name", name)) {
              saveItem(item.id);
            }
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
              if (item.editProperty.bind(item)("amount", amount)) {
                saveItem(item.id);
              }
              setAmount(item.amount.toString());
            }}
          />

          {/* Increment Amount */}

          <ActionButton
            iconName="plus"
            style={styles.incrementButton}
            onPress={() => {
              const incrementAsNumber = parseInt(increment);
              if (!isNaN(incrementAsNumber) && item.editProperty("amount", item.amount + incrementAsNumber)) {
                saveItem(item.id);
              }
              setAmount(item.amount.toString());
            }}
          />
          <ActionButton
            iconName="minus"
            style={styles.incrementButton}
            onPress={() => {
              const incrementAsNumber = parseInt(increment);
              if (!isNaN(incrementAsNumber) && item.editProperty("amount", item.amount - incrementAsNumber)) {
                saveItem(item.id);
              }
              setAmount(item.amount.toString());
            }}
          />

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
            if (item.editProperty.bind(item)("defaultIncrement", defaultIncrement)) {
              saveItem(item.id);
            }
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
            if (item.editProperty.bind(item)("minimumAmount", minimumAmount)) {
              saveItem(item.id);
            }
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
                    setDeleteConfirmationShown(false);
                    deleteItem(item.id);
                    navigation.pop();
                  }}
                >
                  <Text style={{ ...styles.deleteConfirmationButtonText, ...styles.deleteConfirmationText }}>
                    Yes, delete
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelDeleteConfirmationButton}
                  onPress={() => setDeleteConfirmationShown(false)}
                >
                  <Text style={{ ...styles.cancelDeleteConfirmationButtonText, ...styles.deleteConfirmationText }}>
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
    marginLeft: 2,
    marginRight: 2,
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
  cancelDeleteConfirmationButton: {
    backgroundColor: "grey",
    borderRadius: 10,
    marginBottom: 14,
    marginHorizontal: 8,
  },
  cancelDeleteConfirmationButtonText: {
    color: 'white'
  },
  deleteConfirmationButtonText: {
    color: "white",
  },
});
