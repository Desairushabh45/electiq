import { describe, it, expect, vi } from 'vitest';
import { analyzeElectionText } from './nlpService';

// Mock fetch globally so tests never hit real network
vi.stubGlobal('fetch', vi.fn());

describe('nlpService', () => {
  it('analyzeElectionText is a function', () => {
    expect(typeof analyzeElectionText).toBe('function');
  });

  it('returns array on empty input', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ entities: [] }),
    });
    const result = await analyzeElectionText('');
    expect(Array.isArray(result)).toBe(true);
  });

  it('returns empty array when API response has no entities', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({}),
    });
    const result = await analyzeElectionText('test text');
    expect(result).toEqual([]);
  });

  it('returns entities array on successful response', async () => {
    const mockEntities = [
      { name: 'ECI', type: 'ORGANIZATION', salience: 0.9 },
      { name: 'Lok Sabha', type: 'ORGANIZATION', salience: 0.8 },
    ];
    fetch.mockResolvedValueOnce({
      json: async () => ({ entities: mockEntities }),
    });
    const result = await analyzeElectionText('ECI conducts Lok Sabha elections');
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('ECI');
  });

  it('returns empty array on fetch error (graceful fallback)', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));
    const result = await analyzeElectionText('some text');
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);
  });
});
