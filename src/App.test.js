import { render, screen } from '@testing-library/react';
import App from './App';

test('renders campus notifications title', () => {
  render(<App />);
  expect(screen.getByText(/campus notifications/i)).toBeInTheDocument();
});
