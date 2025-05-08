import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../Table';

describe('Table', () => {
  const mockRows = [
    { id: 1, name: 'Test 1' },
    { id: 2, name: 'Test 2' },
  ];

  const mockColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
  ];

  it('renders table with data', () => {
    render(<Table rows={mockRows} columns={mockColumns} />);
    expect(screen.getByText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('Test 2')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    render(<Table rows={mockRows} columns={mockColumns} loading />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows error message when error prop is provided', () => {
    const errorMessage = 'Failed to load data';
    render(<Table rows={mockRows} columns={mockColumns} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    const title = 'Test Table';
    render(<Table rows={mockRows} columns={mockColumns} title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});