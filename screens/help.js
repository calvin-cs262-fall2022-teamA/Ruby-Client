import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { StateContext } from '../states/state';
import { helpTexts } from '../data/helpTexts';

/**
 * A screen that gives help text for the admin and volunteer side of the app.
 *
 * @param {object} navigation - property used to shift from screen to screen
 * @returns the about screen
 */
export default function Help({ navigation }) {
  const { type } = React.useContext(StateContext);
  const isAdmin = (type === "Admin");

  return (
    <View style={styles.container}>
      <FlatList style={styles.list}
        data={helpTexts.filter((text) => !text.onlyAdmin || isAdmin)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.sectionButton}
            onPress={() => navigation.navigate("Help Section", { helpText: item })}>
            <Text style={styles.text}>{item.topic}</Text>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  list: {
    width: "100%",
  },
  text: {
    fontSize: 20,
    textAlignVertical: "center",
    textAlign: "center",
  },
  sectionButton: {
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: 'rgb(37,65,81)',
    backgroundColor: "white",
    width: "100%",
    padding: 5,
  }
});