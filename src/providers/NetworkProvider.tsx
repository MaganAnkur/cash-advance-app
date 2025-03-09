import React, {PropsWithChildren, useEffect, useCallback} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {useAppStore} from '../store/useAppStore';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {mockApiService} from '../services/mockApiService';

export const NetworkProvider: React.FC<PropsWithChildren> = ({children}) => {
  const {setIsOnline, pendingRequests} = useAppStore();
  const queryClient = useQueryClient();

  // Create a mutation for syncing requests
  const {mutateAsync: syncRequest} = useMutation({
    mutationFn: mockApiService.createCashAdvance,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['cashAdvances']});
    },
  });

  const syncPendingRequests = useCallback(async () => {
    for (const request of pendingRequests) {
      try {
        await syncRequest(request);
        if (request.id) {
          useAppStore.getState().removePendingRequest(request.id);
        }
      } catch (error) {
        console.error('Failed to sync request:', error);
      }
    }
  }, [pendingRequests, syncRequest]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const isConnected = state.isConnected && state.isInternetReachable;
      setIsOnline(!!isConnected);

      if (isConnected && pendingRequests.length > 0) {
        syncPendingRequests();
      }
    });

    return () => unsubscribe();
  }, [pendingRequests, setIsOnline, syncPendingRequests]);

  return <>{children}</>;
};
