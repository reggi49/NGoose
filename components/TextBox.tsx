import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import {
    StyledInputLabel,
    StyledTextInput,
    LeftIcon,
    RightIcon
} from '@/constants/Styles';

import { Colors } from '@/constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
    map: any;
    icon: string;
    label: string;
    isPassword: string;
    hidePassword: string;
    setHidePassword: boolean|any;
    props: any;
};

const TextBox = ({
    label,
    icon,
    isPassword,
    hidePassword,
    setHidePassword,
    ...props
} : Props) => {
    return (
        <View>
            <LeftIcon>
                <Icon name={icon} size={30} color={Colors.light.black} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon
                    onPress={() => {
                        setHidePassword(!hidePassword);
                    }}>
                    <Icon
                        name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                        size={30}
                        color={Colors.light.black}
                    />
                </RightIcon>
            )}
        </View>
    );
};

export default TextBox;
