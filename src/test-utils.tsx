import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import configureStore from 'redux-mock-store';
import type { PreloadedState } from '@reduxjs/toolkit';
import { getTheme } from './theme';
import type { RootState } from './store';

// Create a mock store with middleware
const mockStore = configureStore<Partial<RootState>>([]);

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      auth: {
        user: null,
        loading: false,
        error: null,
      },
      theme: {
        mode: 'light'
      }
    },
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  // Create a new store instance for each test
  const store = mockStore(preloadedState);

  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={getTheme('light')}>
            {children}
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from '@testing-library/react';