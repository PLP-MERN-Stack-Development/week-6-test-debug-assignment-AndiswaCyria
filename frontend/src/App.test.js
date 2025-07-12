// src/__tests__/App.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// Mocks
beforeEach(() => {
  // Mock initial GET response with 1 bug
  global.fetch = jest.fn((url, options) => {
    if (!options || options.method === 'GET') {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              _id: '123',
              title: 'Delete Me',
              description: 'Bug to be deleted',
              status: 'open',
            },
          ]),
      });
    }

    // Mock DELETE response
    if (options.method === 'DELETE') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Bug deleted' }),
      });
    }
  });

  window.confirm = jest.fn(() => true); // auto-confirm deletion
});

afterEach(() => {
  jest.clearAllMocks();
});

test('deletes a bug from the list when delete button is clicked', async () => {
  render(<App />);

  // Wait for bug to appear
  const bug = await screen.findByText(/delete me/i);
  expect(bug).toBeInTheDocument();

  // Click delete
  const deleteBtn = screen.getByRole('button', { name: /delete/i });
  fireEvent.click(deleteBtn);

  // Wait for bug to be removed
  await waitFor(() => {
    expect(screen.queryByText(/delete me/i)).not.toBeInTheDocument();
  });

  // Check DELETE API call
  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringContaining('/123'),
    expect.objectContaining({ method: 'DELETE' })
  );
});
