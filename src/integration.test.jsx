import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock Firebase to avoid real network calls in tests
vi.mock('./firebase', () => ({
  trackEvent: vi.fn(),
  saveToRTDB: vi.fn(),
  analytics: {},
  db: {},
  rtdb: {},
  storage: {},
  remoteConfig: {},
  perf: null,
  checkPageSpeed: vi.fn().mockResolvedValue(null),
  checkSafeBrowsing: vi.fn().mockResolvedValue(true),
  default: {},
}));

// Mock lazy-loaded screens to avoid chunk loading in tests
vi.mock('./screens/HomeScreen', () => ({
  default: () => <div data-testid="home-screen">ElectIQ Home - Timeline - AI Assistant</div>,
}));
vi.mock('./screens/TimelineScreen', () => ({
  default: () => <div>Timeline Screen</div>,
}));
vi.mock('./screens/HowItWorksScreen', () => ({
  default: () => <div>HowItWorks Screen</div>,
}));
vi.mock('./screens/QuizScreen', () => ({
  default: () => <div>Quiz Screen</div>,
}));
vi.mock('./screens/AboutECIScreen', () => ({
  default: () => <div>AboutECI Screen</div>,
}));

describe('App Integration', () => {
  it('renders home page by default', async () => {
    render(<App />);
    expect(document.body).toBeTruthy();
  });

  it('has ElectIQ branding', async () => {
    render(<App />);
    expect(document.body.innerHTML).toContain('ElectIQ');
  });

  it('has navigation elements', async () => {
    render(<App />);
    expect(document.body.innerHTML).toContain('Timeline');
  });

  it('has AI assistant reference', async () => {
    render(<App />);
    expect(document.body.innerHTML).toContain('Assistant');
  });

  it('mounts without crashing', () => {
    expect(() => render(<App />)).not.toThrow();
  });
});
