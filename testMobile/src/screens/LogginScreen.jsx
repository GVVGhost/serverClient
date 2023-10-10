import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  ToastAndroid,
  View,
} from 'react-native';
import React, {createRef, useState} from 'react';
import {GlobalStyles} from 'styles/GlobalStyles';
import CustomButton from 'components/buttons/CustomButton';
import EmailTextInput from 'components/textInputs/EmailTextInput';
import PasswordTextInput from 'components/textInputs/PasswordTextInput';
import {clearAsyncStorage, putData} from 'utils/AsyncStorageHelper';
import {Colors} from 'styles/Colors';
import {useAuth} from 'utils/AuthContext';
import {CustomStatusBar} from 'components/CustomStatusBar';

const LoginScreen = ({navigation}) => {
  const pRef = createRef();
  const {setIsSignedIn} = useAuth();
  const [processing, setProcessing] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const showToast = text => ToastAndroid.show(text, ToastAndroid.SHORT);

  const loginToProfile = async (emailEntry, passwordEntry) => {
    if (!emailEntry && !passwordEntry) {
      showToast('Please enter login and password');
      return;
    }
    setProcessing(true);
    if (passwordEntry !== '111111') {
      setProcessing(false);
      showToast('Incorrect password');
      return;
    }
    await clearAsyncStorage();
    await putData('userName', emailEntry);
    setProcessing(false);
    setIsSignedIn(true);
  };

  return (
    <View style={GlobalStyles.container}>
      <CustomStatusBar />
      <ScrollView contentContainerStyle={GlobalStyles.mainViewLogin}>
        {processing && (
          <View style={{padding: 100}}>
            <ActivityIndicator
              size={100}
              color={Colors.primary}
              animating={processing}
            />
          </View>
        )}
        <EmailTextInput
          value={email}
          onChangeText={newValue => setEmail(newValue)}
          onSubmitEditing={() => pRef.current && pRef.current.focus()}
          placeholder="Wpisz swój login..."
        />
        <PasswordTextInput
          value={password}
          innerRef={pRef}
          onChangeText={newValue => setPassword(newValue)}
          onSubmitEditing={Keyboard.dismiss}
          placeholder="Wpisz swoje hasło..."
        />
        <CustomButton
          text="Zaloguj się"
          onPress={() => loginToProfile(email, password)}
        />
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
