import React, {useState} from 'react';
import {
  MaskedInput,
  Button,
  ButtonText,
  ErrorText,
  BasicInput,
} from '@/styles/baseStyles';
import {StepIndicator} from '@/components';

import {useFormik} from 'formik';

import {PaddingContainer} from './styles';
import isValidCPF from '@/helpers/isValidCpf';
import removeFalsy from '@/helpers/removeFalsy';
import {translate} from '@/locales';
import {colors} from '@/styles/colors';

const RegistrationForm: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const {values, handleSubmit, handleChange, errors, setFieldValue} = useFormik(
    {
      initialValues: {
        cpf: '',
        name: '',
        password: '',
        confirmPassword: '',
      },
      validate: values => {
        const err = {
          cpf: '',
          name: '',
          password: '',
          confirmPassword: '',
        };
        const mandatory = translate('mandatory');
        if (currentPosition === 0 && !values.cpf) err.cpf = mandatory;
        if (
          currentPosition === 0 &&
          values.cpf.length > 1 &&
          values.cpf.length < 14
        )
          err.cpf = translate('cpfLength');
        if (
          currentPosition === 0 &&
          values.cpf.length === 14 &&
          !isValidCPF(values.cpf)
        )
          err.cpf = translate('cpfInvalid');
        if (currentPosition === 1 && !values.name) err.name = mandatory;

        if (currentPosition === 2 && !values.password) err.password = mandatory;
        if (currentPosition === 2 && values.password.length < 6)
          err.password = translate('passwordLength');
        if (currentPosition === 3 && !values.confirmPassword)
          err.confirmPassword = mandatory;
        if (
          currentPosition === 3 &&
          values.confirmPassword.length > 1 &&
          values.confirmPassword !== values.password
        )
          err.confirmPassword = translate('confirmPassword');

        return removeFalsy(err);
      },
      onSubmit: (values, bag) => {
        if (currentPosition === 3) {
        } else {
          setCurrentPosition(currentPosition + 1);
        }
      },
    },
  );

  const handleCurrentPosition = (position: number) => {
    if (position === currentPosition) return;
    if (position < currentPosition) return setCurrentPosition(position);
  };

  return (
    <>
      {currentPosition === 0 && (
        <>
          <MaskedInput
            value={values.cpf}
            autoCapitalize="none"
            placeholder="CPF"
            onChangeText={handleChange('cpf')}
            placeholderTextColor={colors.secondary_text}
            type={'cpf'}
            onSubmitEditing={handleSubmit}
          />
          {!!errors.cpf && <ErrorText>{errors.cpf}</ErrorText>}
        </>
      )}
      {currentPosition === 1 && (
        <>
          <BasicInput
            value={values.name}
            placeholder={translate('name')}
            placeholderTextColor={colors.secondary_text}
            onSubmitEditing={handleSubmit}
            onChangeText={text =>
              setFieldValue('name', text.replace(/[0-9]/g, ''))
            }
          />
          {!!errors.name && <ErrorText>{errors.name}</ErrorText>}
        </>
      )}
      {currentPosition === 2 && (
        <>
          <MaskedInput
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
          {!!errors.password && <ErrorText>{errors.password}</ErrorText>}
        </>
      )}
      {currentPosition === 3 && (
        <>
          <MaskedInput
            value={values.confirmPassword}
            autoCapitalize="none"
            placeholder={translate('passwordConfirm')}
            onChangeText={handleChange('confirmPassword')}
            placeholderTextColor={colors.secondary_text}
            type={'custom'}
            options={{
              mask: '999999',
            }}
            onSubmitEditing={handleSubmit}
          />
          {!!errors.confirmPassword && (
            <ErrorText>{errors.confirmPassword}</ErrorText>
          )}
        </>
      )}
      <PaddingContainer>
        <StepIndicator
          currentPosition={currentPosition}
          onPress={handleCurrentPosition}
        />
      </PaddingContainer>
      <PaddingContainer>
        <Button
          onPress={() => {
            handleSubmit();
          }}>
          <ButtonText>{translate('continue')}</ButtonText>
        </Button>
      </PaddingContainer>
    </>
  );
};

export default RegistrationForm;
