import {CashAdvance, CashAdvanceRequest} from '../types';
import {v4 as uuidv4} from 'uuid';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockAdvances: CashAdvance[] = [
  {
    id: '1',
    amount: 1000,
    fees: 50,
    status: 'approved',
    createdAt: new Date().toISOString(),
    paybackSchedule: [
      {
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        amount: 525,
      },
      {
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
        amount: 525,
      },
    ],
  },
];

export const mockApiService = {
  fetchCashAdvance: async (id: string): Promise<CashAdvance> => {
    await delay(1000); // Simulate network delay
    const advance = mockAdvances.find(adv => adv.id === id);
    if (!advance) {
      throw new Error('Cash advance not found');
    }
    return advance;
  },

  fetchCashAdvances: async (): Promise<CashAdvance[]> => {
    await delay(1000);
    return mockAdvances;
  },

  createCashAdvance: async (
    request: CashAdvanceRequest,
  ): Promise<CashAdvance> => {
    await delay(150);

    // Simulate validation
    if (request.amount <= 0) {
      throw new Error('Invalid amount');
    }

    const newAdvance: CashAdvance = {
      id: request.id || uuidv4(),
      amount: request.amount,
      fees: request.amount * 0.05, // 5% fee
      status: 'pending',
      createdAt: request.requestedAt,
      paybackSchedule: [
        {
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          amount: request.amount / 2 + (request.amount * 0.05) / 2,
        },
        {
          date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          amount: request.amount / 2 + (request.amount * 0.05) / 2,
        },
      ],
    };

    mockAdvances.push(newAdvance);
    return newAdvance;
  },
};
