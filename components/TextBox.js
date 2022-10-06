import React from "react";
import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

/* A component to standardize editing/entering information */
export function TextBox({ label, suffix, placeholder, value, onChangeText, onEndEditing, keyboardType, style }) {
  const textInputRef = React.useRef(null);

  const styles = StyleSheet.create({
    boundingBox: {
      borderColor: "#d975d2",
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
      width: suffix ? "75%" : "100%",
      fontSize: 18,
    },
    suffix: {
      fontSize: 18,
      width: suffix ? "25%" : "0%",
      textAlign: "right",
      paddingRight: 10
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
