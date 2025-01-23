import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';

test('renders learn react link', () => {
  render(
    <BrowserRouter>
      <NavigationBar />
    </BrowserRouter>
);
  const linkElement = screen.getByText(/veebipood/i);
  expect(linkElement).toBeInTheDocument();
});
