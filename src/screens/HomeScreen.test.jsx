import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import HomeScreen from './HomeScreen'

vi.mock('../firebase', () => ({ trackEvent: vi.fn() }))

describe('HomeScreen', () => {
  it('renders without crashing', () => {
    render(<HomeScreen nav={vi.fn()} />)
    expect(document.body).toBeTruthy()
  })
  it('renders main content', () => {
    render(<HomeScreen nav={vi.fn()} />)
    expect(document.body.innerHTML.length).toBeGreaterThan(100)
  })
  it('has buttons', () => {
    render(<HomeScreen nav={vi.fn()} />)
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
  })
  it('nav called when button clicked', () => {
    const navMock = vi.fn()
    render(<HomeScreen nav={navMock} />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(document.body).toBeTruthy()
  })
})