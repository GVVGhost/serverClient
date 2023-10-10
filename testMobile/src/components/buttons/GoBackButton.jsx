import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "styles/Colors";

export const GoBackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon
        style={styles.icon}
        name="angle-left"
        size={40}
        color={Colors.primary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    icon: {
        marginLeft: 30,
        marginRight: 10,
        color: Colors.primary,
    },
});