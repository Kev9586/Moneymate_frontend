import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import LoginForm from './LoginForm';
import { BrowserRouter } from 'react-router-dom';

describe('LoginForm', () => {
  it('should display validation errors for invalid input', async () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
    expect(await screen.findByText('Password must be at least 6 characters')).toBeInTheDocument();
  });

  it('should not display validation errors for valid input', async () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.queryByText('Invalid email address')).not.toBeInTheDocument();
    expect(screen.queryByText('Password must be at least 6 characters')).not.toBeInTheDocument();
  });
});
