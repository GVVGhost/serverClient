import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {Colors} from 'styles/Colors';

const CustomTextInput = ({
  innerRef,
  value,
  placeholder,
  keyboardType,
  returnKeyType,
  onSubmitEditing,
  secureTextEntry,
  onChangeText,
  autoCapitalize,
  autoFocus,
}) => {
  return (
    <View style={CustomTIStyles.SectionStyle}>
      <TextInput
        style={CustomTIStyles.inputStyle}
        blurOnSubmit={false}
        underlineColorAndroid="#f000"
        placeholderTextColor="#8b9cb5"
        ref={innerRef}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        autoCapitalize={autoCapitalize}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secureTextEntry}
        onChangeText={value => onChangeText(value)}
        autoFocus={autoFocus}
      />
    </View>
  );
};

export default CustomTextInput;

const CustomTIStyles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 50,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  inputStyle: {
    flex: 1,
    color: Colors.text,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: Colors.primary,
  },
});
