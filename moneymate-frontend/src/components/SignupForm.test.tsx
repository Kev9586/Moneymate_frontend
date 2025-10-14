import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import SignupForm from './SignupForm';
import { BrowserRouter } from 'react-router-dom';

describe('SignupForm', () => {
  it('should display validation errors for invalid input', async () => {
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /signup/i }));

    expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
    expect(await screen.findByText('Password must be at least 6 characters')).toBeInTheDocument();
  });

  it("should display a password mismatch error", async () => {
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    );

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.input(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /signup/i }));

    expect(await screen.findByText("Passwords don't match")).toBeInTheDocument();
  });

  it('should not display validation errors for valid input', async () => {
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    );

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.input(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /signup/i }));

    expect(screen.queryByText('Invalid email address')).not.toBeInTheDocument();
    expect(screen.queryByText('Password must be at least 6 characters')).not.toBeInTheDocument();
    expect(screen.queryByText("Passwords don't match")).not.toBeInTheDocument();
  });
});
