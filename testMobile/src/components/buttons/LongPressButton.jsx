import React, {Text, TouchableOpacity} from 'react-native';
import {ButtonStyles} from 'styles/ButtonStyles';

export const LongPressButton = ({title, onPress, ...props}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={ButtonStyles.lpbContainer}
      delayLongPress={1000}
      {...props}>
      <Text style={ButtonStyles.lpbText}>{title}</Text>
    </TouchableOpacity>
  );
};
