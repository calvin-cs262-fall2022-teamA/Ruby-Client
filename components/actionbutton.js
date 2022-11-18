import React from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

/**
 * A circular button with an icon inside.
 * @param {String} iconName - the icon to display (the name of an Entypo react-native-vector-icon)
 * @param {({ nativeEvent: PressEvent }) => void} onPress - a function to run when the button is pressed
 * @param {StyleSheet} style - styles to apply to the button
 * @returns the button
 */
export function ActionButton({ iconName, onPress, style }) {

  const [buttonWidth, setButtonWidth] = React.useState(0);

  const styles = StyleSheet.create({
    button: {
      width: "100%",
      aspectRatio: 1,
      borderRadius: 10000,
      backgroundColor: "rgb(213,83,66)",
      justifyContent: "center",
    },
    icon: {
      fontSize: (buttonWidth * 0.9),
      textAlign: "center",
      color: "#fff",
    },
  });

  return (
    <View style={style}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        onLayout={layoutEvent =>
          setButtonWidth(layoutEvent.nativeEvent.layout.width)
        }
      >
        <Icon name={iconName} style={styles.icon}></Icon>
      </TouchableOpacity>
    </View>
  );
}
