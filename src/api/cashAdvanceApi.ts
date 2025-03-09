import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {useAppStore} from '../store/useAppStore';
import {v4 as uuidv4} from 'uuid';
import {CashAdvance, CashAdvanceRequest} from '../types';
import {mockApiService} from '../services/mockApiService';

// Fetch cash advance details
export const useCashAdvance = (id: string) => {
  const isOnline = useAppStore(state => state.isOnline);

  return useQuery({
    queryKey: ['cashAdvance', id],
    queryFn: () => mockApiService.fetchCashAdvance(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    // Use cached data when offline
    networkMode: isOnline ? 'online' : 'offlineFirst',

    // Retry only when online
    retry: isOnline ? 3 : 0,
  });
};

// Create cash advance request
export const useCreateCashAdvance = () => {
  const queryClient = useQueryClient();
  const {isOnline, addPendingRequest} = useAppStore();

  return useMutation({
    mutationFn: async (data: CashAdvanceRequest) => {
      if (!isOnline) {
        // Store request for later processing
        const offlineRequest = {
          ...data,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          status: 'pending' as const,
          syncStatus: 'pending' as const,
        };
        addPendingRequest(offlineRequest);

        // Return optimistic response
        return offlineRequest;
      }

      return mockApiService.createCashAdvance(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['cashAdvances']});
    },
  });
};

// Get all cash advances
export const useCashAdvances = () => {
  return useQuery<CashAdvance[]>({
    queryKey: ['cashAdvances'],
    queryFn: mockApiService.fetchCashAdvances,
  });
};

const API_URL = 'https://api.example.com';

export const createCashAdvance = async (
  request: CashAdvanceRequest,
): Promise<CashAdvance> => {
  const response = await fetch(`${API_URL}/cash-advances`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Failed to create cash advance');
  }

  return response.json();
};
