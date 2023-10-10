import CustomTextInput from 'components/textInputs/CustomTextInput';

const EmailTextInput = ({
  onChangeText,
  onSubmitEditing,
  placeholder,
  value,
  autoFocus,
}) => {
  return (
    <CustomTextInput
      value={value}
      ref={null}
      placeholder={placeholder}
      keyboardType="email-address"
      returnKeyType="next"
      onSubmitEditing={onSubmitEditing}
      secureTextEntry={false}
      onChangeText={onChangeText}
      autoCapitalize="none"
      autoFocus={autoFocus}
    />
  );
};

export default EmailTextInput;
