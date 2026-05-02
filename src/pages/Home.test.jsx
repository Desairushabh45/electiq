import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

describe('Home Page', () => {
  it('Test home page renders', () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    expect(screen.getByText(/Understand Democracy/i)).toBeInTheDocument()
  })
  it('Test all sections present', () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    expect(screen.getByText(/Understand Democracy/i)).toBeInTheDocument()
    expect(screen.getAllByRole('link').length).toBeGreaterThan(0)
  })
  it('Test feature cards render', () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    expect(screen.getByText(/Step-by-Step Guide/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Interactive Quiz/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/AI Assistant/i).length).toBeGreaterThan(0)
  })
})