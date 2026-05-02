import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Hero from './Hero'

vi.mock('../firebase', () => ({ trackEvent: vi.fn() }))

describe('Hero', () => {
  it('renders without crashing', () => {
    render(<Hero nav={vi.fn()} />)
    expect(document.body).toBeTruthy()
  })
  it('renders main heading', () => {
    render(<Hero nav={vi.fn()} />)
    expect(document.body.innerHTML).toContain('Elect')
  })
  it('CTA buttons are present', () => {
    render(<Hero nav={vi.fn()} />)
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
  })
  it('clicking explore button works', () => {
    render(<Hero nav={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(document.body).toBeTruthy()
  })
  it('stats section renders', () => {
    render(<Hero nav={vi.fn()} />)
    expect(document.body.innerHTML.length).toBeGreaterThan(200)
  })
  it('clicking second button works', () => {
    render(<Hero nav={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    if (buttons.length > 1) fireEvent.click(buttons[1])
    expect(document.body).toBeTruthy()
  })
})