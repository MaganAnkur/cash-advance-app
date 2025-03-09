export interface CashAdvance {
  id: string;
  amount: number;
  fees: number;
  paybackSchedule: PaybackSchedule[];
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  createdAt: string;
  syncStatus?: 'pending' | 'synced' | 'failed';
}

export interface CashAdvanceRequest {
  id: string;
  amount: number;
  requestedAt: string;
}

export interface PaybackSchedule {
  date: string;
  amount: number;
}

export interface User {
  id: string;
  availableLimit: number;
  name: string;
}
