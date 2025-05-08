import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MobileOptions from '../components/MobileOptions';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Mock reducer
const mockStore = configureStore({
  reducer: {
    user: () => ({
      cart: [],  // provide an empty cart to avoid showing the badge
    }),
  },
});

describe('MobileOptions Component', () => {
  it('renders mobile navigation options', () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MobileOptions />
        </MemoryRouter>
      </Provider>
    );

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Account')).toBeInTheDocument();
    expect(getByText('Alerts')).toBeInTheDocument();
    expect(getByText('Cart')).toBeInTheDocument();
  });
});
