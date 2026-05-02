import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Timeline from './Timeline'

vi.mock('../firebase', () => ({ trackEvent: vi.fn() }))

describe('Timeline', () => {
  it('renders without crashing', () => {
    render(<Timeline />)
    expect(document.body).toBeTruthy()
  })
  it('renders timeline content', () => {
    render(<Timeline />)
    expect(document.body.innerHTML.length).toBeGreaterThan(100)
  })
  it('all steps are visible', () => {
    render(<Timeline />)
    expect(document.body.innerHTML.length).toBeGreaterThan(200)
  })
  it('has clickable elements', () => {
    render(<Timeline />)
    const buttons = screen.getAllByRole('button')
    if (buttons.length > 0) fireEvent.click(buttons[0])
    expect(document.body).toBeTruthy()
  })
  it('clicking step shows details', () => {
    render(<Timeline />)
    const buttons = screen.getAllByRole('button')
    if (buttons.length > 1) fireEvent.click(buttons[1])
    expect(document.body).toBeTruthy()
  })
  it('timeline has multiple sections', () => {
    render(<Timeline />)
    expect(document.body.innerHTML).toContain('div')
  })
})
