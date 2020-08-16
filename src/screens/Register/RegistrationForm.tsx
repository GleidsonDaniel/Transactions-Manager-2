import AsyncStorage from '@react-native-community/async-storage';
import {useFormik} from 'formik';
import React, {useState} from 'react';

import {StepIndicator} from '@/components';
import {User, useUser} from '@/contexts/user';
import {showErrorAlert, showSuccessAlert} from '@/helpers/flashMessage';
import isValidCPF from '@/helpers/isValidCpf';
import removeFalsy from '@/helpers/removeFalsy';
import {resetAndGo} from '@/helpers/resetScreen';
import {translate} from '@/locales';
import {typeRoutes} from '@/routes/types';
import {createUser} from '@/services/realm';
import {IUser} from '@/services/schemas';
import {
  BasicInput,
  Button,
  ButtonText,
  ErrorText,
  MaskedInput,
} from '@/styles/baseStyles';
import {colors} from '@/styles/colors';

import {PaddingContainer} from './styles';

const RegistrationForm: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const {setContextUser} = useUser();

  const setUser = async (user: User) => {
    setContextUser(user);
    await AsyncStorage.setItem('@user', JSON.stringify(user));
  };

  const handleCreateUser = async (user: IUser) => {
    const data = await createUser(
      {
        cpf: user.cpf,
        name: user.name,
        password: user.password,
      },
      user => setUser(user),
    );
    if (!!data.success) {
      showSuccessAlert(data.message);
      return navigation.dispatch(resetAndGo(typeRoutes.home));
    } else {
      return showErrorAlert(data.message);
    }
  };

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
      onSubmit: values => {
        if (currentPosition === 3) {
          handleCreateUser({
            cpf: parseInt(values.cpf, 10),
            name: values.name,
            password: parseInt(values.password, 10),
          });
        } else {
          setCurrentPosition(currentPosition + 1);
          () => {};
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
            testID="cpfInput"
            value={values.cpf}
            autoCapitalize="none"
            placeholder="CPF"
            onChangeText={handleChange('cpf')}
            placeholderTextColor={colors.secondary_text}
            type={'cpf'}
            onSubmitEditing={handleSubmit}
          />
          {!!errors.cpf && (
            <ErrorText testID="cpfInputError">{errors.cpf}</ErrorText>
          )}
        </>
      )}
      {currentPosition === 1 && (
        <>
          <BasicInput
            value={values.name}
            testID="nameInput"
            placeholder={translate('name')}
            placeholderTextColor={colors.secondary_text}
            onSubmitEditing={handleSubmit}
            onChangeText={text =>
              setFieldValue('name', text.replace(/[0-9]/g, ''))
            }
          />
          {!!errors.name && (
            <ErrorText testID="nameInputError">{errors.name}</ErrorText>
          )}
        </>
      )}
      {currentPosition === 2 && (
        <>
          <MaskedInput
            testID="passwordInput"
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
        </>
      )}
      {currentPosition === 3 && (
        <>
          <MaskedInput
            testID="confirmPasswordInput"
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
            <ErrorText testID="confirmPasswordInputError">
              {errors.confirmPassword}
            </ErrorText>
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
        <Button testID="confirmButton" onPress={handleSubmit}>
          <ButtonText>{translate('continue')}</ButtonText>
        </Button>
      </PaddingContainer>
    </>
  );
};

export default RegistrationForm;
