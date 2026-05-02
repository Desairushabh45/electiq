/**
 * Utility helper functions for ElectIQ
 * @module helpers
 */

/**
 * Formats a score as a percentage string
 * @param {number} score - raw score value
 * @param {number} total - total possible score
 * @returns {string} formatted percentage string e.g. "80%"
 */
export const formatScore = (score, total) => {
  if (!total) return '0%'
  return `${Math.round((score / total) * 100)}%`
}

/**
 * Sanitizes user input for safe display
 * @param {string} text - raw user input text
 * @param {number} maxLength - maximum allowed length
 * @returns {string} sanitized and trimmed string
 */
export const sanitizeText = (text, maxLength = 200) => {
  if (!text || typeof text !== 'string') return ''
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim()
    .slice(0, maxLength)
}

/**
 * Calculates percentage from score and total
 * @param {number} score - achieved score
 * @param {number} total - maximum possible score
 * @returns {number} percentage as integer
 */
export const calcPercentage = (score, total) => {
  if (!total) return 0
  return Math.round((score / total) * 100)
}
