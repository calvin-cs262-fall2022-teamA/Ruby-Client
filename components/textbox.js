import React from "react";
import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

/**
 * A component to standardize editing/entering information
 *
 * @param {string} label - a label of what should be entered in the textbox
 * @param {string} suffix - text placed after the user-entered text
 * @param {string} placeholder - text shown if nothing is in the textbox
 * @param {string} value - the value shown in the textbox
 * @param {(string) => void} onChangeText - a function called with the current value when the text is changed
 * @param {(e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void} onEndEditing - a function called when the user finishes entering text
 * @param {KeyboardTypeOptions} keyboardType - the type of keyboard to display
 * @param {StyleProp<ViewStyle>} style - styles to apply to the textbox
 *
 * @returns the textbox component
 */
export function TextBox({ label, suffix, placeholder, value, onChangeText, onEndEditing, keyboardType, style }) {
  const textInputRef = React.useRef(null);

  const styles = StyleSheet.create({
    boundingBox: {
      borderColor: "rgb(37,65,81)",
      borderWidth: 3,
      borderRadius: 10,
      height: 50,
      backgroundColor: "#fff",
      justifyContent: "center",
    },
    label: {
      display: label ? "flex" : "none",
      fontSize: 14,
      color: "#330630",
      marginHorizontal: 3,
    },
    inputWrapper: {
      flexDirection: "row",
      marginHorizontal: 5,
      alignContent: "center"
    },
    input: {
      width: suffix ? "50%" : "100%",
      fontSize: 18,
    },
    suffix: {
      fontSize: 18,
      width: suffix ? "50%" : "0%",
      textAlign: "right",
      paddingRight: 10,
      paddingLeft: 5,
      textAlignVertical: "center",
    },
  });

  return (
    <View style={style}>
      <TouchableWithoutFeedback
        onPress={() => textInputRef.current.focus()}>
        <View style={styles.boundingBox}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.inputWrapper}>
            <TextInput style={styles.input}
              ref={textInputRef}
              value={value.toString()}
              placeholder={placeholder}
              keyboardType={keyboardType}
              onChangeText={onChangeText}
              onEndEditing={onEndEditing} />
            <Text style={styles.suffix} numberOfLines={1}>{suffix}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
