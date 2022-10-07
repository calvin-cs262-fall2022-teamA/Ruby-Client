import React from "react";
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { TextBox } from "../components/TextBox";
import Icon from 'react-native-vector-icons/Entypo';

/* A screen used to edit an item in inventory */
export function ItemEditScreen({ navigation, route }) {
  const item = route.params;
  const [name, setName] = React.useState(item.name);
  const [amount, setAmount] = React.useState(item.amount);
  const [increment, setIncrement] = React.useState(item.defaultIncrement);
  const [defaultIncrement, setDefaultIncrement] = React.useState(item.defaultIncrement);
  const [minimumAmount, setMinimumAmount] = React.useState(item.minimumAmount);

  React.useEffect(() => {
    navigation.setOptions({ title: "Edit Trailer 1's " + name }); //TODO: don't hardcode site name
  }, [navigation]);

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
            navigation.setOptions({ title: "Edit Trailer 1's " + name }); //TODO: don't hardcode site name
          }}
          onEndEditing={() => {
            item.trySave.bind(item)("name", name);
            setName(item.name.toString());
            navigation.setOptions({ title: "Edit Trailer 1's " + item.name });
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
            <Icon name="plus" style={styles.incrementButtonText}></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.incrementButton}
            onPress={() => {
              const incrementAsNumber = parseInt(increment);
              if (!isNaN(incrementAsNumber) && item.trySave("amount", item.amount - incrementAsNumber)) {
                setAmount(item.amount.toString());
              }
            }}>
            <Icon name="minus" style={styles.incrementButtonText}></Icon>
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
    alignItems: "center"
  },
  textBox: {
    width: "90%",
    marginLeft: 5
  },
  amountTextBox: {
    width: "50%",
    marginRight: "2%",
  },
  incrementButton: {
    width: "10%",
    aspectRatio: 1,
    borderRadius: 10000,
    backgroundColor: "#d975d2",
    marginLeft: "1%",
  },
  incrementButtonText: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "#fff",
    fontSize: 40,
  },
  incrementTextBox: {
    marginLeft: "1%",
    width: "15%"
  }
});
