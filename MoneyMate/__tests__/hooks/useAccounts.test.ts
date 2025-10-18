import { renderHook, waitFor } from '@testing-library/react-native';
import { useAccounts } from '../../src/hooks/useAccounts';
import { getAccounts } from '../../src/services/accounts';

jest.mock('../../src/services/accounts');

const mockAccounts = [
  { id: '1', name: 'Account 1', balance: 100, type: 'checking' },
  { id: '2', name: 'Account 2', balance: 200, type: 'savings' },
];

describe('useAccounts', () => {
  it('should fetch accounts on mount', async () => {
    getAccounts.mockResolvedValue({ data: mockAccounts });

    const { result } = renderHook(() => useAccounts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.accounts).toEqual(mockAccounts);
    expect(result.current.error).toBe(null);
  });
});
