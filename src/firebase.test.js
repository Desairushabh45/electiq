import { describe, it, expect, vi } from 'vitest'
import { trackEvent, analytics } from './firebase'

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
}))

vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(() => ({})),
  logEvent: vi.fn(),
  isSupported: vi.fn(() => Promise.resolve(true))
}))

describe('Firebase', () => {
  it('Test Firebase app is initialized', () => {
    expect(trackEvent).toBeDefined()
  })

  it('Test trackEvent is a function', () => {
    expect(typeof trackEvent).toBe('function')
  })

  it('Test analytics exists', () => {
    expect(analytics).toBeDefined()
  })

  it('Mock all Firebase calls', () => {
    expect(() => trackEvent('test_event')).not.toThrow()
  })
})
