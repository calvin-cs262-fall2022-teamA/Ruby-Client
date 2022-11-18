import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Toast from 'react-native-simple-toast';

/**
 * A screen that gives info about Be A Ruby and the app
 *
 * @returns the about screen
 */
export default function About() {
  return (
    <View style={styles.container}>
      {/* From https://www.bearuby.org/who-we-are*/}
      <View style={styles.group}>
        <Text style={styles.text}>
          &emsp;We are the Rissley’s, Harry, Miranda, Harry IV, Ruby, Leo, and Finn. We are your typical fun, outgoing family. We love camping and spending time outdoors with friends and family.  When we are not outdoors, we love playing boardgames and cooking. On February 27, 2021, our lives changed forever when we lost our little girl. On February 25th she was on her way home from school when she was hit by a car and rushed to the hospital. She passed two days later from the injuries.
        </Text>
        <Text style={styles.text}>
          &emsp;In honor of her we started the Be a Ruby non-profit to do the work she did her whole life. Even at the young age of 7 she was an amazing person when it came to having a heart of gold. To Ruby everyone was her friend. She loved everyone and in everything she did, she did it with a smile and love. No matter how you felt that day, if you spent a few minutes with her, you would be smiling. She loved God and everything that went with it. She loved singing his songs and dancing to the music. She lived and is the reason of Be Kind Love Big.
        </Text>
        <Text style={styles.beARuby}>
          #BEARUBY
        </Text>
      </View>
      <View style={styles.group}>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://www.bearuby.org/support-us").catch(err => { console.error(err); Toast.show("Couldn't open the link!"); })}
        >
          <Text style={styles.supportUs}>Support Us!</Text>
        </TouchableOpacity>
        <Text style={styles.createBy}>App created by Adam Zentner, Anne Gritter, and Matthew Walstra</Text>
      </View >
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  group: {
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  beARuby: {
    fontSize: 30,
    textAlign: "center",
    color: "#b5007f",
  },
  supportUs: {
    marginBottom: 40,
    fontSize: 30,
    backgroundColor: "#b5007f",
    color: "white",
    padding: 10,
    borderRadius: 15,
  },
});