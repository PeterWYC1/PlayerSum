import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';


describe('NBA Player Height Finder', () => {
  test('renders the input and button', () => {
    render(<App />);
    
    const inputElement = screen.getByPlaceholderText(/Enter height in inches/i);
    const buttonElement = screen.getByText(/Search/i);
    
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('shows "No matches found" when no pairs are found', async () => {
    render(<App />);
    
    const inputElement = screen.getByPlaceholderText(/Enter height in inches/i);
    const buttonElement = screen.getByText(/Search/i);

    fireEvent.change(inputElement, { target: { value: '100' } });
    fireEvent.click(buttonElement);

    const resultElement = await screen.findByText(/No matches found/i);
    expect(resultElement).toBeInTheDocument();
  });

  test('shows the correct pairs when a match is found', async () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText(/Enter height in inches/i);
    const buttonElement = screen.getByText(/Search/i);

    fireEvent.change(inputElement, { target: { value: '139' } });
    fireEvent.click(buttonElement);

    const resultElement = await screen.findByText(/Brevin Knight - Nate Robinson/i);
    expect(resultElement).toBeInTheDocument();
  });
});
