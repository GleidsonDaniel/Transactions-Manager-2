import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
jest.mock('@react-native-community/async-storage', () => ({
  useAsyncStorage: jest.fn(),
}));

jest.mock('@react-navigation/native', () => {
  const mockedNavigate = jest.fn();
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
      dispatch: mockedNavigate,
      goBack: mockedNavigate,
    }),
  };
});
