const auth = {
  bootstrap: async (): Promise<{ firstRun: boolean; token: string | null }> => {
    // In a real app, this would involve secure storage
    const firstRun = localStorage.getItem('firstRun') !== 'false';
    const token = localStorage.getItem('token');
    return { firstRun, token };
  },

  setFirstRun: (value: boolean): void => {
    localStorage.setItem('firstRun', String(value));
  },

  login: async (email: string, pass: string): Promise<{ token: string }> => {
    // Mock API call
    if (email === 'test@example.com' && pass === 'password') {
      const token = 'fake-jwt-token';
      localStorage.setItem('token', token);
      return { token };
    }
    throw new Error('Invalid credentials');
  },

  signup: async (email: string, pass: string): Promise<{ token: string }> => {
    // Mock API call
    const token = 'fake-jwt-token';
    localStorage.setItem('token', token);
    return { token };
  },
};

export default auth;
