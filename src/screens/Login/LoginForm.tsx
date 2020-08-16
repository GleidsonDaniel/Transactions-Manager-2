import React, {useRef} from 'react';
import {MaskedInput, Button, ButtonText, ErrorText} from '@/styles/baseStyles';

import {useFormik} from 'formik';

import {PaddingContainer} from './styles';
import isValidCPF from '@/helpers/isValidCpf';
import removeFalsy from '@/helpers/removeFalsy';
import {translate} from '@/locales';
import {colors} from '@/styles/colors';

const LoginForm: React.FC = () => {
  const passwordInputRef = useRef();
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
        // console.log(values);
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
        <Button
          testID="confirmButton"
          onPress={() => {
            handleSubmit();
          }}>
          <ButtonText>{translate('continue')}</ButtonText>
        </Button>
      </PaddingContainer>
    </>
  );
};

export default LoginForm;
