import {StyleSheet} from 'react-native';
import {Colors} from 'styles/Colors';

export const ButtonStyles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    marginLeft: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cbContainer: {
    margin: 5,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  cbTextStyle: {
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.background,
  },
  lpbContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 30,
    padding: 18,
    alignItems: 'center',
  },
  lpbText: {
    color: Colors.background,
    fontSize: 18,
  },
});
