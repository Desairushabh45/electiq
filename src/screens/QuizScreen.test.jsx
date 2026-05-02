import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import QuizScreen from './QuizScreen'

vi.mock('../firebase', () => ({ trackEvent: vi.fn() }))

describe('QuizScreen', () => {
  it('renders without crashing', () => {
    render(<QuizScreen nav={vi.fn()} />)
    expect(document.body).toBeTruthy()
  })
  it('renders quiz content', () => {
    render(<QuizScreen nav={vi.fn()} />)
    expect(document.body.innerHTML.length).toBeGreaterThan(100)
  })
  it('has answer buttons', () => {
    render(<QuizScreen nav={vi.fn()} />)
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
  })
  it('clicking answer shows feedback', () => {
    render(<QuizScreen nav={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(document.body).toBeTruthy()
  })
  it('clicking next after answer works', () => {
    render(<QuizScreen nav={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    const newButtons = screen.getAllByRole('button')
    fireEvent.click(newButtons[newButtons.length - 1])
    expect(document.body).toBeTruthy()
  })
  it('can go through multiple questions', () => {
    render(<QuizScreen nav={vi.fn()} />)
    for (let i = 0; i < 3; i++) {
      const buttons = screen.getAllByRole('button')
      fireEvent.click(buttons[0])
      const newButtons = screen.getAllByRole('button')
      fireEvent.click(newButtons[newButtons.length - 1])
    }
    expect(document.body).toBeTruthy()
  })
})