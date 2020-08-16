import AsyncStorage from '@react-native-community/async-storage';
import {useFormik} from 'formik';
import React, {useState} from 'react';

import {StepIndicator} from '@/components';
import {useUser} from '@/contexts/user';
import {showErrorAlert, showSuccessAlert} from '@/helpers/flashMessage';
import isValidCPF from '@/helpers/isValidCpf';
import removeFalsy from '@/helpers/removeFalsy';
import {translate} from '@/locales';
import {typeRoutes} from '@/routes/types';
import {createUser, createTransaction} from '@/services/realm';
import {
  BasicInput,
  Button,
  ButtonText,
  ErrorText,
  MaskedInput,
} from '@/styles/baseStyles';
import {colors} from '@/styles/colors';

import {PaddingContainer, CancelButton, CancelText} from './styles';

interface IFinancialForm {
  cancelTransaction: () => void;
}

const FinancialForm: React.FC<IFinancialForm> = ({cancelTransaction}) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const {setContextTransactions, user, setContextUser} = useUser();

  const handleCreateTransaction = async (transaction: {
    cpf: number;
    description: string;
    value: string;
  }) => {
    const data = await createTransaction(
      {
        description: transaction.description,
        receiverCpf: transaction.cpf,
        senderCpf: user.cpf,
        value: parseInt(transaction.value.replace(/[^0-9]/g, '')),
      },
      (u, t) => {
        setContextUser(u);
      },
    );
    if (!!data.success) {
      cancelTransaction();
      showSuccessAlert(data.message);
    } else {
      return showErrorAlert(data.message);
    }
  };

  const {values, handleSubmit, handleChange, errors, setFieldValue} = useFormik(
    {
      initialValues: {
        cpf: '',
        description: '',
        value: '',
        password: '',
      },
      validate: values => {
        const err = {
          cpf: '',
          description: '',
          value: '',
          password: '',
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
        if (currentPosition === 2 && !values.description)
          err.description = mandatory;

        if (currentPosition === 1 && !values.value) err.value = mandatory;
        if (
          currentPosition === 1 &&
          parseInt(values.value.replace(/[^0-9]/g, '')) >
            parseInt(user?.balance)
        )
          err.value = translate('insufficientFunds');
        if (currentPosition === 3 && !values.password) err.value = mandatory;
        if (currentPosition === 3 && values.password.length < 6)
          err.password = translate('passwordLength');
        if (
          currentPosition === 3 &&
          parseInt(values.password) != user?.password
        )
          err.password = translate('confirmPassword');
        return removeFalsy(err);
      },
      onSubmit: values => {
        if (currentPosition === 3) {
          handleCreateTransaction({
            cpf: parseInt(values.cpf.replace(/[^0-9]/g, '')),
            description: values.description,
            value: values.value,
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
            placeholder={translate('destinyCpf')}
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
      {currentPosition === 2 && (
        <>
          <BasicInput
            value={values.description}
            testID="descriptionInput"
            placeholder={translate('description')}
            placeholderTextColor={colors.secondary_text}
            onSubmitEditing={handleSubmit}
            onChangeText={text => setFieldValue('description', text)}
          />
          {!!errors.description && (
            <ErrorText testID="descriptionInputError">
              {errors.description}
            </ErrorText>
          )}
        </>
      )}
      {currentPosition === 1 && (
        <>
          <MaskedInput
            testID="valueInput"
            value={values.value}
            autoCapitalize="none"
            placeholder={translate('insertValue')}
            onChangeText={handleChange('value')}
            placeholderTextColor={colors.secondary_text}
            type={'money'}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$',
              suffixUnit: '',
            }}
            onSubmitEditing={handleSubmit}
          />
          {!!errors.value && (
            <ErrorText testID="confirmPasswordInputError">
              {errors.value}
            </ErrorText>
          )}
        </>
      )}
      {currentPosition === 3 && (
        <>
          <MaskedInput
            testID="passwordInput"
            value={values.password}
            autoCapitalize="none"
            placeholder={translate('yourPassword')}
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
        <CancelButton onPress={cancelTransaction}>
          <CancelText>{translate('cancel')}</CancelText>
        </CancelButton>
      </PaddingContainer>
    </>
  );
};

export default FinancialForm;
