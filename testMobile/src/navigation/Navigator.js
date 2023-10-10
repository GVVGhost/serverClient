import React from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from 'utils/AuthContext';
import {SplashScreen} from 'screens/SplashScreen';
import LoginScreen from 'screens/LogginScreen';
import {NavBar} from 'navigation/NavBar';

const Stack = createNativeStackNavigator();
const screenOptions = {headerShown: false};

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};

export const Navigator = () => {
  const {isSignedIn} = useAuth();

  return (
    <NavigationContainer theme={navigatorTheme}>
      <Stack.Navigator screenOptions={screenOptions}>
        {!isSignedIn ? (
          <>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="NavBar" component={NavBar} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
