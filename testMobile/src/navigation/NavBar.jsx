import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import HomeScreen from 'screens/HomeScreen';
import SettingsScreen from 'screens/SettingsScreen';

const BottomTab = createBottomTabNavigator();
const screenOptions = {headerShown: false};
export const NavBar = ({navigation}) => {
  const tabBarIcon =
    name =>
    ({color, size}) => {
      return <Icon name={name} color={color} size={size} />;
    };

  return (
    <BottomTab.Navigator screenOptions={screenOptions}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarIcon: tabBarIcon('documents')}}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{tabBarIcon: tabBarIcon('cog')}}
      />
    </BottomTab.Navigator>
  );
};
