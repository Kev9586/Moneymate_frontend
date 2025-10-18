import { renderHook, waitFor } from '@testing-library/react-native';
import { useTransactions } from '../../src/hooks/useTransactions';
import { getRecentTransactions } from '../../src/services/transactions';

jest.mock('../../src/services/transactions');

const mockTransactions = [
  {
    id: '1',
    description: 'Transaction 1',
    amount: 100,
    date: '2025-10-18',
    type: 'expense',
    account: { id: '1', name: 'Account 1', balance: 100, type: 'checking' },
  },
];

describe('useTransactions', () => {
  it('should fetch transactions on mount', async () => {
    getRecentTransactions.mockResolvedValue({ data: mockTransactions });

    const { result } = renderHook(() => useTransactions());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.transactions).toEqual(mockTransactions);
    expect(result.current.error).toBe(null);
  });
});
