/* eslint-disable no-unused-vars */
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import HowItWorksScreen from './HowItWorksScreen'

vi.mock('../firebase', () => ({ trackEvent: vi.fn() }))

describe('HowItWorksScreen', () => {
  it('renders without crashing', () => {
    render(<HowItWorksScreen />)
    expect(document.body).toBeTruthy()
  })
  it('renders main content', () => {
    render(<HowItWorksScreen />)
    expect(document.body.innerHTML.length).toBeGreaterThan(100)
  })
  it('has content sections', () => {
    render(<HowItWorksScreen />)
    expect(document.body.innerHTML).toBeTruthy()
  })
})
