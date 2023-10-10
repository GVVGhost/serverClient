import {StyleSheet} from 'react-native';
import {Colors} from 'styles/Colors';

export const CardItemsStyles = StyleSheet.create({
  container: {
    minHeight: 50,
    borderWidth: 1,
    borderRadius: 16,
    marginVertical: 2,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderColor: Colors.borders,
    backgroundColor: Colors.background,
  },
  containerRow: {
    flexDirection: 'row',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    fontStyle: 'italic',
    borderBottomWidth: 1,
    color: Colors.text,
    borderColor: Colors.borders,
  },
  value: {
    fontSize: 16,
    color: Colors.text,
  },
  valueLarge: {
    fontSize: 20,
    marginBottom: 4,
    paddingLeft: 12,
    fontWeight: 'bold',
    color: Colors.text,
  },
});
