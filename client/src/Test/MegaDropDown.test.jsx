import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MegaDropDown from '../components/MegaDropDown';

describe('MegaDropDown Component', () => {
  it('renders correctly with given props', () => {
    const { getByText } = render(
      <MemoryRouter>
        <MegaDropDown 
          categoryId={1} 
          categoryName="Electronics" 
          setHoveredCategoryId={() => {}} 
        />
      </MemoryRouter>
    );

    expect(getByText('Electronics')).toBeInTheDocument();
  });
});
