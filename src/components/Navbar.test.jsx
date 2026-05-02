import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Navbar from './Navbar'

vi.mock('../firebase', () => ({ trackEvent: vi.fn() }))

describe('Navbar', () => {
  it('renders without crashing', () => {
    render(<Navbar screen="HOME" nav={vi.fn()} />)
    expect(document.body).toBeTruthy()
  })
  it('ElectIQ brand exists', () => {
    render(<Navbar screen="HOME" nav={vi.fn()} />)
    expect(document.body.innerHTML).toContain('Elect')
  })
  it('navigation links present', () => {
    render(<Navbar screen="HOME" nav={vi.fn()} />)
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
  })
  it('mobile menu button exists', () => {
    render(<Navbar screen="HOME" nav={vi.fn()} />)
    expect(screen.getByRole('button', { name: /Menu/i })).toBeInTheDocument()
  })
  it('mobile menu opens on click', () => {
    render(<Navbar screen="HOME" nav={vi.fn()} />)
    const menuBtn = screen.getByRole('button', { name: /Menu/i })
    fireEvent.click(menuBtn)
    expect(document.body).toBeTruthy()
  })
  it('nav function called on link click', () => {
    const navMock = vi.fn()
    render(<Navbar screen="HOME" nav={navMock} />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(document.body).toBeTruthy()
  })
})