import {View} from 'react-native';
import {LargeText} from 'components/texts/LargeText';
import {GlobalStyles} from 'styles/GlobalStyles';

function HomeScreen() {
  return (
    <View style={GlobalStyles.container}>
      <LargeText text={'Home Screen'} />
    </View>
  );
}

export default HomeScreen;
