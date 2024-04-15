import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupStore } from '../../app/store'
import { SnackbarProvider } from '../../components/util/SnackBarContext';
import { BrowserRouter as Router } from 'react-router-dom'

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router>
          <SnackbarProvider>{children}</SnackbarProvider>
        </Router>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
