import {useFormik} from 'formik';
import React, {useRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {useUser, User} from '@/contexts/user';
import {showErrorAlert, showSuccessAlert} from '@/helpers/flashMessage';
import isValidCPF from '@/helpers/isValidCpf';
import removeFalsy from '@/helpers/removeFalsy';
import {translate} from '@/locales';
import {typeRoutes} from '@/routes/types';
import {login} from '@/services/realm';
import {Button, ButtonText, ErrorText, MaskedInput} from '@/styles/baseStyles';
import {colors} from '@/styles/colors';

import {PaddingContainer} from './styles';

const LoginForm: React.FC = ({navigation}) => {
  const passwordInputRef = useRef();
  const {setContextUser} = useUser();

  const setUser = async (user: User) => {
    setContextUser(user);
    await AsyncStorage.setItem('@user', JSON.stringify(user));
  };

  const handleLogin = async (loginParameters: {
    cpf: string;
    password: string;
  }) => {
    const data = await login(
      loginParameters.cpf,
      loginParameters.password,
      user => setUser(user),
    );
    if (!!data.success) {
      showSuccessAlert(data.message);
      return navigation.dispatch(resetAndGo(typeRoutes.home));
    } else {
      showErrorAlert(data.message);
    }
  };

  const {values, handleSubmit, handleChange, errors, setFieldValue} = useFormik(
    {
      initialValues: {
        cpf: '',
        password: '',
      },
      validate: values => {
        const err = {
          cpf: '',
          password: '',
        };
        const mandatory = translate('mandatory');
        if (!values.cpf) err.cpf = mandatory;
        if (values.cpf.length > 1 && values.cpf.length < 14)
          err.cpf = translate('cpfLength');
        if (values.cpf.length === 14 && !isValidCPF(values.cpf))
          err.cpf = translate('cpfInvalid');
        if (!values.password) err.password = mandatory;
        if (values.password.length < 6)
          err.password = translate('passwordLength');
        return removeFalsy(err);
      },
      onSubmit: values => {
        handleLogin(values);
      },
    },
  );

  return (
    <>
      <MaskedInput
        testID="cpfInput"
        value={values.cpf}
        autoCapitalize="none"
        placeholder="CPF"
        onChangeText={handleChange('cpf')}
        placeholderTextColor={colors.secondary_text}
        type={'cpf'}
        onSubmitEditing={() => passwordInputRef?.current?.getElement()?.focus()}
      />
      {!!errors.cpf && (
        <ErrorText testID="cpfInputError">{errors.cpf}</ErrorText>
      )}
      <MaskedInput
        testID="passwordInput"
        ref={passwordInputRef}
        value={values.password}
        autoCapitalize="none"
        placeholder={translate('password')}
        onChangeText={handleChange('password')}
        placeholderTextColor={colors.secondary_text}
        type={'custom'}
        options={{
          mask: '999999',
        }}
        onSubmitEditing={handleSubmit}
      />
      {!!errors.password && (
        <ErrorText testID="passwordInputError">{errors.password}</ErrorText>
      )}
      <PaddingContainer>
        <Button testID="confirmButton" onPress={handleSubmit}>
          <ButtonText>{translate('continue')}</ButtonText>
        </Button>
      </PaddingContainer>
    </>
  );
};

export default LoginForm;
