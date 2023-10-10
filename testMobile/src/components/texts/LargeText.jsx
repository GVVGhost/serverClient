import {Text} from 'react-native';
import React from 'react';
import {TextStyles} from 'styles/TextStyles';

export const LargeText = ({text}) => {
    return <Text style={TextStyles.bigTextStyle}>{text}</Text>;
};