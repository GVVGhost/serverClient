import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "styles/Colors";
import { GoBackButton } from "components/buttons/GoBackButton";

export const CustomHeader = ({ title, handler, children }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ width: 6 }}></TouchableOpacity>
      <GoBackButton onPress={handler} />
      <Text style={styles.text}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderColor: Colors.borders,
  },
  text: {
    color: Colors.primary,
    fontSize: 20,
  },
});
