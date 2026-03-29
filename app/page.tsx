'use client';

import { useState, useEffect } from 'react';
import Masthead from '@/components/Masthead';
import Ticker from '@/components/Ticker';
import NavBar from '@/components/NavBar';
import ArticleSynthesis from '@/components/ArticleSynthesis';
import VideoGenerator from '@/components/VideoGenerator';
import AskAnything from '@/components/AskAnything';

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="section-divider">
      <span>❧ {title} ❧</span>
    </div>
  );
}

function CFOView({ realtimeNews }: { realtimeNews: any[] }) {
  const dynamicHeroHeadline = realtimeNews.length > 0 ? realtimeNews[0].title : 'Central Bank Signals Moderation Amid Persistent Core Inflation';
  
  return (
    <>
      <div className="broadsheet-grid">
        {/* Main Hero Story */}
        <div style={{ gridColumn: 'span 3' }} className="column-rule-right">
          <h1 className="headline-hero" style={{ fontSize: '2.5rem' }}>
            <a href={realtimeNews.length > 0 ? realtimeNews[0].url : '#'} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
              {dynamicHeroHeadline}
            </a>
          </h1>
          <p className="deck">
            In a hawkish testimony today, the monetary policy committee stressed that while headline indices reflect cooling, core inflation remains a structural challenge, impacting Q3 yield projections and forward guidance.
          </p>

          <div style={{ marginTop: '2rem', height: '300px', backgroundColor: 'var(--color-ink-wash)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-aged-ivory)', overflow: 'hidden' }}>
            {realtimeNews.length > 0 && realtimeNews[0].imageRef ? (
              <img src={realtimeNews[0].imageRef} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.8) contrast(1.2)' }} />
            ) : (
              <span>[ Bond Yield Trajectory Chart ]</span>
            )}
          </div>
          <p className="image-caption">
            Figure 1: Ten-year bond yield trajectories against implied policy rates. (Source: Data Intelligencer)
          </p>
        </div>

        {/* Secondary Story & Synthesis */}
        <div style={{ gridColumn: 'span 2' }} className="column-rule-right">
          <SectionDivider title="UNION BUDGET 2026" />
          <div style={{ marginTop: '1rem' }}>
            <ArticleSynthesis />
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ gridColumn: 'span 1' }}>
          <div className="card">
            <h3 className="small-caps" style={{ borderBottom: '1px solid var(--color-press-black)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              Macro Indicators
            </h3>
            <div className="list-item">
              <span style={{ fontWeight: 600 }}>10Y GOVT YIELD</span><br/>
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
            <div className="list-item">
              <span style={{ fontWeight: 600 }}>M3 MONEY SUPPLY</span><br/>
              ₹234L Cr <span style={{ color: 'green' }}>▲ +0.8%</span>
            </div>
          </div>
        </div>
      </div>
          
      {/* Real-time Data Section */}
      <div style={{ marginTop: '3rem' }}>
        <SectionDivider title="LATEST WIRE COVERAGE" />
        <div className="broadsheet-grid">
          {realtimeNews.length === 0 ? (
            <div style={{ gridColumn: 'span 6', textAlign: 'center' }}>
               <p className="deck">No headlines found or still polling...</p>
            </div>
          ) : (
            realtimeNews.slice(1).map((news) => (
              <div key={news.id} style={{ gridColumn: 'span 2' }} className="card">
                <div className="byline">{news.category} | {news.byline}</div>
                
                {news.imageRef && (
                  <div style={{ width: '100%', height: '140px', marginBottom: '1rem', overflow: 'hidden', backgroundColor: 'var(--color-ink-wash)' }}>
                    <img src={news.imageRef} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }} />
                  </div>
                )}
                
                <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.2' }}>
                  <a href={news.url} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    {news.title}
                  </a>
                </h3>
                <p className="deck" style={{ fontSize: '0.9rem' }}>{news.deck.slice(0, 120)}...</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ marginTop: '4rem' }}>
        <SectionDivider title="AUTOMATED DESK INITIATIVES" />
        <VideoGenerator latestHeadline={dynamicHeroHeadline} />
      </div>
    </>
  );
}

