import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

/**
 * A screen that gives help text for a particular topic.
 *
 * @param {string} route.params.helpText - The help text to display.
 * @returns the about screen
 */
export default function HelpSection({ route }) {
  const helpText = route.params.helpText;

  return (
    <View style={styles.container}>
      <Text style={styles.topic}>
        {helpText.topic}
      </Text>
      <ScrollView>
        <Text style={styles.text}>
          {helpText.text}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "space-between",
    flex: 1,
  },
  topic: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    color: 'rgb(37,65,81)',
    fontWeight: "bold"
  },
  text: {
    fontSize: 20,
    textAlign: "left",
  },
});