import {useAppStore} from '../store/useAppStore';

export const useNetwork = () => {
  const isOnline = useAppStore(state => state.isOnline);
  const pendingRequests = useAppStore(state => state.pendingRequests);

  return {
    isOnline,
    hasPendingRequests: pendingRequests.length > 0,
    pendingRequestsCount: pendingRequests.length,
  };
};
