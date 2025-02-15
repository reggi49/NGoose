import React from 'react';

// keyboard avoiding view
import {
    KeyboardAvoidingView,
    Keyboard,
    ScrollView,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native';

//colors
import { Colors } from '@/constants/Colors';

const KeyboardWrapper = ({ children }:any) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: Colors.light.white }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default KeyboardWrapper;
