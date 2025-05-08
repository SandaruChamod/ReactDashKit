import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs';

describe('Breadcrumbs', () => {
  const defaultItems = [
    { label: 'Home', path: '/' },
    { label: 'Users', path: '/users' },
    { label: 'Details' },
  ];

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter });
  };

  it('renders all breadcrumb items', () => {
    renderWithRouter(<Breadcrumbs items={defaultItems} />);
    defaultItems.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it('renders last item without link', () => {
    renderWithRouter(<Breadcrumbs items={defaultItems} />);
    const lastItem = screen.getByText('Details');
    expect(lastItem.closest('a')).toBeNull();
  });

  it('renders other items as links', () => {
    renderWithRouter(<Breadcrumbs items={defaultItems} />);
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Users').closest('a')).toHaveAttribute('href', '/users');
  });
});