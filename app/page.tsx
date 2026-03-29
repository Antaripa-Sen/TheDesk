'use client';

import { useState, useEffect } from 'react';
import Masthead from '@/components/Masthead';
import Ticker from '@/components/Ticker';
import NavBar from '@/components/NavBar';
import ArticleSynthesis from '@/components/ArticleSynthesis';
import VideoGenerator from '@/components/VideoGenerator';

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="section-divider">
      <span>❧ {title} ❧</span>
    </div>
  );
}

export default function Home() {
  const [persona, setPersona] = useState<'CFO' | 'RETAIL'>('CFO');
  
  // Real-time data states
  const [realtimeNews, setRealtimeNews] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Fetch simulated real-time data on mount
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          setRealtimeNews(data.articles);
        }
      });
  }, []);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if(data.success) {
        setSearchResults(data.results);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchResults(null);
  };

  return (
    <main style={{ minHeight: '100vh', transition: 'background-color 0.3s' }}>
      <Ticker />
      <Masthead />
      <NavBar onSearch={handleSearch} />

      <div className="container">
        
        {/* Search Results Override */}
        {searchResults !== null ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 className="headline-hero" style={{ fontSize: '2rem' }}>Search Results</h2>
              <button className="btn" onClick={clearSearch}>Clear Search</button>
            </div>
            
            {isSearching ? (
              <p className="deck">Searching archives...</p>
            ) : searchResults.length === 0 ? (
              <p className="deck">No results found for your query.</p>
            ) : (
              <div className="broadsheet-grid">
                {searchResults.map((item, idx) => (
                   <div key={idx} style={{ gridColumn: 'span 2' }} className="card">
                     <div className="byline">{item.category}</div>
                     <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.4rem', marginBottom: '1rem' }}>{item.title}</h3>
                     <p className="deck" style={{ fontSize: '0.9rem' }}>{item.deck}</p>
                   </div>
                ))}
              </div>
            )}
            
          </div>
        ) : (
        <>
            {/* Standard Homepage Flow */}
            
            {/* Persona Switcher */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', borderBottom: '1px solid var(--color-column-rule)', paddingBottom: '1rem' }}>
              <span className="small-caps" style={{ alignSelf: 'center', fontWeight: 'bold' }}>Simulate View:</span>
              <button 
                className={`btn ${persona === 'CFO' ? 'active' : ''}`}
                onClick={() => setPersona('CFO')}
              >
                User A: 45yo CFO
              </button>
              <button 
                className={`btn ${persona === 'RETAIL' ? 'active' : ''}`}
                onClick={() => setPersona('RETAIL')}
              >
                User B: 24yo Retail Inv.
              </button>
            </div>

            <div className="broadsheet-grid">
              
              {/* Main Hero Story */}
              <div style={{ gridColumn: persona === 'CFO' ? 'span 3' : 'span 4' }} className="column-rule-right">
                <h1 className="headline-hero">
                  {persona === 'CFO' 
                    ? 'Central Bank Signals Moderation Amid Persistent Core Inflation'
                    : 'Market Update: Why Your Mutual Funds Might Look Red Today'}
                </h1>
                <p className="deck">
                  {persona === 'CFO'
                    ? "In a hawkish testimony today, the monetary policy committee stressed that while headline indices reflect cooling, core inflation remains a structural challenge, impacting Q3 yield projections and forward guidance."
                    : "Experts advise not to panic-sell as major stock indices take a dip morning following global news. Here is what it means for your long-term SIPs."}
                </p>
                
                {persona === 'RETAIL' && (
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', paddingBottom: '1rem' }}>
                      <span className="small-caps" style={{ color: 'var(--color-telegraph-red)', fontWeight: 'bold' }}>Key Takeaways:</span>
                      <ul className="deck" style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.9rem' }}>
                        <li>Global markets are down due to overseas news.</li>
                        <li>Indian markets are fundamentally strong.</li>
                        <li>Do not stop your SIP investments!</li>
                      </ul>
                  </div>
                )}

                <div style={{ marginTop: '2rem', height: '300px', backgroundColor: 'var(--color-ink-wash)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-aged-ivory)' }}>
                  [ Editorial Photograph Asset ]
                </div>
                <p className="image-caption">
                  {persona === 'CFO' ? 'Figure 1: Ten-year bond yield trajectories. (Source: Data Intelligencer)' : 'Illustration: A bull market resting before the next run.'}
                </p>
              </div>

              {/* Secondary Story & Synthesis */}
              <div style={{ gridColumn: persona === 'CFO' ? 'span 2' : 'span 2' }} className={persona === 'CFO' ? 'column-rule-right' : ''}>
                <SectionDivider title="UNION BUDGET 2026" />
                <div style={{ marginTop: '1rem' }}>
                  <ArticleSynthesis />
                </div>
              </div>

              {/* Sidebar (CFO specific) */}
              {persona === 'CFO' && (
                <div style={{ gridColumn: 'span 1' }}>
                  <div className="card">
                    <h3 className="small-caps" style={{ borderBottom: '1px solid var(--color-press-black)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                      Macro Data
                    </h3>
                    <div className="list-item">
                      <span style={{ fontWeight: 600 }}>10Y YIELD</span><br/>
                      7.12% <span style={{ color: 'var(--color-telegraph-red)' }}>▼ -0.4%</span>
                    </div>
                    <div className="list-item">
                      <span style={{ fontWeight: 600 }}>USD/INR</span><br/>
                      83.45 <span style={{ color: 'var(--color-telegraph-red)' }}>▼ -0.1%</span>
                    </div>
                    <div className="list-item">
                      <span style={{ fontWeight: 600 }}>BRENT CRUDE</span><br/>
                      $82.10 <span style={{ color: 'green' }}>▲ +1.2%</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
            
            {/* Real-time Data Section */}
            <div style={{ marginTop: '3rem' }}>
              <SectionDivider title="LATEST WIRE COVERAGE" />
              <div className="broadsheet-grid">
                {realtimeNews.length === 0 ? (
                  <div style={{ gridColumn: 'span 6', textAlign: 'center' }}>
                     <p className="deck">Polling real-time wires...</p>
                  </div>
                ) : (
                  realtimeNews.map((news) => (
                    <div key={news.id} style={{ gridColumn: 'span 2' }} className="card">
                      <div className="byline">{news.category} | {news.byline}</div>
                      <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.2' }}>
                        {news.title}
                      </h3>
                      <p className="deck" style={{ fontSize: '0.9rem' }}>{news.deck}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Section: Vernacular Video Gen */}
            <div style={{ marginTop: '4rem' }}>
              <SectionDivider title="AUTOMATED DESK INITIATIVES" />
              <VideoGenerator />
            </div>

        </>
        )}

      </div>
    </main>
  );
}
