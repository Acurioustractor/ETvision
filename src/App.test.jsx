import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Empathy Ledger heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Empathy Ledger/i })).toBeInTheDocument();
}); 