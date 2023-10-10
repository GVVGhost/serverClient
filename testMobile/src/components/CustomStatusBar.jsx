import React from "react";
import {StatusBar} from "react-native";
import {Colors} from "styles/Colors";

export const CustomStatusBar = () => {
    return (
        <StatusBar
            barStyle={'dark-content'}
            backgroundColor={Colors.dark}
        />
    );
};