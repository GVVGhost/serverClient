import {StyleSheet} from 'react-native';
import {Colors} from 'styles/Colors';

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
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
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  mainViewLogin: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20,
  },
});
