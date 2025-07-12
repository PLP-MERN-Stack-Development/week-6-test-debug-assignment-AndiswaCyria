import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../BugForm';

window.alert = jest.fn();

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          _id: '1',
          title: 'Test Bug',
          description: 'Some desc',
          status: 'open',
        }),
    })
  );
});

describe('BugForm', () => {
  it('renders inputs and submit button', () => {
    render(<BugForm onBugCreated={() => {}} />);
    expect(screen.getByPlaceholderText(/bug title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/bug description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit bug/i })).toBeInTheDocument();
  });

  it('calls onBugCreated when submitted with valid input', async () => {
    const mockCallback = jest.fn();
    render(<BugForm onBugCreated={mockCallback} />);

    fireEvent.change(screen.getByPlaceholderText(/bug title/i), {
      target: { value: 'Test Bug' },
    });

    fireEvent.change(screen.getByPlaceholderText(/bug description/i), {
      target: { value: 'Test Desc' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit bug/i }));

    // Wait for async effects
    await new Promise(res => setTimeout(res, 300));

    expect(mockCallback).toBeCalledWith(
      expect.objectContaining({
        title: 'Test Bug',
        status: 'open',
      })
    );
  });
});
