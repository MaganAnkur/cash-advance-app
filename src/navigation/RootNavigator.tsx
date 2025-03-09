import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CashAdvanceScreen} from '../screens/CashAdvanceScreen';
import {RequestAdvanceScreen} from '../screens/RequestAdvanceScreen';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CashAdvances"
        component={CashAdvanceScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RequestAdvance"
        component={RequestAdvanceScreen}
        options={{
          presentation: 'modal',
          title: 'Request Cash Advance',
        }}
      />
    </Stack.Navigator>
  );
}; 