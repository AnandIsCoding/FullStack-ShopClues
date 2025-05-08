import { render } from '@testing-library/react'
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'
import { vi } from 'vitest'
import { useEffect } from 'react'
import React from 'react'

// Helper component to trigger navigation
function TestComponent() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/new-route')
  }, [navigate])

  return null
}

describe('ScrollToTop', () => {
  beforeEach(() => {
    // mock scrollTo
    window.scrollTo = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('calls scrollTo when the route changes', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<TestComponent />} />
          <Route path="/new-route" element={<div>New Route</div>} />
        </Routes>
      </MemoryRouter>
    )

    // Wait a tick for the useEffect to fire and route to change
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
  })
})