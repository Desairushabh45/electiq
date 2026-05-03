/**
 * Google Natural Language API - Entity Analysis
 * Detects election-related entities (ECI, Lok Sabha, EVM, etc.) in text
 */

/**
 * Calls Google Natural Language API to detect named entities in election text
 * @param {string} text - text to analyze
 * @returns {Promise<Array>} array of entity objects from NLP API
 */
export const analyzeElectionText = async (text) => {
  try {
    const response = await fetch(
      `https://language.googleapis.com/v1/documents:analyzeEntities?key=${import.meta.env.VITE_FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          document: {
            type: 'PLAIN_TEXT',
            content: text
          },
          encodingType: 'UTF8'
        })
      }
    );
    const data = await response.json();
    return data.entities || [];
  } catch (e) {
    console.warn('NLP API error:', e);
    return [];
  }
};
