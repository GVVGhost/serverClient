import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ButtonStyles} from 'styles/ButtonStyles';

const CustomButton = ({onPress, text}) => {
  return (
    <TouchableOpacity
      style={ButtonStyles.cbContainer}
      activeOpacity={0.5}
      onPress={onPress}>
      <Text style={ButtonStyles.cbTextStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
