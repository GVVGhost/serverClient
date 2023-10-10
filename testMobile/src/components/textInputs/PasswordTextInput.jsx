import CustomTextInput from 'components/textInputs/CustomTextInput';

const PasswordTextInput = ({
  innerRef,
  onChangeText,
  onSubmitEditing,
  placeholder,
  value,
  autoFocus,
}) => {
  return (
    <CustomTextInput
      value={value}
      innerRef={innerRef}
      placeholder={placeholder}
      keyboardType="default"
      returnKeyType="next"
      onSubmitEditing={onSubmitEditing}
      secureTextEntry={true}
      onChangeText={onChangeText}
      autoCapitalize="none"
      autoFocus={autoFocus}
    />
  );
};

export default PasswordTextInput;
