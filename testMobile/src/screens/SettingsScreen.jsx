import {Text, ToastAndroid, View} from 'react-native';
import {useAuth} from 'utils/AuthContext';
import {GlobalStyles} from 'styles/GlobalStyles';
import {useEffect, useState} from 'react';
import {LongPressButton} from 'components/buttons/LongPressButton';
import {CardItemsStyles} from 'styles/CardItemsStyles';
import {clearAsyncStorage, fetchData} from 'utils/AsyncStorageHelper';
import CustomButton from 'components/buttons/CustomButton';

function SettingsScreen({navigation}) {
  const showToast = text => ToastAndroid.show(text, ToastAndroid.LONG);
  const {setIsSignedIn} = useAuth();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setUser();
  }, []);

  const handleLogout = async () => {
    await clearAsyncStorage();
    setIsSignedIn(false);
  };

  const setUser = async () => {
    setUserName(await fetchData('userName'));
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={{margin: 12, flexDirection: 'column'}}>
        <View style={CardItemsStyles.container}>
          <Text style={CardItemsStyles.title}>Current user:</Text>
          <Text style={CardItemsStyles.value}> {userName}</Text>
        </View>
        <View style={{marginVertical: 10}} />
        <LongPressButton
          title="Hold on to logout"
          onPress={() => showToast('Hold the button at least 1 sec to logout')}
          onLongPress={handleLogout}
        />
        <CustomButton
          onPress={() => navigation.navigate('UpdaterScreen')}
          text="UpdaterScreen"
        />
      </View>
    </View>
  );
}

export default SettingsScreen;
