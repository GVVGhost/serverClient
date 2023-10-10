import {StyleSheet} from "react-native";
import {Colors} from "styles/Colors";

export const GlobalStyles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    list: {
        paddingHorizontal: 10,
        backgroundColor: Colors.background,
    },
})