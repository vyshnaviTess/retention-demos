// 1. Import React, testing libs, component, and navigation types
import React, { act } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import CheckInScreen, { SUBMIT_CHECKIN } from '../src/screens/CheckInScreen';

// 2. Import React Navigation types here
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

// 3. Define your RootStackParamList here (same as your app)
type RootStackParamList = {
  CheckIn: undefined;
  Progress: undefined;
  Messages: undefined;
};

// 4. Create typed mocks for navigation and route here
const navigation = {
  navigate: jest.fn(),
} as Partial<NativeStackNavigationProp<RootStackParamList, 'CheckIn'>> as NativeStackNavigationProp<
  RootStackParamList,
  'CheckIn'
>;


const route = {
  key: 'CheckIn',
  name: 'CheckIn',
  params: undefined,
} as RouteProp<RootStackParamList, 'CheckIn'>;

// 5. Define Apollo mocks for the mutation
const mocks = [
  {
    request: { query: SUBMIT_CHECKIN, variables: { mood: '😊' } },
    result: {
      data: { submitCheckIn: { id: '1', date: new Date().toISOString(), mood: '😊', __typename: 'CheckIn' } },
    },
  },
];

// 6. Your test suite
describe('CheckInScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows user to check in and shows feedback', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CheckInScreen navigation={navigation} route={route} />
      </MockedProvider>
    );

    await act(async () => {
      fireEvent.press(getByText('😊'));
    });

    await waitFor(() => {
      expect(getByText(/You checked in with/)).toBeTruthy();
    });
  });

  it('renders navigation buttons and triggers navigation', () => {
    const { getByText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CheckInScreen navigation={navigation} route={route} />
      </MockedProvider>
    );

    const progressButton = getByText('Go to Progress');
    const messagesButton = getByText('Go to Messages');

    expect(progressButton).toBeTruthy();
    expect(messagesButton).toBeTruthy();

    fireEvent.press(progressButton);
    expect(navigation.navigate).toHaveBeenCalledWith('Progress');

    fireEvent.press(messagesButton);
    expect(navigation.navigate).toHaveBeenCalledWith('Messages');
  });
});
