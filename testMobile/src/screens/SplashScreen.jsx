import {ActivityIndicator, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchData} from 'utils/AsyncStorageHelper';
import {useAuth} from 'utils/AuthContext';
import {Colors} from 'styles/Colors';
import {CustomStatusBar} from 'components/CustomStatusBar';
import {GlobalStyles} from 'styles/GlobalStyles';

export const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);
  const {setIsSignedIn} = useAuth();

  useEffect(() => {
    setTimeout(() => {
      autoLogin().finally(_ => {
        setAnimating(false);
      });
    }, 1000);
  });
  const autoLogin = async () => {
    const userName = await fetchData('userName');
    if (userName) {
      setIsSignedIn(true);
    } else {
      navigation.replace('LoginScreen');
    }
  };

  return (
    <View style={GlobalStyles.splashContainer}>
      <CustomStatusBar />
      <View style={{width: '100%'}}>
        <ActivityIndicator
          size={100}
          color={Colors.primary}
          animating={animating}
        />
      </View>
    </View>
  );
};
