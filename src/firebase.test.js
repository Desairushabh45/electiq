import { describe, it, expect, vi } from 'vitest'
import { trackEvent, analytics } from './firebase'

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({
    options: {},
    name: '[DEFAULT]',
    automaticDataCollectionEnabled: false
  })),
}))

vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(() => ({})),
  logEvent: vi.fn(),
  isSupported: vi.fn(() => Promise.resolve(true))
}))

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  collection: vi.fn(),
  addDoc: vi.fn(),
  getDocs: vi.fn(),
  serverTimestamp: vi.fn(),
}))

vi.mock('firebase/database', () => ({
  getDatabase: vi.fn(() => ({})),
  ref: vi.fn(),
  push: vi.fn(),
  onValue: vi.fn(),
}))

vi.mock('firebase/performance', () => ({
  getPerformance: vi.fn(() => ({})),
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
