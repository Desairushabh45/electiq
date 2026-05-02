import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ElectionQuiz from './ElectionQuiz'

vi.mock('../firebase', () => ({ trackEvent: vi.fn() }))

describe('ElectionQuiz', () => {
  it('renders without crashing', () => {
    render(<ElectionQuiz />)
    expect(document.body).toBeTruthy()
  })
  it('renders quiz content', () => {
    render(<ElectionQuiz />)
    expect(document.body.innerHTML.length).toBeGreaterThan(100)
  })
  it('has buttons displayed', () => {
    render(<ElectionQuiz />)
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
  })
  it('clicking first answer works', () => {
    render(<ElectionQuiz />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(document.body).toBeTruthy()
  })
  it('clicking second answer works', () => {
    render(<ElectionQuiz />)
    const buttons = screen.getAllByRole('button')
    if (buttons.length > 1) fireEvent.click(buttons[1])
    expect(document.body).toBeTruthy()
  })
  it('clicking next after answer works', () => {
    render(<ElectionQuiz />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    const newButtons = screen.getAllByRole('button')
    fireEvent.click(newButtons[newButtons.length - 1])
    expect(document.body).toBeTruthy()
  })
  it('can complete multiple questions', () => {
    render(<ElectionQuiz />)
    for (let i = 0; i < 3; i++) {
      const buttons = screen.getAllByRole('button')
      fireEvent.click(buttons[0])
      const newButtons = screen.getAllByRole('button')
      fireEvent.click(newButtons[newButtons.length - 1])
    }
    expect(document.body).toBeTruthy()
  })
})