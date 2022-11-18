import React from "react";
import { StyleSheet, TouchableOpacity, View, Modal, Text } from 'react-native';
import { FlatList } from "react-native-gesture-handler";

/**
 * A modal that allows the user to choose from a list of options.
 *
 * @param {bool} visible - whether the selector is shown
 * @param {object[]} options - the options to show
 * @param {(object) => string} optionTextSelector - selects the string to show for each option
 * @param {(string) => void} onOptionChosen - a function that will be called when an option is chosen
 * @param {(void) => void} onRequestClose - a function that should make the selector no longer visible
 * @param {string} promptText - text shown above the options
 * @returns a modal component
 */
export function ModalSelector({ visible, options, optionTextSelector, onOptionChosen, onRequestClose, promptText }) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onRequestClose}
    >
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.prompt}>{promptText}</Text>
          <FlatList style={styles.options}
            data={options}
            keyExtractor={(item) => optionTextSelector(item)}
            renderItem={({ item }) =>
            (
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => {
                  onOptionChosen(item);
                  onRequestClose();
                }
                }
              >
                <Text style={styles.option}>{optionTextSelector(item)}</Text>
              </TouchableOpacity>
            )
            }
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: "center",
  },
  container: {
    backgroundColor: "white",
    borderColor: "rgb(213,83,66)",
    borderWidth: 3,
    borderRadius: 10,
    alignItems: "center",
    width: '90%',
    alignSelf: 'center',
  },
  prompt: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  options: {
    marginBottom: 10,
    width: "100%",
  },
  touchable: {
    alignSelf: "center",
  },
  option: {
    width: "80%",
    fontSize: 20,
    marginTop: 10,
    paddingHorizontal: 10,
    borderBottomColor: 'rgb(100, 100, 100)',
    borderBottomWidth: 2,
    textAlign: "center",
  }
});