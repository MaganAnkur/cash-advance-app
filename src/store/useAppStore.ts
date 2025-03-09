import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {storage} from '../storage/storage';
import {CashAdvanceRequest} from '../types';

interface AppState {
  isOnline: boolean;
  setIsOnline: (status: boolean) => void;
  pendingRequests: CashAdvanceRequest[];
  addPendingRequest: (request: CashAdvanceRequest) => void;
  removePendingRequest: (requestId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      isOnline: true,
      setIsOnline: status => set({isOnline: status}),
      pendingRequests: [],
      addPendingRequest: request =>
        set(state => ({
          pendingRequests: [...state.pendingRequests, request],
        })),
      removePendingRequest: requestId =>
        set(state => ({
          pendingRequests: state.pendingRequests.filter(
            req => req.id !== requestId,
          ),
        })),
    }),
    {
      name: 'app-storage',
      storage: {
        getItem: name => {
          const value = storage.getString(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          storage.set(name, JSON.stringify(value));
        },
        removeItem: name => {
          storage.delete(name);
        },
      },
    },
  ),
);
