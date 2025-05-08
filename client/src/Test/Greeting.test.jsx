import { render, screen } from '@testing-library/react'
import Greeting from '../components/Greeting'
import React from 'react'
describe('Greeting', () => {
  it('renders the name', () => {
    render(<Greeting name="Alice" />)
    expect(screen.getByText('Hello, Alice!')).toBeInTheDocument()
  })
})