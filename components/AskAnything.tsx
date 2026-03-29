'use client';

import { useState } from 'react';

// Fallback questions when live news hasn't loaded yet
const FALLBACK_SUGGESTIONS = [
  "Why are global markets falling today?",
  "Explain inflation like I'm a beginner",
  "What is happening with the Indian rupee?",
  "What should a retail investor do right now?"
];

interface AskAnythingProps {
  liveHeadlines?: string[];
}

// Generate smart "What does X mean for investors?" style questions from live headlines
function buildSuggestions(headlines: string[]): string[] {
  if (!headlines || headlines.length === 0) return FALLBACK_SUGGESTIONS;

  const templates = [
    (h: string) => `What does this mean for investors: "${h.slice(0, 50)}...?"`,
    (h: string) => `Why is this happening: "${h.slice(0, 45)}...?"`,
    (h: string) => `How will "${h.slice(0, 40)}..." affect the Indian market?`,
    (h: string) => `Should retail investors be worried about: "${h.slice(0, 35)}...?"`,
  ];

  return headlines.slice(0, 4).map((headline, i) => templates[i % templates.length](headline));
}

export default function AskAnything({ liveHeadlines = [] }: AskAnythingProps) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const [answer, setAnswer] = useState('');
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [sources, setSources] = useState<{ title: string, url: string }[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Combine live generated suggestions with one fallback
  const suggestions = buildSuggestions(liveHeadlines);

  const handleAsk = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setQuery(searchQuery);
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: searchQuery })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze global feeds');
      }

      setAnswer(data.answer);
      setKeyPoints(data.key_points || []);
      setSources(data.sources || []);
      setStatus('success');

    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error communicating with AI synthesis engine.');
      setStatus('error');
    }
  };

  return (
    <div className="card" style={{ marginBottom: '3rem', backgroundColor: 'var(--color-ink-wash)', color: 'var(--color-newsprint)' }}>
      <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--color-aged-ivory)' }}>
        Universal AI Search
      </h2>
      <p style={{ fontFamily: 'var(--font-lora)', marginBottom: '1.5rem', fontSize: '1rem', opacity: 0.85 }}>
        Ask any question about current news, markets, or economics. We synthesize live global wires into a structured briefing.
      </p>

      {/* Input Row */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Ask anything about news, markets, economy..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk(query)}
          style={{
            flex: 1,
            padding: '1rem',
            fontSize: '1.1rem',
            fontFamily: 'var(--font-lora)',
            backgroundColor: 'var(--color-newsprint)',
            color: 'var(--color-press-black)',
            border: 'none',
            borderRadius: '4px',
            outline: 'none'
          }}
        />
        <button
          className="btn"
          onClick={() => handleAsk(query)}
          disabled={status === 'loading'}
          style={{ backgroundColor: 'var(--color-telegraph-red)', color: 'white', border: 'none', padding: '0 2rem', fontWeight: 'bold', minWidth: '140px' }}
        >
          {status === 'loading' ? 'ANALYZING...' : '⚡ RESEARCH'}
        </button>
      </div>

      {/* Dynamic Suggested Queries — changes with live news */}
      {(status === 'idle' || status === 'error') && (
        <div style={{ marginTop: '1rem' }}>
          <span className="small-caps" style={{ color: 'var(--color-column-rule)', fontSize: '0.75rem' }}>
            {liveHeadlines.length > 0 ? '⬛ FROM TODAY\'S LIVE WIRES:' : 'SUGGESTED QUESTIONS:'}
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleAsk(s)}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--color-column-rule)',
                  color: 'var(--color-newsprint)',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-raleway)',
                  fontSize: '0.78rem',
                  textAlign: 'left',
                  transition: 'border-color 0.2s, color 0.2s'
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-telegraph-red)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-telegraph-red)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-column-rule)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-newsprint)';
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading */}
      {status === 'loading' && (
        <div style={{ marginTop: '2rem', textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--color-column-rule)' }}>
          <p className="small-caps" style={{ animation: 'blink 1.5s infinite', color: 'var(--color-aged-ivory)' }}>
            [ ⚙ Querying global syndicates · cross-referencing wires · synthesizing briefing ]
          </p>
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--color-telegraph-red)', color: 'white' }}>
          <h4 className="small-caps" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Synthesis Error</h4>
          <p style={{ fontFamily: 'var(--font-lora)' }}>{errorMessage}</p>
        </div>
      )}

      {/* Success */}
      {status === 'success' && (
        <div style={{ marginTop: '2rem', padding: '2rem', backgroundColor: 'var(--color-newsprint)', color: 'var(--color-press-black)', borderLeft: '4px solid var(--color-telegraph-red)' }}>
          <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-column-rule)', paddingBottom: '0.5rem' }}>
            Executive Synthesis
          </h3>

          <p style={{ fontFamily: 'var(--font-lora)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            {answer}
          </p>

          {keyPoints.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 className="small-caps" style={{ color: 'var(--color-telegraph-red)', marginBottom: '0.75rem', fontWeight: 'bold' }}>Key Points:</h4>
              <ul style={{ paddingLeft: '1.5rem', fontFamily: 'var(--font-lora)', fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {sources.length > 0 && (
            <div style={{ borderTop: '1px solid var(--color-column-rule)', paddingTop: '1rem' }}>
              <h4 className="small-caps" style={{ color: 'var(--color-ink-wash)', marginBottom: '0.5rem' }}>Relevant Wire Sources:</h4>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {sources.map((src, index) => (
                  <a key={index} href={src.url} target="_blank" rel="noreferrer" style={{
                    fontFamily: 'var(--font-raleway)',
                    fontSize: '0.8rem',
                    backgroundColor: 'var(--color-aged-ivory)',
                    padding: '0.3rem 0.6rem',
                    textDecoration: 'none',
                    color: 'var(--color-press-black)',
                    border: '1px solid var(--color-column-rule)'
                  }}>
                    ↗ {src.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          <button onClick={() => { setStatus('idle'); setQuery(''); }} style={{ marginTop: '2rem', background: 'transparent', border: 'none', color: 'var(--color-telegraph-red)', cursor: 'pointer', fontFamily: 'var(--font-raleway)', fontWeight: 'bold', textDecoration: 'underline' }}>
            ← Ask another question
          </button>
        </div>
      )}
    </div>
  );
}
