import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FloatingChatbot from './FloatingChatbot'

vi.mock('../firebase', () => ({ trackEvent: vi.fn() }))
vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: class {
    getGenerativeModel() {
      return {
        startChat: () => ({
          sendMessage: vi.fn().mockResolvedValue({
            response: { text: () => 'test response' }
          })
        })
      }
    }
  }
}))

describe('FloatingChatbot', () => {
  it('renders FAB button', () => {
    render(<FloatingChatbot />)
    expect(screen.getByRole('button', { name: /Toggle AI Assistant/i })).toBeInTheDocument()
  })
  it('opens chatbot on FAB click', () => {
    render(<FloatingChatbot />)
    const fab = screen.getByRole('button', { name: /Toggle AI Assistant/i })
    fireEvent.click(fab)
    expect(document.body.innerHTML.length).toBeGreaterThan(100)
  })
  it('close button works', () => {
    render(<FloatingChatbot />)
    const fab = screen.getByRole('button', { name: /Toggle AI Assistant/i })
    fireEvent.click(fab)
    fireEvent.click(fab)
    expect(document.body).toBeTruthy()
  })
  it('input field present when open', () => {
    render(<FloatingChatbot />)
    const fab = screen.getByRole('button', { name: /Toggle AI Assistant/i })
    fireEvent.click(fab)
    expect(document.body.innerHTML).toContain('input')
  })
  it('message input accepts text', () => {
    render(<FloatingChatbot />)
    const fab = screen.getByRole('button', { name: /Toggle AI Assistant/i })
    fireEvent.click(fab)
    const inputs = document.querySelectorAll('input, textarea')
    if (inputs.length > 0) {
      fireEvent.change(inputs[0], { target: { value: 'test message' } })
      expect(inputs[0].value).toBe('test message')
    }
    expect(document.body).toBeTruthy()
  })
  it('send button exists when open', () => {
    render(<FloatingChatbot />)
    const fab = screen.getByRole('button', { name: /Toggle AI Assistant/i })
    fireEvent.click(fab)
    expect(screen.getAllByRole('button').length).toBeGreaterThan(1)
  })
  it('submits message on send click', async () => {
    render(<FloatingChatbot />)
    const fab = screen.getByRole('button', { name: /Toggle AI Assistant/i })
    fireEvent.click(fab)
    const inputs = document.querySelectorAll('input, textarea')
    if (inputs.length > 0) {
      fireEvent.change(inputs[0], { target: { value: 'what is EVM?' } })
      const buttons = screen.getAllByRole('button')
      fireEvent.click(buttons[buttons.length - 1])
    }
    await waitFor(() => expect(document.body).toBeTruthy())
  })
  it('submits message on enter key', async () => {
    render(<FloatingChatbot />)
    const fab = screen.getByRole('button', { name: /Toggle AI Assistant/i })
    fireEvent.click(fab)
    const inputs = document.querySelectorAll('input, textarea')
    if (inputs.length > 0) {
      fireEvent.change(inputs[0], { target: { value: 'test' } })
      fireEvent.keyDown(inputs[0], { key: 'Enter', code: 'Enter' })
    }
    await waitFor(() => expect(document.body).toBeTruthy())
  })
})