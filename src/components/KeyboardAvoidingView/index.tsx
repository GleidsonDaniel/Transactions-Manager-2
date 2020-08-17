import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';

import {colors, DarkColorTheme} from '@/styles/colors';

interface IAvoidingView {
  backgroundColor?: keyof DarkColorTheme;
}

const AvoidingView: React.FC<IAvoidingView> = ({children, backgroundColor}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 55 : 0}
      style={{flex: 1, backgroundColor: backgroundColor || colors.background}}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default AvoidingView;
