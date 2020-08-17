import React from 'react';
import StepIndicator from 'react-native-step-indicator';

import {Container} from './styles';
import {colors} from '@/styles/colors';

interface IStepIndicator {
  currentPosition: number;
  stepCount?: number;
  onPress?: (position: number) => void;
}

const Indicator: React.FC<IStepIndicator> = ({
  currentPosition,
  stepCount,
  onPress,
}) => {
  return (
    <Container>
      <StepIndicator
        currentPosition={currentPosition}
        stepCount={stepCount || 4}
        customStyles={{
          stepStrokeCurrentColor: colors.primary_light,
          stepIndicatorCurrentColor: colors.primary_dark,
          stepIndicatorLabelCurrentColor: colors.primary_light,

          stepIndicatorUnFinishedColor: colors.primary_dark,
          stepIndicatorLabelUnFinishedColor: colors.primary_light,
          separatorUnFinishedColor: colors.primary_light,
          separatorFinishedColor: colors.green,
        }}
        onPress={onPress}
      />
    </Container>
  );
};

export default Indicator;
