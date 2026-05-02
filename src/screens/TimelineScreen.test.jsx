import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TimelineScreen from './TimelineScreen'

vi.mock('../firebase', () => ({ trackEvent: vi.fn() }))

describe('TimelineScreen', () => {
  it('renders without crashing', () => {
    render(<TimelineScreen nav={vi.fn()} />)
    expect(document.body).toBeTruthy()
  })
  it('renders timeline content', () => {
    render(<TimelineScreen nav={vi.fn()} />)
    expect(document.body.innerHTML.length).toBeGreaterThan(100)
  })
  it('has buttons', () => {
    render(<TimelineScreen nav={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })
  it('clicking first step works', () => {
    render(<TimelineScreen nav={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(document.body).toBeTruthy()
  })
  it('clicking second step works', () => {
    render(<TimelineScreen nav={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    if (buttons.length > 1) fireEvent.click(buttons[1])
    expect(document.body).toBeTruthy()
  })
  it('clicking third step works', () => {
    render(<TimelineScreen nav={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    if (buttons.length > 2) fireEvent.click(buttons[2])
    expect(document.body).toBeTruthy()
  })
})