/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import {NetworkProvider} from './src/providers/NetworkProvider';
import {RootNavigator} from './src/navigation/RootNavigator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <NetworkProvider>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor="transparent"
            translucent
          />
          <RootNavigator />
        </NetworkProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;
