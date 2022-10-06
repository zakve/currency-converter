import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders currency converter', () => {
  render(<App />);
  const headerText = screen.getByText(/currency converter/i);
  expect(headerText).toBeInTheDocument();
});
