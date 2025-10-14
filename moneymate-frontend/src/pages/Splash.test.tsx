import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Splash from './Splash';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

// Mock the entire store
vi.mock('../store/useAuthStore');

const TestApp = ({ initialEntries }: { initialEntries: string[] }) => (
  <MemoryRouter initialEntries={initialEntries}>
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/onboarding" element={<div>Onboarding Page</div>} />
      <Route path="/dashboard" element={<div>Dashboard Page</div>} />
      <Route path="/auth" element={<div>Auth Page</div>} />
    </Routes>
  </MemoryRouter>
);

describe('Splash', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it("should navigate to onboarding on first run", async () => {
    // Mock the store's state for this specific test
    vi.mocked(useAuthStore).mockReturnValue({
      initialized: true,
      firstRun: true,
      token: null,
      // Add other properties of the store state as needed
      loading: false,
      error: null,
      setToken: vi.fn(),
      setFirstRun: vi.fn(),
      bootstrap: vi.fn(),
      login: vi.fn(),
      signup: vi.fn(),
    });

    render(<TestApp initialEntries={['/']} />);
    await waitFor(() => {
      expect(screen.getByText('Onboarding Page')).toBeInTheDocument();
    });
  });

  it('should navigate to dashboard if a token exists', async () => {
    vi.mocked(useAuthStore).mockReturnValue({
      initialized: true,
      firstRun: false,
      token: 'some-token',
      loading: false,
      error: null,
      setToken: vi.fn(),
      setFirstRun: vi.fn(),
      bootstrap: vi.fn(),
      login: vi.fn(),
      signup: vi.fn(),
    });

    render(<TestApp initialEntries={['/']} />);
    await waitFor(() => {
      expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
    });
  });

  it('should navigate to auth if no token and not first run', async () => {
    vi.mocked(useAuthStore).mockReturnValue({
      initialized: true,
      firstRun: false,
      token: null,
      loading: false,
      error: null,
      setToken: vi.fn(),
      setFirstRun: vi.fn(),
      bootstrap: vi.fn(),
      login: vi.fn(),
      signup: vi.fn(),
    });

    render(<TestApp initialEntries={['/']} />);
    await waitFor(() => {
      expect(screen.getByText('Auth Page')).toBeInTheDocument();
    });
  });
});