function RetailView({ realtimeNews }: { realtimeNews: any[] }) {
  const dynamicHeroHeadline = realtimeNews.length > 0 ? realtimeNews[0].title : 'Market Update: Why Your Mutual Funds Might Look Red Today';

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Retail Hero */}
      <div className="card" style={{ padding: '3rem', backgroundColor: 'var(--color-aged-ivory)', border: 'none', borderTop: '4px solid var(--color-telegraph-red)' }}>
        <div className="byline" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Your Daily Market TL;DR</div>
        <h1 className="headline-hero" style={{ fontSize: '3rem', borderBottom: 'none' }}>
          <a href={realtimeNews.length > 0 ? realtimeNews[0].url : '#'} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
             {dynamicHeroHeadline}
          </a>
        </h1>
        <p className="deck" style={{ fontSize: '1.3rem', marginTop: '1.5rem', color: 'var(--color-press-black)' }}>
          Experts advise not to panic-sell as major stock indices take a dip this morning following global news. Here is what it means for your long-term SIPs.
        </p>
        
        <div style={{ backgroundColor: 'var(--color-newsprint)', padding: '1.5rem', marginTop: '2rem', borderLeft: '4px solid var(--color-press-black)' }}>
          <h3 className="small-caps" style={{ color: 'var(--color-telegraph-red)', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1rem' }}>Three Things You Need to Know:</h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '1.1rem', fontFamily: 'var(--font-lora)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li>Global markets are down because of overseas tech updates, not Indian fundamentals.</li>
            <li>Indian markets are structurally strong and retail consumption is still high.</li>
            <li><strong>Action: Do not stop your SIP investments!</strong> Market dips are actually opportunities to buy units at a cheaper price.</li>
          </ul>
        </div>
      </div>

      <div style={{ marginTop: '4rem' }}>
        <h2 className="headline-hero" style={{ textAlign: 'center', display: 'block' }}>Breaking: Explainer Video</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'var(--font-lora)', color: 'var(--color-ink-wash)' }}>We generated a 60-second Hindi explainer on the latest breaking news filing, just for you.</p>
        <VideoGenerator latestHeadline={dynamicHeroHeadline} />
      </div>

      <div style={{ marginTop: '4rem' }}>
        <h2 className="headline-hero" style={{ textAlign: 'center', display: 'block' }}>Budget 2026: Asked & Answered</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'var(--font-lora)', color: 'var(--color-ink-wash)' }}>Pick a question to see how the budget directly affects your wallet and portfolio.</p>
        <ArticleSynthesis />
      </div>

    </div>
  );
}

export default function Home() {
  const [persona, setPersona] = useState<'CFO' | 'RETAIL'>('CFO');
  const [activeCategory, setActiveCategory] = useState<string>('world');
  
  const [realtimeNews, setRealtimeNews] = useState<any[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);

  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch Category
  useEffect(() => {
    setIsLoadingNews(true);
    setNewsError(null);
    fetch(`/api/news?category=${activeCategory}`)
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          setRealtimeNews(data.articles);
        } else {
          setNewsError(data.error);
        }
      })
      .catch(err => {
        setNewsError("Network Error while fetching live API");
      })
      .finally(() => {
        setIsLoadingNews(false);
      });
  }, [activeCategory]);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if(data.success) {
        setSearchResults(data.results);
      } else {
        alert(`API Search Error: ${data.error}`);
        setSearchResults([]);
      }
    } catch (e) {
      console.error(e);
      setSearchResults([]);
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
      {/* Sync up the activeCategory with NavBar layout */}
      <NavBar onSearch={handleSearch} onCategorySelect={setActiveCategory} activeCategory={activeCategory} />

      <div className="container">
      
        <AskAnything />

        {/* Global Loading Overlay if necessary */}
        {isLoadingNews && searchResults === null && (
          <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '1rem', backgroundColor: 'var(--color-ink-wash)', color: 'var(--color-aged-ivory)' }}>
            <span className="small-caps" style={{ animation: 'blink 1.5s infinite', display: 'inline-block' }}>CONNECTING TO NEWSAPI DOT ORG... FETCHING LIVE WIRES</span>
          </div>
        )}

        {/* Global API Error State */}
        {newsError && searchResults === null && (
          <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '1rem', border: '2px dashed var(--color-telegraph-red)', color: 'var(--color-telegraph-red)' }}>
            <span className="small-caps"><b>LIVE SATELLITE FEED DISRUPTED:</b> {newsError}</span><br/>
            (Notice: If you are using the free tier of NewsAPI on localhost, verify your API Key is valid and limits haven't been exceeded.)
          </div>
        )}

        {/* Search Results Override View */}
        {searchResults !== null ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 className="headline-hero" style={{ fontSize: '2rem' }}>Search Results</h2>
              <button className="btn" onClick={clearSearch}>Clear Search</button>
            </div>
            
            {isSearching ? (
              <p className="deck">Searching global API archives...</p>
            ) : searchResults.length === 0 ? (
              <p className="deck">No results found for your query.</p>
            ) : (
              <div className="broadsheet-grid">
                {searchResults.map((item, idx) => (
                   <div key={idx} style={{ gridColumn: 'span 2' }} className="card">
                     <div className="byline">{item.category} | {item.byline}</div>
                     {item.imageRef && (
                        <div style={{ width: '100%', height: '140px', marginBottom: '1rem', overflow: 'hidden', backgroundColor: 'var(--color-ink-wash)' }}>
                          <img src={item.imageRef} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }} />
                        </div>
                     )}
                     <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.4rem', marginBottom: '1rem' }}>
                       <a href={item.url} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                          {item.title}
                       </a>
                     </h3>
                     <p className="deck" style={{ fontSize: '0.9rem' }}>{item.deck.slice(0, 150)}...</p>
                   </div>
                ))}
              </div>
            )}
            
          </div>
        ) : (
        <>
            {/* Persona Switcher Bar */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', borderBottom: '1px solid var(--color-column-rule)', paddingBottom: '1rem', backgroundColor: 'var(--color-newsprint)', position: 'sticky', top: 0, zIndex: 10, paddingTop: '1rem' }}>
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

            {/* Radically Distinct Render Paths Passing Down Props */}
            {persona === 'CFO' ? (
              <CFOView realtimeNews={realtimeNews} />
            ) : (
              <RetailView realtimeNews={realtimeNews} />
            )}
        </>
        )}
      </div>
    </main>
  );
}
