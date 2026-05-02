import '@testing-library/jest-dom'
import { vi } from 'vitest'

// jsdom doesn't implement scrollIntoView – stub it globally
window.HTMLElement.prototype.scrollIntoView = function () {}
window.scrollTo = function () {}

// Fix Hero.jsx scrollIntoView error - getElementById returns null in jsdom
const originalGetElementById = document.getElementById.bind(document)
document.getElementById = (id) => {
  const el = originalGetElementById(id)
  if (!el) {
    return { scrollIntoView: vi.fn() }
  }
  return el
}