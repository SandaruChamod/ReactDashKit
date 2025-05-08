import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dialog from '../Dialog';

describe('Dialog', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    title: 'Test Dialog',
    children: <div>Dialog content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dialog with title and content', () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('Dialog content')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Dialog {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('shows submit and cancel buttons when onSubmit is provided', () => {
    render(<Dialog {...defaultProps} onSubmit={mockOnSubmit} />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('calls onSubmit when submit button is clicked', () => {
    render(<Dialog {...defaultProps} onSubmit={mockOnSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('disables buttons when loading', () => {
    render(<Dialog {...defaultProps} onSubmit={mockOnSubmit} loading />);
    expect(screen.getByRole('button', { name: /cancel/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });
});