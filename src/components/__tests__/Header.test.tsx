import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

describe('Header', () => {
  const defaultProps = {
    title: 'Test Header',
    breadcrumbs: [
      { label: 'Home', path: '/' },
      { label: 'Current' },
    ],
    onAddClick: jest.fn(),
  };

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter });
  };

  it('renders title', () => {
    renderWithRouter(<Header {...defaultProps} />);
    expect(screen.getByText('Test Header')).toBeInTheDocument();
  });

  it('renders breadcrumbs', () => {
    renderWithRouter(<Header {...defaultProps} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
  });

  it('calls onAddClick when add button is clicked', () => {
    renderWithRouter(<Header {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /add new/i }));
    expect(defaultProps.onAddClick).toHaveBeenCalled();
  });

  it('does not render add button when showAddButton is false', () => {
    renderWithRouter(<Header {...defaultProps} showAddButton={false} />);
    expect(screen.queryByRole('button', { name: /add new/i })).not.toBeInTheDocument();
  });
});