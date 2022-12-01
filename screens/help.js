import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StateContext } from '../states/state';

/**
 * A screen that gives help text for the admin and volunteer side of the app.
 *
 * @returns the about screen
 */
export default function Help() {
  const { type } = React.useContext(StateContext);
  const isAdmin = (type === "Admin");

  return (
    <View style={styles.container}>
      <ScrollView>
        {isAdmin ?
          <Text style={styles.text}>Admin</Text> :
          <Text style={styles.text}>Site</Text>
        }
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare justo ut magna congue, ac fermentum mi accumsan. Pellentesque ullamcorper, purus eu gravida fringilla, quam risus consectetur velit, ut pulvinar ipsum orci in augue. Sed dapibus lorem nec bibendum laoreet. Nulla et blandit ligula. Vivamus placerat orci ac nulla fringilla pretium. Vestibulum non magna tempor, fringilla dolor id, condimentum magna. Donec at eleifend justo. Maecenas ullamcorper dolor ullamcorper augue feugiat, a elementum dui porttitor. In a posuere purus. Donec eget purus sollicitudin, scelerisque erat non, tincidunt arcu. Vivamus pharetra purus et viverra rutrum.

          Curabitur pellentesque lacus vitae urna ullamcorper interdum. Vestibulum convallis felis sed neque efficitur, at imperdiet augue tincidunt. Duis a euismod risus. Aenean hendrerit hendrerit pretium. Proin non dictum magna, non accumsan neque. Ut porttitor lectus eu molestie molestie. Maecenas sit amet fringilla enim, vitae pellentesque orci. Nullam eu erat leo. Aenean eget finibus odio. In consequat efficitur augue, et dictum tellus. Cras ultricies, urna quis auctor malesuada, justo nunc imperdiet turpis, eu sodales odio magna in enim.
        </Text>
      </ScrollView>
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
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});