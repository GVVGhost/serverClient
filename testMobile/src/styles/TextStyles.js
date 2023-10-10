import {StyleSheet} from 'react-native';
import {Colors} from "styles/Colors";

export const TextStyles = StyleSheet.create({
  bigTextStyle: {
    color: Colors.primary,
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
  },
  mediumTextStyle: {
    color: Colors.primary,
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  smallTextStyle: {
    color: Colors.primary,
    fontSize: 14,
    textAlign: 'justify',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  errorTextStyle: {
    color: Colors.error,
    fontSize: 16,
    textAlign: 'center',
    margin: 8,
  },
});
